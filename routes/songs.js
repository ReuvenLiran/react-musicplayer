var express = require('express')
var router = express.Router()
var co = require('co')
var request = require('request')

function formatISO8601 (timesatmp) {
  let reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
  let hours = 0
  let minutes = 0
  let seconds = 0
  let finalTime = ''

  if (reptms.test(timesatmp)) {
    let matches = reptms.exec(timesatmp)

    if (matches[1]) {
      hours = matches[1]
      finalTime = hours
    }

    if (matches[2]) {
      minutes = matches[2]
      minutes = minutes < 10 ? '0' + minutes : minutes
      finalTime.length > 0 ? finalTime = finalTime + ':' + minutes : finalTime = minutes
    }

    if (matches[3]) {
      seconds = matches[3]
      seconds = seconds < 10 ? '0' + seconds : seconds
      finalTime.length > 0 ? finalTime = finalTime + ':' + seconds : finalTime = seconds
    }
    console.log(finalTime)
    return finalTime
  }
}

router.get('/songs', function (req, res) {
  delete require.cache[require.resolve('../routes/fileUpdater')]
  console.log(require.cache[require.resolve('../routes/fileUpdater')])
  var fileUpdater = require('../routes/fileUpdater')
  var songs

  fileUpdater.then(promisedResult => {
    co(function*() {
      console.log('select')
      songs = yield global.db.collection('songs').find().toArray()
      res.json(songs)
    }).catch(function (err) {
      console.log('ERROR SELECT' + err.stack)
    })
  }
  )
})

router.get('/autocomplete', function (req, res) {
  var url = 'http://suggestqueries.google.com/complete/search?q=' +
  req.query.q +
  '&client=firefox'
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var mBody = JSON.parse(body)
      console.log(mBody[1])
      res.json(mBody[1])
    }
  })
})

router.get('/search', function (req, res) {
  let youtubeResults = []
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=` +
  req.query.q +
  `&type=video&key=AIzaSyC_nfVmlTAYzpwxI6ujBRsufBxpT1OMJA0`

  let videoIds = ''

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var mBody = JSON.parse(body)
      let video

      for (let videoNum in mBody.items) {
        video = mBody.items[videoNum]

        youtubeResults.push({ 'id' : video.id.videoId,
          'artists' : ['Youtube'],
          'title' : video.snippet.title,
          'thumbnail' : video.snippet.thumbnails.medium.url })

        videoIds = videoIds + ',' + video.id.videoId
      }
      console.log(videoIds)
      videoIds = videoIds.substring(1, videoIds.length)

      url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key=AIzaSyC_nfVmlTAYzpwxI6ujBRsufBxpT1OMJA0&id=`
          + videoIds

      request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var mBody = JSON.parse(body)
          let video

          for (let videoNum in mBody.items) {
            video = mBody.items[videoNum]
            if (video.id === youtubeResults[videoNum].id) {
              youtubeResults[videoNum].duration = formatISO8601(video.contentDetails.duration)
            } else {
              for (let videoNum1 in youtubeResults) {
                if (youtubeResults[videoNum1].id === video.id) {
                  youtubeResults[videoNum1].duration = formatISO8601(video.contentDetails.duration)
                  break
                }
              }
            }
          }
          res.json({ 'youtubeResults' : youtubeResults })
        }
      })

     // res.json({'youtubeResults' : youtubeResults })
    }
  })
})

module.exports = router
