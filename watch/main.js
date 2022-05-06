var previousValue = 500; // Arbitrary number

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

const ticker = params.ticker;
var valueDisplay = document.getElementById("value-display");

const timer = ms => new Promise(res => setTimeout(res, ms))
const url = "https://FakeStockGenerator.filajabob123.repl.co/ticker/" + ticker;

var tradingVal;

console.log("mehfsdvh")

$(document).ready(async function update() {
    while (true) {
        // Update trading value
        $.getJSON(url, async function(result) {
            valueDisplay.classList.remove("valUp");
            valueDisplay.classList.remove("valDown");
            await timer(200);
            valueDisplay.innerText = result["tradingValue"];

            if (result["tradingValue"] < previousValue) {
                // Value goes down
                valueDisplay.classList.add("valDown")
            } else if (result["tradingValue"] > previousValue) {
                // Value goes up
                valueDisplay.classList.add("valUp")
            }

            

            previousValue = result["tradingValue"];
            tradingVal = previousValue;

            document.title = ticker + " - " + result["tradingValue"];

           
        });
        
        $.getJSON("https://rosestockmarket.filajabob123.repl.co/close/" + ticker, async function(result) {
            var numericalChangeEl = document.getElementById("numerical-change");
            var percentageChangeEl = document.getElementById("percentage-change");

            var numericalChange = result["closingVal"] - tradingVal;

            numericalChangeEl.innerText = numericalChange;
            console.log(numericalChange)
            await timer(1300);
        });

        console.log("hi")
        
    }
});
