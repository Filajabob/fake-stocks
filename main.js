document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    window.location.href += "/watch/index.html?ticker=" + document.getElementById("ticker").value
});