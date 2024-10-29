function fetchEthiopianDate() {
    fetch("https://ethiopiadate.onrender.com/ethiopian-date")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log('Formatted Ethiopian Date:', data.formattedTime); // Log the formatted date
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Call the function to fetch the date
fetchEthiopianDate();