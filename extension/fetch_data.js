function fetchData() {
    var inputText = document.getElementById("input-text").value;
    var summary = document.querySelector('input[name="summary"]:checked');
    var condense = document.querySelector('input[name="condense"]:checked');
    var complexity = document.getElementById("complexity_slider").value;

    if (!inputText) {
        document.querySelector("#message").innerHTML = "Please enter some text";
        return;
    }

    if (!summary && !condense) {
        document.querySelector("#message").innerHTML = "Please select at least one option";
        return;
    }

    document.querySelector("#message").innerHTML = "";
    fetch("http://example.com/endpoint", {
        method: "POST",
        headers: {
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
            // handle the response
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(data => {
            // do something with the data
        })
        .catch(error => {
            // handle errors
        });
}