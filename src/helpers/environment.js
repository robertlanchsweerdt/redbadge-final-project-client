let APIURL = '';

// eslint-disable-next-line
switch (window.location.hostname) {
  // this is the localhost name of your react app
  case 'localhost' || '127.0.0.1': // localhost client
    // this is the localhost naem of the API
    APIURL = 'http://localhost:4000'; // localhost server address
    // APIURL = 'https://bedrockhillshoa-server.herokuapp.com'; // connect localhost client to heroku server
    break;
  case 'bedrockhillshoa.herokuapp.com': // heroku client
    APIURL = 'https://bedrockhillshoa-server.herokuapp.com'; // heroku server
}

export default APIURL;
