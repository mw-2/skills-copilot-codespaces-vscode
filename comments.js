// create web server
var express = require('express');
var router = express.Router();

// create mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

// create schema
var commentSchema = mongoose.Schema({
  Name: String,
  Comment: String,
  Date: String
});

// create model
var Comment = mongoose.model('Comment', commentSchema);

/* GET home page. */
router.get('/', function(req, res) {
  // find all data
  Comment.find(function(err, comments){
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(comments);
  })
});

/* GET home page. */
router.get('/:name', function(req, res) {
  // find all data
  Comment.find({Name: req.params.name}, function(err, comments){
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(comments);
  })
});

/* POST home page. */
router.post('/', function(req, res) {
  // create new data
  var comment = new Comment();
  comment.Name = req.body.name;
  comment.Comment = req.body.comment;
  comment.Date = req.body.date;

  // save data
  comment.save(function(err){
    if(err){
      console.error(err);
      res.json({result: 0});
      return;
    }
    res.json({result: 1});
  });
});

/* PUT home page. */
router.put('/:name', function(req, res) {
  // update data
  Comment.update({Name: req.params.name}, {$set: req.body}, function(err, output){
    if(err) res.status(500).json({ error: 'database failure'});
    console.log(output);
    if(!output.n) return res.status(404).json({ error: 'comment not found'});
    res.json( { message: 'comment updated' } );
  })
});

/* DELETE home page. */
router.delete('/:name', function(req, res) {
  // delete data
  Comment.remove({Name: req.params.name}, function(err, output){
    if(err) return res.status(500).json({ error: "database failure" });
    res.status(204).end();
  })
});

module.exports = router;