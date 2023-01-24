document.getElementById("submit-button").addEventListener("click", function () {
    // Get the input text
    var inputText = document.getElementById("input-text").value;

    // Send a message to the service worker with the input text
    navigator.serviceWorker.controller.postMessage({
        message: 'type',
        input: inputText
    });
});
