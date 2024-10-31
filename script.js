let nav1 = document.querySelectorAll(".nav1");
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

//Home text
// Home text
document.querySelector(".Original").classList.add("vis-hidden");
document.querySelector(".Original").classList.remove("vis-show");

function visible() {
    setTimeout(function () {
        document.querySelector(".Original").classList.add("vis-show");
        document.querySelector(".Original").classList.remove("vis-hidden");
    }, 31000);
}

visible();


// Environment INFORMATION
const mid = document.querySelector("#inf-details");
const f = document.querySelector(".footer");
const i1 = document.querySelector("#i1");
const i2 = document.querySelector("#i2");

let en = document.querySelector("#Environment");
en.addEventListener("click", toggleBox);

function toggleBox() {
    let envirinf = document.querySelector(".envirinf");
    envirinf.classList.toggle('show');
    f.classList.add("vis-hidden");
    en.classList.add("vis-hidden");
    f.classList.remove("vis-show");
    en.classList.remove("vis-show");
    i1.classList.add("vis-hidden");
    i1.classList.remove("vis-show");
    i2.classList.add("vis-hidden");
    i2.classList.remove("vis-show");
}

let exit = document.querySelector("#exit");
exit.addEventListener("click", () => {
    let envirinf = document.querySelector(".envirinf");
    envirinf.classList.remove('show');
    f.classList.remove("vis-hidden");
    en.classList.remove("vis-hidden");
    f.classList.add("vis-show");
    en.classList.add("vis-show");
    i1.classList.remove("vis-hidden");
    i1.classList.add("vis-show");
    i2.classList.remove("vis-hidden");
    i2.classList.add("vis-show");
});


