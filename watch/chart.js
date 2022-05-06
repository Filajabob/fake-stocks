function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

anychart.onDocumentReady(function() {
    anychart.data.loadJsonFile(
        'https://FakeStockGenerator.filajabob123.repl.co/chart-data/' + ticker,
        function(data) {
            var dataTable = anychart.data.table();
            dataTable.addData(data);

            var mapping = dataTable.mapAs({
                open: 1,
                high: 2,
                low: 3,
                close: 4
            });

            // create stock chart
            var chart = anychart.stock();

            // create first plot on the chart
var plot = chart.plot(0);

// set grid settings
plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);


var series = plot.candlestick(mapping)
        .name('Tesla');

series.legendItem().iconType('rising-falling');

// create scroller series with mapped data
chart.scroller().candlestick(mapping);

// create range picker
var rangePicker = anychart.ui.rangePicker();

// init range picker
rangePicker.render(chart);

// create range selector
var rangeSelector = anychart.ui.rangeSelector();

// init range selector
rangeSelector.render(chart);

// sets the title of the chart
chart.title('poop');

// set container id for the chart
chart.container('stock-chart');

// initiate chart drawing
chart.draw();
        }
    )
    
});

