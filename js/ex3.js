function addCountry() {
    const container = document.getElementById("countries-container");
    const div = document.createElement("div");
    div.classList.add("country-input");
    div.innerHTML = `
        <input type="text" placeholder="Country Name">
        <input type="number" placeholder="Year Visited">
        <button onclick="removeCountry(this)"></button>
    `;
    container.appendChild(div);
}

function removeCountry(button) {
    button.parentElement.remove();
}

function submitData() {
    const name = document.getElementById("name").value.trim();
    const countryInputs = document.querySelectorAll(".country-input");

    if (!name) {
        console.error("Name is required.");
        return;
    }

    const countries = [];
    countryInputs.forEach(inputDiv => {
        const countryName = inputDiv.children[0].value.trim();
        const yearVisited = inputDiv.children[1].value.trim();

        if (countryName && yearVisited) {
            countries.push({ name: countryName, year: parseInt(yearVisited) });
        }
    });

    if (countries.length === 0) {
        console.error("At least one country is required.");
        return;
    }

    const data = { name, countries };

    fetch("https://thejsway-server.herokuapp.com/api/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            try {
                const json = JSON.parse(text);
                console.log("Server Response:", json);
            } catch (error) {
                console.error("Received non-JSON response:", text);
            }
        })
        .catch(error => {
            console.error("Error submitting data:", error);
        });

}
