var express = require('express');
var router = express.Router();
var passport = require('passport');
var tokenUtility = require('../utility/tokenUtility');

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    // Book.find(function (err, books) {
    //   if (err) return next(err);
    //   res.json(books);
    // });
    res.send('Express REST API');
    console.log("PUT OK!");
    

    var io = req.app.get('socketio');

    //io.to(//socket.id//).emit("update", data);
    io.sockets.emit('update', "gdgdgdfgdf"); // how?

    //res.json({result: "update sent over IO"});

  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;