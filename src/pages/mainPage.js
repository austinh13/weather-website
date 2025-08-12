import rainy_day from "../images/rainy-day.jpg"
import sunnyDay from "../images/sunnyDay.jpg"
export default function createPage(){
    const content = document.getElementById("content");
    setWeather("Texas");

    const searchDiv = document.createElement("div");
    searchDiv.classList.add("searchDiv");

    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.classList.add("searchBar");
    searchBar.placeholder = "Enter Place and Press Enter!";

    searchBar.addEventListener("keydown", (event) => {
         if (event.key === 'Enter') {
            event.preventDefault(); // optional: prevent native submit
            // Your submit logic here
            console.log('Submit on mobile or desktop:', searchBar.value);
            setWeather(searchBar.value);
            searchBar.value = "";
        }
    })

    searchDiv.appendChild(searchBar);

    const dataDiv = document.createElement("div");
    dataDiv.classList.add("dataDiv");

    const location = document.createElement("h1");
    location.classList.add("location");
    location.id = "location";
    location.innerHTML = "Texas";

    const grid = document.createElement("div");
    grid.classList.add("grid");

    const temp = document.createElement("p");
    temp.id = "temp";
    const rain = document.createElement("p")
    rain.id = "rain";
    const humidity = document.createElement("p");
    humidity.id = "humidity";
    

    dataDiv.appendChild(location);
    dataDiv.appendChild(grid);
    grid.appendChild(temp);
    grid.appendChild(rain);
    grid.appendChild(humidity);

    content.appendChild(searchDiv);
    content.appendChild(dataDiv);
}

async function setWeather(location) {
  const fetchKey = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=us&key=${process.env.API_KEY}&contentType=json`;

  try {
    const response = await fetch(fetchKey);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data); // Logs the weather data JSON
    const conditions = data.currentConditions;
    setBackground(conditions.precip,conditions.temp)
    setData(data.resolvedAddress,conditions.temp,conditions.precip,conditions.humidity)
    } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

function setBackground(precip,temp){
    const content = document.getElementById("content");
    if(precip == 0){
    content.style.backgroundImage = `url(${sunnyDay})`;
    }
    else{
    content.style.backgroundImage = `url(${rainy_day})`;
    }
}

function setData(addy,tempature,rainAmt,hum){
    const loc = document.getElementById("location");
    const temp = document.getElementById("temp");
    const rain = document.getElementById("rain");
    const humidity = document.getElementById("humidity");

    loc.innerHTML = addy;
    temp.innerHTML = "Tempature: " + tempature;
    rain.innerHTML = "Rain: " + rainAmt;
    humidity.innerHTML = "Humidity: " + hum;
}
// process.env.API_KEY

/*
cloudcover
: 
0
conditions
: 
"Clear"
datetime
: 
"18:15:00"
datetimeEpoch
: 
1755040500
dew
: 
74.5
feelslike
: 
109.6
humidity
: 
48.3
icon
: 
"clear-day"
moonphase
: 
0.62
precip
: 
0
precipprob
: 
0
preciptype
: 
null
pressure
: 
1012
snow
: 
0
snowdepth
: 
0
solarenergy
: 
0.9
solarradiation
: 
258
source
: 
"obs"
stations
: 
(4) ['KAUS', 'TLTT2', 'AU323', 'D9418']
sunrise
: 
"06:56:28"
sunriseEpoch
: 
1754999788
sunset
: 
"20:15:06"
sunsetEpoch
: 
1755047706
temp
: 
97.3
uvindex
: 
3
visibility
: 
9.9
winddir
: 
67
windgust
: 
4
windspeed
: 
2*/