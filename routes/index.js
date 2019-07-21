var express = require('express');
var router = express.Router();
const fs = require("fs");

/* GET Excel. */
router.get('/:guid', function(req, res, next) {
  guid = req.params.guid;
  if(guid==""){console.log("No GUID passed");
  res.render('error', { title: 'No Guid' });
}
  if (fs.existsSync(__dirname+'/../upload/'+guid)) {
    console.log('The file exists.');
    res.render('index', { title: 'Express' });
  }
  else{
    res.render('error', { title: 'No Guid',message: 'wrong link' });
  }
  
});
router.post('/:guid', function(req, res, next) {
  guid = req.params.guid;
  if(guid==""){console.log("No GUID passed");
  console.log(req.body);
  res.render('error', { title: 'No Guid' });
}
  if (fs.existsSync(__dirname+'/../upload/'+guid)) {
    console.log('The file exists.');
    console.log(req.body);
    res.render('index', { title: 'Express' });
  }
  else{
    res.render('error', { title: 'No Guid',message: 'wrong link' });
  }
  
});

module.exports = router;
