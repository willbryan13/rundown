var el = document.getElementById('submit-button');

function processSubmit() {
    // Get the input text
    var inputText = document.getElementById("input-text").value;
    // Get the checkboxes
    var summaryCheckbox = document.getElementById("summary_box");
    var condenseCheckbox = document.getElementById("condense_box");
    // Get the complexity slider
    var complexitySlider = document.getElementById("complexity-slider");

    // check if any of the checkboxes is checked
    if (!summaryCheckbox.checked && !condenseCheckbox.checked) {
        // Show an error message
        document.getElementById("message").innerHTML = "Please select at least one option";
        return;
    }
    // Clear the error message
    document.getElementById("message").innerHTML = "";
    // Send a message to the service worker with the input text, the selected options and the complexity value
    navigator.serviceWorker.controller.postMessage({
        message: 'type',
        input: inputText,
        summary: summaryCheckbox.checked,
        condense: condenseCheckbox.checked,
        complexity: complexitySlider.value
    });
}

if (el) {
    el.addEventListener('click', processSubmit); 
}
