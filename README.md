# robot-wars

Interface to control Huina remote control toys via a web connection for a Usyd Engineering event in 2021.

## Installation

  1. Install `nodejs`
  2. Download/clone this repository
  3. To run the server: `cd` into the repository then run `npm install` to install the required packages then `node index.js` to actually run the server.
  4. To load the client: Know the IP address of the server (see the discord chat for the latest IP address). Point your browser to http://IP_ADDRESS:5000 to see the file `index.html` served to you from the server.

## Usage

This repository is hosted [live on heroku here](https://robot-wars-usyd.herokuapp.com/).

Users should navigate to [this page](https://robot-wars-usyd.herokuapp.com/index.html) and choose their robot. A live display can also be set up so that users can see through the front-facing phones attached to each device. The display should be pointed [here](https://robot-wars-usyd.herokuapp.com/display.html) and each phone logged [to here](https://robot-wars-usyd.herokuapp.com/phone.html).
