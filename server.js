const express = require('express');
const path = require('path');
const app = express();

// module.exports = {
//   entry: {
//     app: './src/app.module.ts'
//   }
// }
// Serve static files....
app.use(express.static(__dirname + '/dist/HeroloWeatherApp'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/HeroloWeatherApp/index.html'));
});


// default Heroku PORT
app.listen(process.env.PORT || 3000);
