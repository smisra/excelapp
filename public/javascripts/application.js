var data1 = [
    [ 'medicine 1', 10, 1.10],
    [ 'medicine 2', 30, 0.40],
    [ 'ointment 1', 15, 0.45],
    [ 'ointment 2', 20, 0.49],
];

var table = jexcel(document.getElementById('spreadsheet1'), {
    data:data1,
    colHeaders: [ 'Product', 'Quantity', 'Price' ],
    colWidths: [ 300, 100, 100 ],
    columns: [
        { type: 'autocomplete', source:[ 'medicine 1','medicine 2','ointment 1','ointment 2' ] },
        { type: 'number' },
        { type: 'number' }
    ]
});

function submitData(){
    $.ajax({
        type: "POST",
         url: window.location.href,
         data: JSON.stringify(table.getData()),
        success: function(response)
         {
            if($.trim(response) == 'success')
                 window.location.replace("/success");
            else
                $("#result").html(response);
       }
     });
}