//chatbot
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.querySelector(".chatbox");
    const chatbtn = document.querySelector("#chatbot");
    const startRecordBtn = document.querySelector(".listenicon");
    const textbox = document.querySelector(".chatbtns");
    const text = document.querySelector("#textbox");


    function openchat() {
        chatBox.classList.toggle("show1");
        if (chatBox.classList.contains("show1")) {
            let initialResponse = document.createElement('div');
            initialResponse.className = 'response-box'; // Add a class for styling
            initialResponse.innerText = "Welcome to the Agriculture App Chatbot! Here are some things you can ask me:\n- 'Open weather forecast'\n- 'Tell me today's current weather'\n- 'Tell me future weather forecast'\n- 'Tell me soil details'\n- 'Tell me environment details'\n- 'Community engagement'\n- 'Overview'\n- 'Vision'\n-All Crops Analysis\n- 'How are you'\n- 'Goodbye'\n- 'Thank you'";
            textbox.appendChild(initialResponse);
        }
    }

    chatbtn.addEventListener("click", openchat);

    function exitchat() {
        chatBox.classList.remove("show1");
    }

    document.querySelector("#exit-chat").addEventListener("click", exitchat);

    // Check for browser support
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition. Try Chrome.');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        text.textContent = 'Listening...';
        startRecordBtn.classList.remove("listenicon");
        startRecordBtn.classList.add("listen_img");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log(transcript);
        let userDiv = document.createElement('div');
        userDiv.className = 'user-box'; // Add a class for styling
        userDiv.innerText = `${transcript}`;
        textbox.appendChild(userDiv);
        processCommand(transcript);
    };

    recognition.onerror = (event) => {
        console.error(event.error);
        text.textContent = 'Error...';
    };

    recognition.onend = () => {
        text.textContent = 'Start Recording';
        startRecordBtn.classList.add("listenicon");
        startRecordBtn.classList.remove("listen_img");
    };

    startRecordBtn.addEventListener('click', () => {
        recognition.start();
    });
    function processCommand(command) {
        let response = '';
        command = command.toLowerCase(); // Convert command to lowercase

        if (command.includes('hello')) {
            response = 'Hello! How can I help you today?';
        } else if (command.includes('good morning')) {
            response = 'Good Morning!! How can I help you today?';
        } else if (command.includes("open weather forecast") || command.includes("weather forecast") || command.includes("weather")) {
            response = "Sure! I'm taking you to the Weather page\n Your Platform is loading...";
            setTimeout(open_weather, 3000);
        } else if (command.includes("tell me today's current weather") || command.includes("live weather") || command.includes("current")) {
            response = "Sure! I'm taking you to the Weather page\n Your Platform is loading...";
            setTimeout(current_weather, 3000);
        } else if (command.includes("tell me future weather forecast") || command.includes("ahead") || command.includes("future weather forecast")) {
            response = "Sure! I'm taking you to the Weather page\n Your Platform is loading...";
            setTimeout(showFutureWeatherForm, 3000);
        }
        else if (command.includes("analysis") || command.includes("crops") || command.includes("crop")) {
            response = "Sure! I'm taking you to the Crop-Analysis page\n Your Platform is loading...";
            setTimeout(openanalysis(), 3000);
        }
        else if (command.includes("tell me soil details") || command.includes("soil")) {
            response = "Sure! I'm taking you to the Soil details page\n Your Platform is loading...";
            setTimeout(Soil, 3000);
        } else if (command.includes("tell me environment details") || command.includes("environment")) {
            response = "Sure! I'm taking you to the Environment details page\n Your Platform is loading...";
            setTimeout(toggleBox, 3000);
        } else if (command.includes("community engagement") || command.includes("community")) {
            response = "Sure! I'm taking you to the Community details page\n Your Platform is loading...";
            setTimeout(opencommunity, 3000);
        } else if (command.includes("commands") || command.includes("how to use") || command.includes("perform") || command.includes("command")) {
            response = "Here are some commands you can use:\n- 'Hello'\n- 'Good morning'\n- 'Open weather forecast'\n- 'Tell me today's current weather'\n- 'Tell me future weather forecast'\n- 'Tell me soil details'\n- 'Tell me environment details'\n- 'Community engagement'\n-'Overview'\n-'Vision'\n-All Crops Analysis\n- 'How are you'\n- 'Goodbye'\n- 'Thank you'\n-'How to Use Chat of Our Agriculture Website";
        } else if (command.includes("how are you")) {
            response = "I'm very fine, what about you?";
        } else if (command.includes("goodbye") || command.includes("bye")) {
            response = "Goodbye! Have a great day!";
        } else if (command.includes("thank you") || command.includes("thanks")) {
            response = "You're welcome!";
        } else if (command.includes("overview") || command.includes("overall") || command.includes("userguide")) {
            response = "Overview\nThe project that integrates current weather details, crop-recommendation datasets, and soil information offers numerous benefits to the agricultural sector. By providing real-time weather updates, farmers can make timely decisions to protect their crops from adverse weather conditions, thereby reducing potential losses. The crop-recommendation dataset, which leverages data on soil characteristics, historical crop performance, and prevailing weather patterns, helps farmers select the most suitable crops for their land, optimizing yields and resource usage.";
        } else if (command.includes("vision") || command.includes("way ahead") || command.includes("outcome")) {
            response = "Our Vision\nThe vision of this agriculture-focused project is to revolutionize farming by harnessing the power of data and technology. By providing real-time weather updates, comprehensive crop-recommendation datasets, and detailed soil information, the project aims to empower farmers with actionable insights. This will enable them to make informed decisions, optimize crop yields, and manage resources more efficiently. The ultimate goal is to foster sustainable agricultural practices, enhance food security, and improve the livelihoods of farmers.";
        } else if (command.includes("chat") || command.includes("how to use chatbot") || command.includes("chat details") || command.includes("how to do")) {
            response = "How to Use the Chat System of Our Agriculture App:\n1. **Open the Chat**: Click on the chatbot icon to open the chat interface.\n2. **Start Interaction**: You can type your commands or questions in the text box provided.\n3. **Use Voice Commands**: Alternatively, click on the microphone icon to use voice commands. Speak clearly and wait for the chatbot to process your command.\n4. **Receive Responses**: The chatbot will respond with the appropriate information or action based on your command.\n5. **Navigate Pages**: For commands like 'open weather forecast' or 'tell me soil details', the chatbot will navigate you to the respective pages.\n6. **Check Commands**: If you need help with commands, type 'commands' to see a list of available commands.\n7. **End Interaction**: To close the chat, click on the exit icon.\n8. **Clear Chat**: If you need to clear the chat, click on the clear button to erase all text from the chatbox.";
        } else {
            response = 'I did not understand that.';
        }

        let responseDiv = document.createElement('div');
        responseDiv.className = 'response-box'; // Add a class for styling
        responseDiv.innerText = `${response}`;
        textbox.appendChild(responseDiv);
    }

    const clearbtn = document.querySelector("#clear");
    clearbtn.addEventListener("click", clearchat);

    function clearchat() {
        textbox.innerHTML = ''; // Clear all text from the chatbox
    }

});
//Footer Buttons
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#f-weather").addEventListener("click", open_weather);
    document.querySelector("#f-soil").addEventListener("click", Soil);
    document.querySelector("#f-analyse").addEventListener("click", openanalysis);
    document.querySelector("#f-other").addEventListener("click", toggleBox);
});


