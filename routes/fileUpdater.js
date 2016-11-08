//var express = require('express');
//var router = express.Router();

var fs = require('fs'); 
var id3 = require('id3js');
var mime = require('mime-types');
var exec  = require('child_process').execFile;
var ID3Writer = require('browser-id3-writer');
var request = require('request');
var Path = require('path');
//var Promise = require('promise');
const audio = 'audio/mpeg';
const path = 'src/static';
var co = require('co');
var assert = require('assert');

var child;
  /*              
          id3({ file: file, type: id3.OPEN_LOCAL }, function(err, tags) {
            console.log(tags);
          }); */
 
  
          
function echoPrint(file) {
    return new Promise((resolve, reject) => {

        child = exec('./fpcalc', [ file ],
            (error, stdout, stderr) => { 
            //console.log(stderr);
            //console.log(error);
            var trackMetadata;
            var data; 
            let metadata = {
                file: file
            }

            if (!error) {
                var duration;
                //console.log(stdout);

                trackMetadata = stdout.split('\n');
                
                data = trackMetadata[2].split('=');
                metadata.fingerPrint = data[1];
                
                data = trackMetadata[1].split('=');
                metadata.duration = data[1];
                //trackMetadata = trackMetadata[0];
                resolve(metadata);
                console.log(file + " got fingerprint");
            } 

            if ( error || 
                metadata.fingerPrint.length == 0 || 
                metadata.duration.length == 0) 
            {
                reject([file + " has not been recognized", file]);
            }
        });
    })
}

function getMimeType(file) {
    return new Promise((resolve, reject) => {

        child = exec('file', [ file, '--mime-type' ],
            (error, stdout, stderr) => { 
            //console.log(stderr);
            //console.log(error);
            var trackMetadata;
            var data; 
            let metadata = {
                file: file
            }

            if (!error) {
                var duration;
                //console.log(stdout);

                trackMetadata = stdout.split('\n');
                
                data = trackMetadata[2].split('=');
                metadata.fingerPrint = data[1];
                
                data = trackMetadata[1].split('=');
                metadata.duration = data[1];
                //trackMetadata = trackMetadata[0];
                resolve(metadata);
                console.log(file + " got fingerprint");
            } 

            if ( error || 
                metadata.fingerPrint.length == 0 || 
                metadata.duration.length == 0) 
            {
                reject([file + " has not been recognized", file]);
            }
        });
    })
}
    
function getRecordingMetadata(oldMetadata) {
    var url = 'http://api.acoustid.org/v2/lookup?client=d4H1RrABux&meta=recordings&duration=';
    url = url + oldMetadata.duration + '&fingerprint=' + oldMetadata.fingerPrint;
    //console.log(url);
    //console.log('getRecordingMetadata ' + url);
    return new Promise((resolve, reject) => {
        
        request(url, function (error, response, body) {
            
            if (!error && response.statusCode == 200) {
                var mBody = JSON.parse(body);
                let metadata = {
                    metadata: mBody.results[0].recordings[0],
                    file: oldMetadata.file,
                    fingerPrint: oldMetadata.fingerPrint
                }
                resolve(metadata);
            } else {
                reject(error);
            }
            
        });
    })
}

function getMoreDetails(oldMetadata) {

    var trackTitle = oldMetadata.trackTitle.replace(/ /g, "%20").replace(/_/g, "%20").replace(/-/g, "%20")
                  .replace(/\.[^/.]+$/, ""); 

    var artist = oldMetadata.artists[0].replace(/ /g, "%20").replace(/_/g, "%20").replace(/-/g, "%20")
                  .replace(/\.[^/.]+$/, "");   

    var url = 'https://api.musixmatch.com/ws/1.1/track.search?apikey=ed989de507e721695e454b7df8337677&format=json&q_track=';
    url = url + trackTitle + '&q_artist=' + artist + '&quorum_factor=1';
    //console.log(url);
    return new Promise((resolve, reject) => {
        
        request(url, function (error, response, body) {
            
            if (!error && response.statusCode == 200) {
                var mBody = JSON.parse(body);
                var metadata = {
                    metadata: mBody.message.body.track_list[0].track,
                    oldMetadata: oldMetadata  
                   /* file: oldMetadata.file,
                    fingerPrint: oldMetadata.fingerPrint,
                    trackId: oldMetadata.trackId, */
                    
                }
                resolve(metadata);
                //console.log('getMoreDetails success');
                //console.log(mBody.message.body.track_list[0].track.track_name + " got its metadata");
            } else {
                console.log('error ' + error);
                reject(error);
            }
        
        });
    })
}

