var express = require('express');
var router = express.Router();
const fs = require("fs");
const Excel = require('exceljs');

/* GET Excel. */
router.get('/:guid', function(req, res, next) {
  guid_p = req.params.guid;
  if(guid_p==""){console.log("No GUID passed");
  res.render('error', { title: 'No Guid' });
}
  if (fs.existsSync(__dirname+'/../upload/'+guid_p)) {
    console.log('The file exists.');
    res.render('index', { title: 'Express',guid: guid_p });
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
    createExcel(req.body,guid);
    res.render({ success: 'success' });
  }
  else{
    res.render('error', { title: 'No Guid',message: 'wrong link' });
  }
  
});
async function createExcel(contents,guid){
  console.log(contents);
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("VetSheet");
  'Product', 'Quantity', 'Price'
worksheet.columns = [
 {header: 'Product', key: 'Product', width: 300},
 {header: 'Quantity', key: 'Quantity', width: 100}, 
 {header: 'Price', key: 'Price', width: 100,}
];
arrays =  Object.keys(contents)[0];
var json = JSON.parse(arrays);
console.log( typeof json);
for(var i = 0; i < json.length; i++){
  console.log(json[i]);
worksheet.addRow({Product: json[i][0], Quantity: json[i][1], Price: json[i][2]});
}
// save under export.xlsx
await workbook.xlsx.writeFile(__dirname+'/../upload/'+guid+'/export.xlsx');


console.log("File is written");

};
module.exports = router;