//AQI DATA
// Replace 'YOUR_API_KEY' with your actual API key from AQICN
const apiKey = 'KEY7';

// Function to fetch AQI data
async function getAQI(city) {
    const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${apiKey}`);
    const data = await response.json();
    return data;
}

// Function to display AQI data

const basic_en = document.querySelector("#basic_En");
basic_en.addEventListener("click", openaqi);
document.querySelector("#aqi").classList.remove("vis-show");
document.querySelector("#aqi").classList.add("vis-hidden");

function openaqi() {
    document.querySelector("#aqi").classList.add("vis-show");
    document.querySelector("#aqi").classList.remove("vis-hidden");
}
document.querySelector(".exit-button").addEventListener("click", exitaqi);
function exitaqi() {
    document.querySelector("#aqi").classList.remove("vis-show");
    document.querySelector("#aqi").classList.add("vis-hidden");
}
document.querySelector(".submit-button").addEventListener("click", opendetails_aqi);

function opendetails_aqi() {
    const place = document.querySelector("#input-city-aqi").value;
    // Fetch and display AQI data for the specified city
    getAQI(place).then(displayAQI).catch(error => console.error('Error:', error));
}

function displayAQI(data) {
    if (data.status === 'ok') {
        const aqi = data.data.aqi;
        const city = data.data.city.name;
        const pm25 = data.data.iaqi.pm25 ? data.data.iaqi.pm25.v : 'N/A';
        const pm10 = data.data.iaqi.pm10 ? data.data.iaqi.pm10.v : 'N/A';
        const no2 = data.data.iaqi.no2 ? data.data.iaqi.no2.v : 'N/A';
        const o3 = data.data.iaqi.o3 ? data.data.iaqi.o3.v : 'N/A';

        document.querySelector("#city-inf-aqi").innerHTML = `City: ${city}`;
        document.querySelector("#aqidetails").innerHTML = `AQI: ${aqi} <br><div><span>${categorizeAQI(aqi)}</span></div>`;
        document.querySelector("#pm25").innerHTML = `PM2.5: ${pm25} μg/m3`;
        document.querySelector("#pm10").innerHTML = `PM10: ${pm10}`;
        document.querySelector("#o3").innerHTML = `O3: ${o3} μg/m3`;
        document.querySelector("#No2").innerHTML = `NO2: ${no2} μg/m3`;

        drawAQIGauge(aqi)
    } else {
        console.log('Error fetching AQI data');
    }
}

function categorizeAQI(aqi) {
    if (aqi >= 0 && aqi <= 50) {
        return "Good";
    } else if (aqi >= 51 && aqi <= 100) {
        return "Moderate";
    } else if (aqi >= 101 && aqi <= 150) {
        return "Unhealthy for Sensitive Groups";
    } else if (aqi >= 151 && aqi <= 200) {
        return "Unhealthy";
    } else if (aqi >= 201 && aqi <= 300) {
        return "Very Unhealthy";
    } else if (aqi > 300) {
        return "Hazardous";
    } else {
        return "Invalid AQI";
    }
}
//Draw AQi Gauge

function drawAQIGauge(aqi) {
    const canvas = document.getElementById('aqiGauge');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ddd';
    ctx.fill();

    // Determine the color based on AQI value
    let color;
    if (aqi >= 0 && aqi <= 50) {
        color = 'green';
    } else if (aqi >= 51 && aqi <= 100) {
        color = 'yellow';
    } else if (aqi >= 101 && aqi <= 150) {
        color = 'orange';
    } else if (aqi >= 151 && aqi <= 200) {
        color = 'red';
    } else if (aqi >= 201 && aqi <= 300) {
        color = 'purple';
    } else if (aqi > 300) {
        color = 'maroon';
    } else {
        color = 'gray';
    }

    // Draw the AQI arc
    const endAngle = (aqi / 500) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = color;
    ctx.fill();

    // Draw the AQI value text
    ctx.font = '30px systemUI';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(aqi, centerX, centerY);
}

//Community-Page Main code
document.querySelector(".Community-page").classList.remove("vis-show");
document.querySelector(".Community-page").classList.add("vis-hidden");
document.querySelector("#Community").addEventListener("click", opencommunity);

function opencommunity() {
    document.querySelector(".Community-page").classList.add("vis-show");
    document.querySelector(".Community-page").classList.remove("vis-hidden");
    console.log("clicked on community");
}
function exitcommunity() {
    document.querySelector(".Community-page").classList.remove("vis-show");
    document.querySelector(".Community-page").classList.add("vis-hidden");
}
document.querySelector("#exit-community").addEventListener("click", exitcommunity);

//Form-details

document.addEventListener('DOMContentLoaded', (event) => {
    const form11 = document.getElementById('form11');
    const form22 = document.getElementById('form22');
    const div11 = document.getElementById('div11');
    const div22 = document.getElementById('div22');

    // Load saved data from local storage
    loadSavedData('div11');
    loadSavedData('div22');

    // Save data to local storage on form submit
    form11.addEventListener('submit', (event) => {
        event.preventDefault();
        saveData('div11', form11);
    });

    form22.addEventListener('submit', (event) => {
        event.preventDefault();
        saveData('div22', form22);
    });

    function saveData(prefix, form) {
        const imageInput = form.querySelector('input[type="file"]');
        const infoInput = form.querySelector('textarea');
        const dateInput = form.querySelector('input[type="date"]');
        const usernameInput = form.querySelector('input[type="text"]');

        const reader = new FileReader();
        reader.onload = function () {
            const data = {
                username: usernameInput.value,
                date: dateInput.value,
                image: reader.result,
                info: infoInput.value,
            };
            const uniqueKey = `${prefix}-${new Date().getTime()}`;
            localStorage.setItem(uniqueKey, JSON.stringify(data));
            displayData(prefix, data);
        };
        if (imageInput.files[0]) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            const data = {
                image: null,
                info: infoInput.value,
                date: dateInput.value,
                username: usernameInput.value
            };
            const uniqueKey = `${prefix}-${new Date().getTime()}`;
            localStorage.setItem(uniqueKey, JSON.stringify(data));
            displayData(prefix, data);
        }
    }

    function loadSavedData(prefix) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(prefix)) {
                const data = JSON.parse(localStorage.getItem(key));
                displayData(prefix, data);
            }
        }
    }

    function displayData(prefix, data) {
        const div = document.getElementById(prefix);
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="display-items">
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            ${data.image ? `<img src="${data.image}" alt="Uploaded Image" style="max-width: 100%; height: auto;">` : ''}
            <p><strong>Information:</strong> ${data.info}</p>
            </div>
        `;
        div.appendChild(newDiv);
    }
});

