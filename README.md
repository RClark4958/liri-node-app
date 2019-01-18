# LIRI: the command-line personal assistant

LIRI takes specific commands and retrieves info for the user.

## Overview

1. LIRI provides information on upcoming concerts, movie information, and song info/previews from Spotify. LIRI can also read .txt files.

2. LIRI can instruct the user if they mistype a command, and he can handle situations where results are not found or an error has ocurred. 

3. This project relies heavily on javascript and node technologies. 

## How to use

1. This repository contains everything a user needs to operate LIRI save for personal API keys. The user will need to supply their own .env file with respective API IDs and secrets.

2. To operate LIRI: clone the repository, run an "npm install", and launch the liri.js file with node.

3. LIRI responds to the following commands:

   * node liri.js concert-this (artist/band name here)
   * node liri.js spotify-this-song (song name here)
   * node liri.js movie-this (movie name here)
   * node liri.js do-what-it-says (.txt file here)

## Contributors

* RClark4958

