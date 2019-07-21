var express = require('express');
var router = express.Router();
const fs = require("fs");
const Excel = require('exceljs');

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
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("VetSheet");
  'Product', 'Quantity', 'Price'
worksheet.columns = [
 {header: 'Product', key: 'Product', width: 300},
 {header: 'Quantity', key: 'Quantity', width: 100}, 
 {header: 'Price', key: 'Price', width: 100,}
];

worksheet.addRow({Product: 2, Quantity: 'Jane Doe', Price: new Date(1965, 1, 7)});

// save under export.xlsx
await workbook.xlsx.writeFile(__dirname+'/../upload/'+guid+'/export.xlsx');


console.log("File is written");

};
module.exports = router;
