// Script Section 

function createCityList(citySearchList) {
    $("#cityListSearch").empty();
}

// keys var AskBCS
var keys = Object.keys(citySearchList);
for (var i =0; i < keys.length; i++) {
    var cityListEntry = $("button");
    cityListEntry.addClass("list-group-item list-group-item-action"); //W3 schools helped with this one

    var splitStr = keys[i].toLowerCase().split("");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = 
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    var titleCasedCity = splitStr.join("");
    cityListEntry.text(titleCasedCity);

    $("#citiesSearched").append(cityListEntry);
  }
}

// Need to make something for the cities

function populateCitiesWeather(city, citySearchList) {
    createCityList(citySearchList);

    // Open Weather Map website help me determine which one to choose form this instance
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=885e9149105e8901c9809c018ce8658&q=" + city;

    $.ajax({              // jQuery on Bootstrap
        url.queryURL,
        method: "GET"
    })
    // Data is stored
    .then(function(weather) {
        console.log(queryURL);

        console.log(weather);

        var nowMoment = moment();  // How to get the current moment for the weather
        var displayMoment = $("<h4>");
        $("#searchedCities").empty();
        $("#searchedCities").append(
            displayMoment.text("(" + nowMoment.format("MM/DD/YYYY") + ")")
        );

        var searchedCities = $("<h4>").text(weather.name);
        $(#"searchedCities").prepend(searchedCities);

        // Ask BCS helped with this part
        var weatherIcon = $("<img>"); // should come from the Bootstrap or font awesome
        weatherIcon.attr()
        "src",
        "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png" // help with AskBCS
    );
        $("currentVariables").empty();
        $("currentVariables").append(weatherIcon);

        $("currentTemperature").text("Temperature" +weather.main.temp + " ˚F");
        $("currentHumidity").text("Humidity: " + weather.main.humidity + "%");
        $("currentWind").text("Wind Speed: " + weather.wind.spped + "MPH");


        .then(function(uvIndex) {
            console.log(uvIndex);
        
        // Needed help with the UV index Scale
        var uvIndexDisplay = $("<button>");
        uvIndexDisplay.addClass("btn btn-danger");
        $("currentUvScale").text("UV Index: ");
        $("currentUvScale").append.(uvIndexDisplay.text(uvIndex[0].value));
        console.log(uvIndex[0].value);
        
        })

    })
}

$(document).ready(function() {
    var citySearchListString = localStorage.getItem("citySearchList");

    var citySearchList = JSON.parse(citySearchListString);

    if citySearchList == null) {
        citySearchList = {};
    }

    createCityList(citySearchList);

    $("#currentWeather").hide();

    
})


