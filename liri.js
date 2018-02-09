//////////////////////////////
// Liri App for NWBC Homework
// Caitlin Everett
// Feb 2018
/////////////////////////////


//variables, etc....
const keys = require('./keys');
const Twitter = require("twitter");
const Spotify = require('node-spotify-api');
const fs = require('fs');
const request = require('request');
var arg2 = process.argv[2];
var arg3 = process.argv[3];


////////////////////////////////////////////////
//uses Twitter module to grab tweets
function grabTweets(user) {
    let name = (user == undefined) ? "@taylorswift13" : user; //tutor taught me this-- still absorbing
    const params = {
        screen_name: name
    };
    let client = new Twitter(keys.twitter);
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach((val, index) => {

let content = `
---------------------

Tweet ${index}
Created: ${val.created_at}
Text: ${val.text}

---------------------
`;
                console.log(content);


            });

        }
        if (error) {
            console.log(error);

        }
    });

}

////////////////////////////////////////////////
//uses spotify NPM module to get song info from Spotify API
function spotifyThis(song) {
    var spotify = new Spotify(keys.spotify);
    
    spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    var firstTrack = data.tracks.items[0];

let track = `
---------------------

Artist: ${firstTrack.album.artists[0].name}
Song Name: ${firstTrack.name}
Album Name: ${firstTrack.album.name}
Preview URL: ${firstTrack.preview_url}

---------------------
 `;

    console.log(track);

    // fs.writeFile("testoutput.json", JSON.stringify(data.tracks.items[0]), function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     //console.log("The file was saved!");
    //  });`
});
}

////////////////////////////////////////////////
//uses Request module to query OMDB API and return movie info
function movieThis(movie){
    request(`http://www.omdbapi.com/?i=tt3896198&apikey=92231f0e&t=${movie}`, { json: true }, (err, res, body) => {

let movie = `
---------------------

Title: ${body.Title}
Release Year: ${body.Year}
IMDB Rating: ${body.Ratings[0].Value}
Rotton Tomatoes: ${body.Ratings[1].Value}
Country of Origin: ${body.Country}
Language: ${body.Language}
Plot: ${body.Plot}
Cast: ${body.Actors}

---------------------
 `;

        console.log(movie);

        if (err) { return console.log(err); }
      });
}

////////////////////////////////////////////////
//uses fs to read from a text file
function doThis(){
    fs.readFile('random.txt', 'utf8', function(err, contents) {
        var contentArray = contents.toString().split(/[\n,]+/); 

        for (var i = 0; i <= contentArray.length - 2; i += 2){
            arg2 = contentArray[i].trim();
            console.log(arg2);
            arg3 = contentArray[i+1].trim();
            console.log(arg3);
            userInputSwitch();
        };        

        //console.log(contentArray.length);
        //console.log(contentArray);
        //console.log(contents.toString().split(/[\n,]+/));

    });
}

////////////////////////////////////////////////
//switch statement handles user input and routes to correct function
function userInputSwitch(){
    switch (arg2) {
        case "my-tweets":
            grabTweets(arg3);
            break;
        case "spotify-this":
            spotifyThis(arg3);
            break;
        case "movie-this":
            movieThis(arg3);
            break;
        case "do-what-it-says":
            //i notice that these print in an unexpected order
            //is this all asynchronous?
            doThis(arg3);
            break;
        default:
            console.log("error: incorrect command line argument");
    }
}

userInputSwitch();