function getTrackCover(trackName, artists) {
    const API = "AIzaSyBUzGbUw6lyRbaZnqw9pBNFVgMaesGCPII";
    const SEARCH_ENGINE = "011805731910874581480:pdmpfq5ss_m";

    var url = "https://www.googleapis.com/customsearch/v1?key=" + API 
            + "&cx=" + SEARCH_ENGINE + "&q=" + trackName + " " + artists
            + "&searchType=image";

     // console.log('getTrackCover-BEFORE    ', url);
     url = encodeURI(url);
     url = url.replace(/\(/g, "%28").replace(/\)/g, "%29")
        .replace(/,/g, "%2C");
     console.log(url);
     //console.log('getTrackCover-AFTER     ', url);
     return new Promise((resolve, reject) => {
        
        request(url, function (error, response, body) {
            
            if (!error && response.statusCode == 200) {
                var mBody = JSON.parse(body);
                var coverUrl = mBody.items[0].link;
        
                getCoverBuffer(coverUrl).then(
                     function (data) { 
                        resolve(data);
                     }, function(err) {

                     });
            } else {
                console.log('error ' + error);
                reject(error);
            }
        
        });
    })
}

function getCoverBuffer(coverUrl) {
    
    return new Promise((resolve, reject) => {
        var request = require('request').defaults({ encoding: null });

        request.get(coverUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
               // console.log('imgData', body);
                //data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                //console.log('imgData', data);
                resolve(body);
            }
        });
    });
}

function writeTag(mData) {
    //console.log(mData);
    var songBuffer = fs.readFileSync(mData.oldMetadata.file);
    //var imgBuffer = fs.readFileSync( path + '/' + 'download.jpg');
    console.log('metadata.cover', mData.cover);
   // console.log('imgBuffer', imgBuffer);
   
/*
    var md5 = require('sha1');
    console.log(songBuffer);
    var hash = md5(songBuffer);
    console.log(hash);
*/

    var writer = new ID3Writer(songBuffer);
        writer.setFrame('TIT2', mData.oldMetadata.trackTitle)
            .setFrame('TPE1', [mData.oldMetadata.artists])
            .setFrame('TPE2', mData.oldMetadata.artists)
            .setFrame('TALB', mData.metadata.album_name)
            .setFrame('TYER', mData.metadata.first_release_date.substring(0,4)) // get year
            .setFrame('TLEN', mData.metadata.track_length * 1000) //milliseconds
            .setFrame('TCON', mData.metadata.primary_genres.music_genre_list)
            .setFrame('USLT', 'This is unsychronised lyrics')
            .setFrame('APIC',  mData.cover);
    writer.addTag();

   // console.log('base64', mData.cover.toString('base64'));
    console.log('aaaaaa');
    var taggedSongBuffer = new Buffer(writer.arrayBuffer);
    fs.writeFileSync(mData.oldMetadata.file, taggedSongBuffer);

    var newName = mData.oldMetadata.trackTitle 
                + ' - ' + mData.oldMetadata.artists + '.mp3';
                
    fs.rename(mData.oldMetadata.file, path + '/' + newName);
    //console.log(mData.metadata.primary_genres.music_genre_list);
    console.log('write');
    return {_id: mData.oldMetadata.trackId,
           //fingerPrint:mData.fingerPrint,
            file:newName, 
            track_name:mData.oldMetadata.trackTitle,
            album_name:mData.metadata.album_name,
            artists:mData.oldMetadata.artists,
            year: mData.metadata.first_release_date.substring(0,4),
            track_length:mData.metadata.track_length,
            music_genre_list:mData.metadata.primary_genres.music_genre_list,
            cover: mData.cover.toString('base64')};
}

//router.get('/fileUpdater', function(req, res, next) {
    var filesSuccess;
    var filesFail;
    var resJson = {
        success:[ ] ,
        fail: { }
    }
    var numfiles = 0;
    var numAudio = 0;

