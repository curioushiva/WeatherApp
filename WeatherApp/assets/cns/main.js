/* Api Resources */
const ApiUrl = "https://api.weatherapi.com/v1/current.json?"
const ApiKey = ""



/* Importing the elements from html */
let CitySearch = document.querySelector(".searchBox input")
let SearchBtn = document.querySelector(".searchBox button")
let WeatherPng = document.querySelector(".W-icon img")
let WeatherDegree = document.querySelector(".degree h1 span")
let WeatherDegreeC = document.querySelector(".C")
let WeatherDegreeF = document.querySelector(".F")
let WeatherAbout = document.querySelector(".about p")
let Humidity = document.querySelector(".humidity p span")
let WindSpeed = document.querySelector(".wind p span")
let Precipitation = document.querySelector(".precipi p span")
let aqiRange = document.querySelectorAll(".aqi h2 span")
let aqiColor = document.querySelectorAll(".aqi h2 i")
let CityName = document.querySelector(".city h1")
let CityDN = document.querySelector(".city h2")
let CityTime = document.querySelector(".currentTime h1")
let CityLWTime = document.querySelector(".updateTime h1")

let WeatherContainer = document.querySelector(".WeatherCont")
let MsgHandler = document.querySelector(".MsgHandler")
let MHType = document.querySelector(".MsgHandler h1")
let MHMsg = document.querySelector(".MsgHandler h2")

let DontDo = document.querySelector(".DontDo")
let Close = document.querySelector(".red")
let MainConatiner = document.querySelector(".container")

let WImgCont = document.querySelector(".WImgCont")
let Wimg = document.querySelector(".WImgCont img")

/* Just For Prank */
Close.addEventListener("click", () => {
    setTimeout(() => {
        MainConatiner.style.display = "none"
    })
    setTimeout(() => {
        DontDo.style.display = "flex"
    })
})

