function loadForm(){
    
}
function submitData(){
    
}
function populate(frm, data) {
    $.each(data, function(key, value){
      $('[name='+key+']', frm).val(value);
    });
  }
$(document).ready(function(){
    populate($('form[name="claims"]'),data1);
});
  