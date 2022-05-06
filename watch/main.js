var previousValue = 500; // Arbitrary number

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

const ticker = params.ticker;
let valueDisplay = document.getElementById("value-display");

const timer = ms => new Promise(res => setTimeout(res, ms))
const url = "https://FakeStockGenerator.filajabob123.repl.co/ticker/" + ticker;

$(document).ready(async function update() {
    while (true) {
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

            

            previousValue = result["tradingValue"]

            document.title = ticker + " - " + result["tradingValue"]
        })
        

        await timer(1300);
    }
})