/* Main Function */
async function WeatherApp(CitySearch) {
    const response = await fetch(ApiUrl + `key=${ApiKey}&q=` + CitySearch + `&aqi=yes`);
    var WeatherData = await response.json();
    /* For Console */
    console.log(WeatherData);

    /* Message Handler */
    if (WeatherData.error) {
        WeatherContainer.style.display = "none"
        WImgCont.style.display = "none"
        MsgHandler.style.display = "flex"
        MHType.innerText = "E / R / R : "
        MHMsg.innerText = "Oops ! Enter Correct City Name"
    } else {
        MsgHandler.style.display = "none"
        WeatherContainer.style.display = "flex"
        WeatherDegree.innerText = Math.round(WeatherData.current.temp_c);

        /* Celcius and Farnhite */
        WeatherDegreeC.addEventListener("click", () => {
            WeatherDegree.innerText = Math.round(WeatherData.current.temp_c);
            WeatherDegreeC.style.fontSize = "25px";
            WeatherDegreeF.style.fontSize = "17px";

        });
        WeatherDegreeF.addEventListener("click", () => {
            WeatherDegree.innerText = Math.round(WeatherData.current.temp_f);
            WeatherDegreeF.style.fontSize = "25px";
            WeatherDegreeC.style.fontSize = "17px";
        });

        WeatherAbout.innerText = WeatherData.current.condition.text

        /* Weather Type Bg Img */
        let WeatherCode = WeatherData.current.condition.code
        let WeatherIMG = ""
        if (WeatherCode === 1000) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/sunny.jpg";
        } else if (WeatherCode === 1003) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/cloudy.jpg";
        } else if (WeatherCode === 1006 || WeatherCode === 1009) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/overcast.jpg";
        } else if (WeatherCode === 1030 || WeatherCode === 1135 || WeatherCode === 1147) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/mist.jpg";
        } else if (WeatherCode === 1114 || WeatherCode === 1117 || WeatherCode === 1066 ||
            WeatherCode === 1210 || WeatherCode === 1213 || WeatherCode === 1216 ||
            WeatherCode === 1219 || WeatherCode === 1222 || WeatherCode === 1225 ||
            WeatherCode === 1255 || WeatherCode === 1258) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/snow.jpg";
        } else if (WeatherCode === 1180 || WeatherCode === 1183 || WeatherCode === 1186 ||
            WeatherCode === 1189 || WeatherCode === 1192 || WeatherCode === 1195 ||
            WeatherCode === 1240 || WeatherCode === 1243 || WeatherCode === 1246) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/rain.jpg";
        } else if (WeatherCode === 1072 || WeatherCode === 1168 || WeatherCode === 1171 ||
            WeatherCode === 1198 || WeatherCode === 1201) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/drizzle.jpg";
        } else if (WeatherCode === 1069 || WeatherCode === 1204 || WeatherCode === 1207 ||
            WeatherCode === 1249 || WeatherCode === 1252) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/sleet.jpg";
        } else if (WeatherCode === 1237 || WeatherCode === 1261 || WeatherCode === 1264) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/ice.jpg";
        } else if (WeatherCode === 1087 || WeatherCode === 1273 || WeatherCode === 1276) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/thudrain.jpg";
        } else if (WeatherCode === 1279 || WeatherCode === 1282) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/thudsnow.jpg";
        } else if (WeatherCode === 1150 || WeatherCode === 1153) {
            WImgCont.style.display = "flex"
            WeatherIMG = "assets/ani/lightdrizzle.jpg";
        } else {
            WImgCont.style.display = "none"
        }

        Wimg.src = WeatherIMG;

        Humidity.innerText = WeatherData.current.humidity
        WindSpeed.innerText = WeatherData.current.wind_kph
        Precipitation.innerText = WeatherData.current.precip_mm
        CityName.innerText = WeatherData.location.name

        /* AQI */
        aqiRange.forEach(span => {
            let UsEpa = WeatherData.current.air_quality["us-epa-index"];
            let AqiIndex = ""
            if (UsEpa === 1) {
                AqiIndex = `AQI : 0-50 Good`
            } else if (UsEpa === 2) {
                AqiIndex = `AQI : 51-100 Moderate`
            } else if (UsEpa === 3) {
                AqiIndex = `AQI : 101-150 Sensitive`
            } else if (UsEpa === 4) {
                AqiIndex = `AQI : 151-200 Unhealthy`
            } else if (UsEpa === 5) {
                AqiIndex = `AQI : 201-300 Extreme`
            } else if (UsEpa === 6) {
                AqiIndex = `AQI : 301-500+ Hazardous`
            }
            span.innerText = AqiIndex
        });

        aqiColor.forEach(i => {
            let UsEpa = WeatherData.current.air_quality["us-epa-index"];
            let AqiColor = ""
            if (UsEpa === 1) {
                AqiColor = "#00CA4E";
            } else if (UsEpa === 2) {
                AqiColor = "#FFBD44";
            } else if (UsEpa === 3) {
                ColorCode = "#FF605C";
            } else if (UsEpa === 4) {
                AqiColor = "#FF3B30";
            } else if (UsEpa === 5) {
                AqiColor = "#AF52DE";
            } else if (UsEpa === 6) {
                AqiColor = "#a80038";
            }
            i.style.color = AqiColor
        });

        /* Day Or Night */
        if (WeatherData.current.is_day === 1) {
            CityDN.innerText = "Day Time"
        } else {
            CityDN.innerText = "Night Time"
        }

        /* Local Time */
        let LocalTime = WeatherData.location.localtime;
        let modifiedLT = "";
        for (let i = 0; i < LocalTime.length; i++) {
            let char = LocalTime[i];
            if (char === "-") {
                char = "/";
            }
            modifiedLT += char;
        }

        let CDate = modifiedLT.slice(2, 10)
        let CHour = parseInt(modifiedLT.slice(10, 13))
        let CMinute = modifiedLT.slice(13, 16)

        if (CHour === 0) {
            CityTime.innerHTML = `${CDate}, 12${CMinute} AM`
        }
        else if (CHour >= 1 && CHour <= 11) {
            CityTime.innerHTML = `${CDate}, ${CHour}${CMinute} AM`
        }
        else if (CHour === 12) {
            CityTime.innerHTML = `${CDate}, 12${CMinute} PM`
        }
        else {
            CityTime.innerHTML = `${CDate}, ${CHour - 12}${CMinute} PM`
        }


        /* Current Weather Time */
        let WeatherTime = WeatherData.current.last_updated;
        let WHour = parseInt(WeatherTime.slice(10, 13))
        let WMinute = WeatherTime.slice(13, 16)

        if (WHour === 0) {
            CityLWTime.innerHTML = `12${CMinute} AM`
        }
        else if (WHour >= 1 && WHour <= 11) {
            CityLWTime.innerHTML = `${CHour}${CMinute} AM`
        }
        else if (WHour === 12) {
            CityLWTime.innerHTML = `12${CMinute} PM`
        }
        else {
            CityLWTime.innerHTML = `${CHour - 12}${CMinute} PM`
        }
    }
}

/* On click audio */
SearchBtn.addEventListener("click", () => {
    new Audio('assets/ani/click.mp3').play();
})

/* Calling of fucntion & passsing city as argument */
SearchBtn.addEventListener("click", () => {
    WeatherApp(CitySearch.value.trim());
});


// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());
function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}
document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};

/* CODE ENDS HERE by @curioushiva */