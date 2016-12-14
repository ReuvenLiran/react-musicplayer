# REACT REDUX NODEJS MONGODB MUSICPLAYER APP


Music player with songs list.

App's flow:

At first, it identifies songs in music_files folder and  gets a fingerprint using chrompraint (fpcalc). The fingerprint is sent to accoustid webservice and receives basic metadata. Then, it consumes musixmatch webservice for additional metadata. Also it retrieves cover photo from google custome seatch engine (limit up to 100 HTTP requests per day).

Metadata is sent to monogdb and presented at client.

[Musicplayer Live](http://reuvenliran.hopto.org/) 
 
The app was tested on Linux 64bit.
For another version of fpcalc - chromaprint:
https://acoustid.org/chromaprint

You should to set up api keys for google custom search engine,
acoustid and musixmatch. In additional, you should set up mongodb on your local machine or
use mongodb service (e.g. mongolab).
I have created a custom search engine on google for searching images.
My custom search engine is 011805731910874581480:pdmpfq5ss_m 

git clone 

npm install

open 2 terminal sessions (client and server)

npm start - for client

npm run server - for server

on ARM, you should run npm rebuild node-sass

open http://localhost:8080/ on your browser

* The app is not fully sync - deleteing files is currently not supported.

