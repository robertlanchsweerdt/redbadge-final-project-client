let APIURL = '';

switch (window.location.hostname) {
  // this is the localhost name of your react app
  case 'localhost' || '127.0.0.1':
    // this is the localhost naem of the API
    APIURL = 'http://localhost:4000';
    break;
  case 'bedrockhillshoa.herokuapp.com':
    APIURL = 'https://bedrockhillshoa.herokuapp.com';
}

export default APIURL;
