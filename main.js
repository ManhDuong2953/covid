const wrapper = document.querySelector(".wrapper");
var inputCountries = wrapper.querySelector(".input");
var showInfor = wrapper.querySelector(".word .detail")

function data(result, countries) {
    wrapper.classList.add("active");
    result = result[result.length - 1]
    const d = new Date();
    showInfor.innerHTML =
        "As of " + (d.getDate()) + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + result.Country + " have:<br>" +
        "Total case: " + result.Confirmed + " case" + " <br>" +
        "Active case: " + result.Active + " case" + " <br>" +
        "Deaths: " + result.Deaths + " case "
}

inputCountries.addEventListener("keyup", e => {
    var countries = e.target.value.replace(" ", "");
    if (inputCountries.focus) {
        wrapper.classList.remove("active")
    }
    if (e.key === "Enter" && countries) {
        fetchAPI(countries);
    }
});

function fetchAPI(countries) {
    wrapper.classList.remove("active")
    fetch(`https://api.covid19api.com/total/dayone/country/${countries}`)
        .then(response => response.json())
        .then(result => data(result, countries))
        .catch(err => showInfor.innerHTML = `${countries} is not the countries`);
}