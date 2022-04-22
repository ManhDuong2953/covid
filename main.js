const wrapper = document.querySelector(".wrapper");
var inputCountries = wrapper.querySelector(".input");
var showInfor = wrapper.querySelector(".word .detail")

function data(result, err) {
    wrapper.classList.add("active");
    const d = new Date();
    dateLater = result.length - 1;
    if (result) {
        showInfor.innerHTML =
            "Tính đến ngày " + ((d.getDate()) - 1) + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + result[dateLater].Country + ":<br>" +
            "Đã hồi phục: " + result[dateLater].Active + " ca <br>" +
            "Tử vong: " + result[dateLater].Deaths + " ca <br>" +
            "Tổng số ca mắc: " + result[dateLater].Confirmed + " ca"
    }
}



inputCountries.addEventListener("keyup", e => {
    var countries = e.target.value.replace(/\s+/g, ' ');
    if (inputCountries.focus) {
        wrapper.classList.remove("active")
    }
    if (e.key === "Enter" && countries) {
        fetchAPI(countries);
    }
});

function fetchAPI(countries) {
    wrapper.classList.remove("active")
    fetch(`https://api.covid19api.com/country/${countries}`)
        .then(response => response.json())
        .then(result => data(result))
        .catch(err => showInfor.innerHTML =  `Không có dữ liệu covid-19 ở quốc gia ${countries}`);
}