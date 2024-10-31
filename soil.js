const soil = document.querySelector('#Crop_details');

let s = document.querySelector(".soil");
function Soil() {
    // console.log("Clicked");
    s.classList.toggle("show");

    document.querySelector(".footer").classList.add("vis-hidden");
    document.querySelector(".footer").classList.remove("vis-show");

    document.querySelectorAll(".latlong").forEach(element => {
        element.classList.add("vis-hidden");
        element.classList.remove("vis-show");
    });
    document.querySelectorAll(".soil-btn").forEach(element => {
        element.classList.add("vis-hidden");
        element.classList.remove("vis-show");
    });
    document.querySelectorAll(".soil-content").forEach(element => {
        element.classList.add("vis-hidden");
        element.classList.remove("vis-show");
    });
    document.querySelector("#advanced-details").classList.remove("vis-show");
    document.querySelector("#advanced-details").classList.add("vis-hidden");
    document.querySelector("#table-soil").classList.remove("vis-show");
    document.querySelector("#table-soil").classList.add("vis-hidden");

}

function exitsoil() {
    s.classList.remove('show');
    document.querySelector(".soil-content").classList.remove("vis-show");
    document.querySelector(".soil-content").classList.add("vis-hidden");
    document.querySelector(".footer").classList.remove("vis-hidden");
    document.querySelector(".footer").classList.add("vis-show");
}

soil.addEventListener("click", Soil);
document.querySelector("#soil-exit").addEventListener("click", exitsoil);
document.querySelector("#b3").addEventListener("click", exitsoil);

async function opencontent() {
    document.querySelector(".soil-content").classList.add("vis-show");
    document.querySelector(".soil-content").classList.remove("vis-hidden");
    console.log("clicked on opencontent");

    const latitude = document.querySelector("#lat").value;
    const longitude = document.querySelector("#long").value;

    const data = await fetchSoilData(latitude, longitude);
    console.log(data);
    const time = data.dt;
    document.querySelector("#date-soil").innerHTML = `Date and Time of Data record : ${convertTimestampToDateTime(time)}`;
    document.querySelector("#moisture").innerHTML = `Soil Moisture : ${parseFloat(data.moisture * 100).toFixed(2)}%`;
    document.querySelector("#t0").innerHTML = `Soil Surface Temperature : ${parseFloat(data.t0 - 273.15).toFixed(2)}°C`;
    document.querySelector("#t10").innerHTML = `Soil Temperature at 10cm depth : ${parseFloat(data.t10 - 273.15).toFixed(2)}°C`;
}

document.querySelector("#s-submit").addEventListener("click", opencontent);

async function fetchSoilData(latitude, longitude) {
    const apiKey = 'KEY6';
    const soilUrl = `http://api.agromonitoring.com/agro/1.0/soil?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
        const response = await fetch(soilUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching soil data:', error);
    }
}

function convertTimestampToDateTime(timestamp) {
    // Convert the timestamp to milliseconds
    const date = new Date(timestamp * 1000);

    // Get the date components
    const year = date.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = ('0' + date.getDate()).slice(-2);

    // Get the time components
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? 12 : 12; // the hour '0' should be '12'

    // Return the formatted date and time
    return `${month} ${day}, ${year} at ${hours}:${minutes}:${seconds} ${ampm}`;
}

function opendetails() {
    document.querySelectorAll(".latlong").forEach(element => {
        element.classList.add("vis-show");
        element.classList.remove("vis-hidden");
    });
    document.querySelectorAll(".soil-btn").forEach(element => {
        element.classList.add("vis-show");
        element.classList.remove("vis-hidden");
    });
    document.querySelectorAll(".soil-content").forEach(element => {
        element.classList.add("vis-show");
        element.classList.remove("vis-hidden");
    });
}

document.querySelector("#b1").addEventListener("click", opendetails);

//Advanced Soil Details
function advsoil() {
    document.querySelector("#advanced-details").classList.add("vis-show");
    document.querySelector("#advanced-details").classList.remove("vis-hidden");

    document.querySelectorAll(".latlong").forEach(element => {
        element.classList.add("vis-hidden");
        element.classList.remove("vis-show");
    });
    document.querySelectorAll(".soil-btn").forEach(element => {
        element.classList.add("vis-hidden");
        element.classList.remove("vis-show");
    });
    document.querySelectorAll(".soil-content").forEach(element => {
        element.classList.add("vis-hidden");
        element.classList.remove("vis-show");
    });
}

document.querySelector("#b2").addEventListener("click", advsoil);

function opensoil_7days() {
    document.querySelector("#table-soil").classList.add("vis-show");
    document.querySelector("#table-soil").classList.remove("vis-hidden");
    fetchNDVIHistory_7days();
}

// document.querySelector("#soil7").addEventListener("click", opensoil_7days);


//Main code for All Crops Analysis

const crop = document.querySelector("#Crops_Analysis");
const crop_content = document.querySelector(".cropAnalyse");
function openanalysis() {
    console.log("Clicked");
    crop_content.classList.toggle("show");

    document.querySelector(".footer").classList.add("vis-hidden");
    document.querySelector(".footer").classList.remove("vis-show");
}
crop.addEventListener("click", openanalysis);
function exit_analysis() {
    crop_content.classList.remove("show");
    document.querySelector(".footer").classList.remove("vis-hidden");
    document.querySelector(".footer").classList.add("vis-show");
}
document.querySelector("#analysis-exit").addEventListener("click", exit_analysis);

