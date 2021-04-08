let express = require('express')
var router = express.Router();

router.post('/', async function(req, res){
	const username = req.body.username;
	res.send("username you entered is: " + username );
  res.end();
});

//export this router to use in our index.js
module.exports = router;