module.exports = new Promise((resolve, reject) => { //function(resolve, reject) {

    var songs;

    var docsSongs;
    co(function*() { 
        docsSongs = yield global.colSongs.find().sort({file: 1}).toArray();
        //console.log(docsSongs);
        //assert.equal(docs.length, docs.length);
   
        fs.readdir(path, function(err, items) {
           //console.log('PATH' + items);
            for (var i=0; i<items.length; i++) {
                
            // if (items[i] == docsSongs.arrayBuffer)
  
                var file = path + '/' + items[i];
                var type = mime.lookup(file);
                //console.log(type);
                if (type == audio) {
               
                    var pos = docsSongs.findIndex(x => x.file == items[i]);
                    if (pos != -1){

                        continue;
                    }            
                    numAudio++;
                    console.log( items[i], numAudio);

                    echoPrint(file)
                        .then( 
                             function (data) {  
                               console.log('recording');
                                getRecordingMetadata(data)
                                    .then(
                                        function (data) { 
                                             var metadata = {
                                                trackId: data.metadata.id,
                                                trackTitle: data.metadata.title,
                                                artists: [],
                                                file: data.file,
                                                fingerPrint: data.fingerPrint
                                            }
                                            console.log('recording', data.metadata);
                                            for (let artist of data.metadata.artists) {
                                                console.log(artist);
                                                metadata.artists.push(artist.name);
                                            }
                                           


                                            console.log("promise all");
                                            //console.log(metadata);

                                            Promise.all([getMoreDetails(metadata),
                                                         getTrackCover(metadata.trackTitle,
                                                                       metadata.artists)])
                                                    .then(values => {
                                                        //console.log('values', values);
                                                        values[0].cover = values[1];
                                                        var result = writeTag(values[0]);
                                                        resJson.success.push(result);
                                                        numfiles++;
                                                        if(numfiles == numAudio){ 
                                                            co(function*() {
                                                                var r =  yield global.colSongs.insertMany(resJson.success);
                                                                console.log("insert");
                                                                 }).catch(function(err) {
                                                                                console.log(err.stack);
                                                                });
                                                                console.log("resolve");
                                                                resolve(resJson);

                                                        } 
                                                      
                                                        // console.log('result', result);
                                                        
                                                        //resJson.success.push(result);
                                                        }).catch(reason => { 
                                                        console.log(reason)
                                                        });
                                            


                                            /*
                                             getMoreDetails(metadata)
                                                .then(
                                                    function(data) {
                                                        var metadata = data;

                                                        getTrackCover(data.metadata.track_name + " " + data.metadata.artist_name).then(
                                                            function(data) {
                                                                metadata.cover = data;
                                                                var result = writeTag(metadata);
                                                                //console.log(result);
                                                                
                                                                resJson.success.push(result);
                                                                numfiles++;
                                                                //console.log(numfiles + ' ' + numAudio);
            
                                                                if(numfiles == numAudio){ 
                                                                    resolve(resJson);
                                                                }
                                                        }, function(err) {
                                                            console.log(err);     
                                                        }); 
                                                        //filesSuccess[data.file] = 
                                                    }, function(err) {
                                                        console.log(err);     
                                                    });*/

                                        }, function(err) {

                                        });
                            },function(err){

                            });
                        /* }).then( 
                            function(data){

                            }, function(err){

                            });*/
                    }
            }
            //console.log('end');
        }); 
        /*}).then( 
            function(data){
            // var MongoClient = require('mongodb').MongoClient,
                // var col = DB.collection('songs');
            
            //console.log('================================================\n');
            //console.log(hash);

            console.log('success'); 
            
            //res.json(resJson);
            }, function(err){

            });*/ 
            //resolve(resJson);
        if (numAudio == 0){
            resolve("finisth");
        }
    });

}).catch(function(err) {
    console.log(err.stack);
    });

//module.exports = router;
/*module.exports = new Promise((resolve, reject) => {
    console.log('exports' + resJson);
    resolve(resJson);
});*/








/*
trackMetadata1 = new trackMetadata('../src/static/LP - lost on you.mp3');

trackMetadata1.echoPrint()
    .then( 
        function (data) { 
            
            trackMetadata1.getRecordingMetadata()
                .then(
                    function (data) { 
                        trackMetadata1.trackTitle = data.title;
                        trackMetadata1.artist = data.artists[0].name;
                       
                        trackMetadata1.getMoreDetails()
                            .then(
                                function(data) {
                                    //console.log(data);
                                    trackMetadata1.writeTag(data);
                                    
                                }, function(err) {

                                });

                    }, function(err) {

                    });
        },function(err){

        });

/*
function trackMetadata(fingerPrint, duration, title, artist, album, year) {
    this.fingerPrint = fingerPrint;
    this.duration    = duration;
    this.title       = title;
    this.artist      = artist;
    this.album       = album;
    this.year        = year;
}
*/
