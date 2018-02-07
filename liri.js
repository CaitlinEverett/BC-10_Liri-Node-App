const keys = require('./keys');
const Twitter = require("twitter");
const Spotify = require('node-spotify-api');
const fs = require('fs');

const arg2 = process.argv[2];
const arg3 = process.argv[3];
// depending on user command run a function

function grabTweets(user) {
    let name = (user == undefined) ? "@taylorswift13" : user;
    const params = {
        screen_name: name
    };
    let client = new Twitter(keys.twitter);
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach((val, index) => {
                let content = `
Tweet ${index}
Created: ${val.created_at}
Text: ${val.text}
                `;
                console.log(content);


            });

        }
        if (error) {
            console.log(error);

        }
    });

}

function spotifyThis(song) {
    console.log("spotify me", song); 
    var spotify = new Spotify(keys.spotify);
    
    spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    //console.log(data.tracks.items[0]); 
    console.log(data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].preview_url);
    console.log("");

    // fs.writeFile("testoutput.json", JSON.stringify(data.tracks.items[0]), function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
     
    //     //console.log("The file was saved!");
    //  });
});

}
switch (arg2) {
    case "my-tweets":
        grabTweets(arg3);
        break;
    case "spotify-this":
        spotifyThis(arg3);
        break;
    default:
        console.log("error: incorrect command line argument");


}