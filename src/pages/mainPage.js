import rainy_day from "../images/rainy-day.jpg"
import sunnyDay from "../images/sunnyDay.jpg"
import spring from "../images/Spring.jpg"
export default function createPage(){
    const content = document.getElementById("content");
    setWeather("Texas");

    const searchDiv = document.createElement("div");
    searchDiv.classList.add("searchDiv");

    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.classList.add("searchBar");
    searchBar.placeholder = "Enter Location and Press Enter!";

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
    const feel_temp = document.createElement("p");
    feel_temp.id = "feel_temp";
    const rain = document.createElement("p")
    rain.id = "rain";
    const humidity = document.createElement("p");
    humidity.id = "humidity";
    const windspeed = document.createElement("p");
    windspeed.id = "windspeed";
    const uvindex = document.createElement("p");
    uvindex.id = "uvindex";
    const visibility = document.createElement("p");
    visibility.id = "visibility";
    const sunset = document.createElement("p");
    sunset.id = "sunset";
     
    

    dataDiv.appendChild(location);
    dataDiv.appendChild(grid);
    grid.appendChild(temp);
    grid.appendChild(feel_temp);
    grid.appendChild(rain);
    grid.appendChild(humidity);
    grid.appendChild(windspeed);
    grid.appendChild(uvindex);
    grid.appendChild(visibility);
    grid.appendChild(sunset);

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
    setBackground(conditions.precipprob,conditions.temp)
    setData(data.resolvedAddress,conditions.temp,conditions.precip,conditions.humidity,conditions.feelslike,conditions.windspeed,conditions.uvindex,conditions.visibility,conditions.sunset)
    } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

function setBackground(precip,temp){
    const content = document.getElementById("content");
    if(precip == 0){
      if(temp >= 80){
        content.style.backgroundImage = `url(${sunnyDay})`;
      }
      else if(temp >= 45){
        content.style.backgroundImage = `url(${spring})`;
      }
    }
    else{
    content.style.backgroundImage = `url(${rainy_day})`;
    }
}

function setData(addy,tempature,rainAmt,hum,feelslike,wind,uv,vis,sun){
    const loc = document.getElementById("location");
    const temp = document.getElementById("temp");
    const rain = document.getElementById("rain");
    const feelTemp = document.getElementById("feel_temp");
    const humidity = document.getElementById("humidity");
    const windspeed = document.getElementById("windspeed");
    const uvi = document.getElementById("uvindex");
    const visibility = document.getElementById("visibility");
    const sunset = document.getElementById("sunset");

    loc.innerHTML = addy;
    temp.innerHTML = "Tempature: " + tempature;
    feelTemp.innerHTML = "Feels like: " + feelslike;
    windspeed.innerHTML = "Windspeed: " + wind
    rain.innerHTML = "Rain: " + rainAmt;
    humidity.innerHTML = "Humidity: " + hum;
    uvi.innerHTML = "UV Index: " + uv;
    visibility.innerHTML = "Visibility: " + vis;
    sunset.innerHTML = "Sunset: " + sun;
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