if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/background.js')
            .then(registration => {
                console.log('Service worker registered:', registration);
                createContextMenu();
            })
            .catch(registrationError => {
                console.log('Service worker registration failed:', registrationError);
            });
    });
}

self.addEventListener('message', event => {
    if (event.data === 'browser-action') {
        var inputText = event.data.input;
        // send input to the backend server
        importScripts('fetch-data.js');
        fetchData(inputText);
    }
});


