// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const path = require('path');

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function (req, res) {
  res.render('pages/about');
});

// comments page
app.get('/comments', function (req, res) {
  res.render('pages/comments');
});

// contact page
app.get('/contact', function (req, res) {
  res.render('pages/contact');
});

// submit page
app.get('/submit', function (req, res) {
  res.render('pages/submit');
});

// post comments page
app.post('/comments', function (req, res) {
  res.render('pages/comments');
});

// post comments page
app.post('/submit', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var comment = req.body.comment;
  var data = {
    name: name,
    email: email,
    comment: comment
  };
  console.log(data);
  fs.appendFile('comments.json', JSON.stringify(data) + '\n', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  res.render('pages/submit');
});

// server listen to port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));