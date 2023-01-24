function fetchData(inputText) {
    fetch("http://example.com/endpoint", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            input: inputText
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
