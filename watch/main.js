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

var comparingTo;

async function updateVals() {
    var valueDisplay = document.getElementById("value-display");
    var numericalChangeEl = document.getElementById("numerical-change");
    var percentageChangeEl = document.getElementById("percentage-change");

    var closeNumChangeEl = document.getElementById("close-numerical-change");
    var closePerChangeEl = document.getElementById("close-percentage-change");

    // Update trading value
    $.getJSON(url, async function(result) {
        if (!result["open"]) {
            document.getElementById("open-status").textContent = "After hours. Comparing against yesterday's close."
            comparingTo = result["previousClose"]
        } else {
            document.getElementById("open-status").textContent = "Market open. Comparing against yesterday's close."
            comparingTo = result["closingVal"]
        }

        valueDisplay.classList.remove("valUp");
        valueDisplay.classList.remove("valDown");

        numericalChangeEl.classList.remove("valUp");
        numericalChangeEl.classList.remove("valDown");

        await timer(200);

        numericalChange = -(parseFloat(comparingTo - parseFloat(result["tradingValue"]))).toFixed(2);
        percentageChange = (Math.abs(comparingTo - result["tradingValue"]) / comparingTo * 100).toFixed(2);

        closeNumericalChange = -(parseFloat(result["previousClose"] - parseFloat(result["closingVal"]))).toFixed(2);
        closePercentageChange = (Math.abs(result["previousClose"] - result["closingVal"]) / result["previousClose"] * 100).toFixed(2);

        valueDisplay.innerText = result["tradingValue"].toFixed(2);

        // Handle close data
        if (!result["open"]) {
            document.getElementById("at-close").textContent = result["closingVal"]
            document.getElementById("at-close-context").textContent = "At close. Comparing against yesterday's close."

            // Display numerical change
            if (closeNumericalChange < 0) {
                closeNumChangeEl.innerText = closeNumericalChange
                closeNumChangeEl.style.color = "red"
            } else {
                closeNumChangeEl.innerText = '+' + closeNumericalChange
                closeNumChangeEl.style.color = "rgb(22, 219, 4)"
            }

            // Display percentage change
            if (closeNumericalChange < 0) {
                closePerChangeEl.innerText = "(-" + closePercentageChange + '%)';
                closePerChangeEl.style.color = "red";
            } else {
                closePerChangeEl.innerText = '(+' + closePercentageChange + '%)';
                closePerChangeEl.style.color = "rgb(22, 219, 4)";
            }
        } else {
            closeNumChangeEl.innerText = "";
            closePerChangeEl.innerText = "";
            document.getElementById("at-close").textContent = "";
            document.getElementById("at-close-context").textContent = "";
        }

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

        document.title = `${ticker} - ${result["tradingValue"]} | ${numericalChangeEl.innerText} ${percentageChangeEl.innerText}`
    });
}

$(document).ready(async function() {
    $.getJSON(`https://FakeStockGenerator.filajabob123.repl.co/ticker/${ticker}`, function(res) {
        document.getElementById("page-header").innerText = res["name"]
    })

    

    while (true) {
        await timer(1300);
        updateVals();
    }
});