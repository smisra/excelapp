var data1 = [
    [ 'Cheese', 10, 1.10, '=B1*C1'],
    [ 'Apples', 30, 0.40, '=B2*C2'],
    [ 'Carrots', 15, 0.45, '=B3*C3'],
    [ 'Oranges', 20, 0.49, '=B4*C4'],
];

var table = jexcel(document.getElementById('spreadsheet1'), {
    data:data1,
    colHeaders: [ 'Product', 'Quantity', 'Price', 'Total' ],
    colWidths: [ 300, 100, 100, 100 ],
    columns: [
        { type: 'autocomplete', source:[ 'Apples','Bananas','Carrots','Oranges','Cheese','Pears' ] },
        { type: 'number' },
        { type: 'number' },
        { type: 'number' },
    ]
});