var express = require('express');
var router = express.Router();

var fs = require('fs'); 
var id3 = require('id3js');
var mime = require('mime-types');
var exec  = require('child_process').execFile;
var ID3Writer = require('browser-id3-writer');
var request = require('request');
var Promise = require('promise');

const audio = 'audio/mpeg';
const path = '../src/static'

var child;
  /*              
          id3({ file: file, type: id3.OPEN_LOCAL }, function(err, tags) {
            console.log(tags);
          }); */
 
  
          
function echoPrint(file) {
        return new Promise((resolve, reject) => {

            child = exec('../fpcalc', [ file ],
                (error, stdout, stderr) => { 
              
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
                    console.log(this.file + " got fingerprint");
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
        
        console.log('getRecordingMetadata ' + this.file);
        return new Promise((resolve, reject) => {
            
          request(url, function (error, response, body) {
                
                if (!error && response.statusCode == 200) {
                    var mBody = JSON.parse(body);
                    let metadata = {
                        metadata: mBody.results[0].recordings[0],
                        file: oldMetadata.file
                    }
                    resolve(metadata);
                } else {
                    reject(error);
                }
                
            });
        })
    }

    function getMoreDetails(oldMetadata) {

        var url = 'https://api.musixmatch.com/ws/1.1/track.search?apikey=ed989de507e721695e454b7df8337677&format=json&q_track=';
        url = url + oldMetadata.trackTitle + '&q_artist=' + oldMetadata.artist + '&quorum_factor=1';
        
        return new Promise((resolve, reject) => {
            
            request(url, function (error, response, body) {
                
                if (!error && response.statusCode == 200) {
                    var mBody = JSON.parse(body);
                    var metadata = {
                        metadata: mBody.message.body.track_list[0].track,
                        file: oldMetadata.file
                    }
                    resolve(metadata);
                    console.log('getMoreDetails success');
                    //console.log(mBody.message.body.track_list[0].track.track_name + " got its metadata");
                } else {
                    console.log('error ' + error);
                    reject(error);
                }
            
            });
        })
    }

    function writeTag(mData) {
        
    var songBuffer = fs.readFileSync(mData.file);
    //var coverBuffer = fs.readFileSync('path_to_cover.jpg');
    //console.log(trackMetada);
    console.log(mData);
    var writer = new ID3Writer(songBuffer);
      writer.setFrame('TIT2', mData.metadata.track_name)
            .setFrame('TPE1', [mData.metadata.artist_name])
            .setFrame('TPE2', mData.metadata.artist_name)
            .setFrame('TALB', mData.metadata.album_name)
            .setFrame('TYER', mData.metadata.first_release_date.substring(0,4)) // get year
            .setFrame('TLEN', mData.metadata.track_length * 1000) //milliseconds
            .setFrame('TCON', mData.metadata.primary_genres.music_genre_list)
            .setFrame('USLT', 'This is unsychronised lyrics')
        // .setFrame('APIC', coverBuffer);
    writer.addTag();
    
    var taggedSongBuffer = new Buffer(writer.arrayBuffer);
    fs.writeFileSync(mData.file, taggedSongBuffer);

    console.log(this.file + ' tags were updated');
    }
 
router.get('/fileUpdater', function(req, res, next) {
 
    fs.readdir(path, function(err, items) {
        console.log('path' + path);
        for (var i=0; i<items.length; i++) {
        
            var file = path + '/' + items[i];
            var type = mime.lookup(file);
        
            if (type == audio) {
            //trackMetadata = new TrackMetadata(file);
            new Promise(function(resolve, reject) {

                    echoPrint(file)
                        .then( 
                            function (data) { 
                                console.log('bla ' + data);
                                getRecordingMetadata(data)
                                    .then(
                                        function (data) { 
                                        
                                            console.log(data);

                                        // var trackTitle = data.metadata.title;
                                        // var artist = data.metadata.artists[0].name;
                                        
                                            var metadata = {
                                                trackTitle: data.metadata.title,
                                                artist: data.metadata.artists[0].name,
                                                file: data.file
                                            }
                                            getMoreDetails(metadata)
                                                .then(
                                                    function(data) {
                                                    
                                                        writeTag(data);
                                                        
                                                    }, function(err) {
                                                        console.log(trackMetadata);     
                                                    });

                                        }, function(err) {

                                        });
                            },function(err){

                            });
                    }).then( 
                        function(data){

                        }, function(err){

                        }
                    );
            }
        }
    });
});

module.exports = router;

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
