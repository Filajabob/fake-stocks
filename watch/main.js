console.log("HELLLO")

var previousValue = 500; // Arbitrary number

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

const ticker = params.ticker;
var valueDisplay = document.getElementById("value-display");

const timer = ms => new Promise(res => setTimeout(res, ms))
const url = "https://FakeStockGenerator.filajabob123.repl.co/ticker/" + ticker;

var tradingVal;
var numericalChange;
var percentageChange;

var prevNumChange;
var prevPerChange;

async function updateVals() {
    var valueDisplay = document.getElementById("value-display");
    var numericalChangeEl = document.getElementById("numerical-change")
    var percentageChangeEl = document.getElementById("percentage-change")

    // Update trading value
    $.getJSON(url, async function(result) {
        if (!result["open"]) {
            document.getElementById("open-status").textContent = "Market closed."
        } else {
            document.getElementById("open-status").textContent = "Market open."
        }

        valueDisplay.classList.remove("valUp");
        valueDisplay.classList.remove("valDown");

        numericalChangeEl.classList.remove("valUp");
        numericalChangeEl.classList.remove("valDown");

        await timer(200);

        numericalChange = -(parseFloat(result["closingVal"]) - parseFloat(result["tradingValue"])).toFixed(2);
        percentageChange = (Math.abs(result["closingVal"] - result["tradingValue"]) / result["closingVal"] * 100).toFixed(2);

        valueDisplay.innerText = result["tradingValue"].toFixed(2);

        if (result["tradingValue"] < previousValue) {
            // Value goes down
            valueDisplay.classList.add("valDown")
        } else if (result["tradingValue"] > previousValue) {
            // Value goes up
            valueDisplay.classList.add("valUp")
        }

        // Display numerical change
        if (numericalChange < 0) {
            numericalChangeEl.innerText = numericalChange
            numericalChangeEl.style.color = "red"
        } else {
            numericalChangeEl.innerText = '+' + numericalChange
            numericalChangeEl.style.color = "rgb(22, 219, 4)"
        }

        // Display percentage change
        if (numericalChange < 0) {
            percentageChangeEl.innerText = "(-" + percentageChange + '%)';
            percentageChangeEl.style.color = "red";
        } else {
            percentageChangeEl.innerText = '(+' + percentageChange + '%)';
            percentageChangeEl.style.color = "rgb(22, 219, 4)";
        }

        prevNumChange = numericalChange
        prevPerChange = percentageChange

        previousValue = result["tradingValue"];
        tradingVal = previousValue;

        document.title = ticker + " - " + result["tradingValue"]
    });
}

$(document).ready(async function() {
    $.getJSON("https://FakeStockGenerator.filajabob123.repl.co/ticker/" + ticker, function(res) {
        document.getElementById("page-header").innerText = res["name"]
    })

    

    while (true) {
        await timer(1300);
        updateVals();
    }
});