function fetchData() {
    var inputText = document.getElementById("input-text").value;
    var summary = document.querySelector('input[name="summary"]:checked');
    var condense = document.querySelector('input[name="condense"]:checked');
    var complexity = document.getElementById("complexity-slider").value;

    if (!inputText) {
        document.querySelector("#message").innerHTML = "Please enter some text";
        return;
    }

    if (!summary && !condense) {
        document.querySelector("#message").innerHTML = "Please select at least one option";
        return;
    }

    document.querySelector("#message").innerHTML = "";
    fetch("https://prmm2b9c5h.execute-api.us-east-2.amazonaws.com/default/text-process-v1", {
        method: "POST",
        headers: {
            "authorization": "P731s0qAZEvI5tAsBtJ822NZ8IiP0HG1W2uvVso8",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            input: inputText,
            complexity: complexity,
            summary: summary ? summary.value : false,
            condense: condense ? condense.value : false
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(data => {
            document.getElementById("input-text").value = data.processedText;
        })
        .catch(error => {
            // handle errors
        });
}