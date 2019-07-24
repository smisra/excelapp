var express = require('express');
var router = express.Router();
const fs = require("fs");
const Excel = require('exceljs');
const { Safe } = require("../safe");

/* GET Excel. */
router.get('/encrypt/:guid', function(req, res, next) {
  console.log('indide enc');
  guid_p = req.params.guid;
  if(guid_p==""){console.log("No GUID passed");
  res.render('error', { title: 'No Guid' });
}
  var safe = new Safe(__dirname+"/../data/"+guid_p+"/data.json", "password");
  var data1 = [
    [ 'medicine 1', 10, 1.10],
    [ 'medicine 2', 30, 0.40],
    [ 'ointment 1', 15, 0.45],
    [ 'ointment 2', 20, 0.49],
];
  
    var data  = safe.encrypt(data1);
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from('<h2>Encrypted</h2>'));
  res.end();
  
});
router.get('/:guid', function(req, res, next) {
  guid_p = req.params.guid;
  if(guid_p==""){console.log("No GUID passed");
  res.render('error', { title: 'No Guid' });
}
  if (fs.existsSync(__dirname+'/../data/'+guid_p)) {
    console.log('The file exists.');
    var safe = new Safe(__dirname+"/../data/"+guid_p+"/data.json", "password");
    var data  = safe.decrypt();
    res.render('index', { title: 'Sainsburys',guid: guid_p,data: data});
  }
  else{
    res.render('error', { title: 'No Guid',message: 'wrong link' });
  }
  
});
router.post('/:guid', function(req, res, next) {
  guid = req.params.guid;
  if(guid==""){console.log("No GUID passed");
  res.render('error', { title: 'No Guid' });
}
  if (fs.existsSync(__dirname+'/../upload/'+guid)) {
    console.log('The file exists.');
    console.log(req.body);
    createJSON(req.body,guid);
    res.render({ success: 'success' });
  }
  else{
    res.render('error', { title: 'No Guid',message: 'wrong link' });
  }
  
});

async function createJSON(contents,guid){
  console.log(contents);

  var safe3 = new Safe(__dirname+"/../upload/"+guid_p+"/result.json", "password");
  arrays =  Object.keys(contents)[0];
  var json = JSON.parse(arrays);

// save under export.xlsx
await safe3.encrypt(json);

 

console.log("File is written");

};
module.exports = router;
