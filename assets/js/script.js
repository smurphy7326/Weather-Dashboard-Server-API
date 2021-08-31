// Script Section 

function createCityList(citySearchList) {
    $("#cityListSearch").empty();

// keys var AskBCS
var keys = Object.keys(citySearchList);
for (var i = 0; i < keys.length; i++) {
    var cityListEntry = $("<button>");
    cityListEntry.addClass("list-group-item list-group-item-action"); //W3 schools helped with this one

    var splitStr = keys[i].toLowerCase().split("");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = 
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    var titleCasedCity = splitStr.join("");
    cityListEntry.text(titleCasedCity); // Capitalize a City

    $("#citiesSearched").append(cityListEntry); // city list entry is to show what cities were entered
  }
}

// Need to make something for the cities

function populateCitiesWeather(city, citySearchList) {
    createCityList(citySearchList);

    // Open Weather Map website help me determine which one to choose from this and used my API key
    // 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=93d8043af196220c5f35d380f7c697f4&q=" + city;

    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=93d8043af196220c5f35d380f7c697f4&q=" + city;

    var latitude;

    var longitude;

    $.ajax({              // jQuery on Bootstrap
        url: queryURL,
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
            displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
        );

        var searchedCities = $("<h4>").text(weather.name);
        $("#searchedCities").prepend(searchedCities);

        // Ask BCS helped with this part
        var weatherIcon = $("<img>"); // should come from the Bootstrap or font awesome
        weatherIcon.attr(
        "src",
        "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png" // help with AskBCS
        );
        $("currentVariables").empty();
        $("currentVariables").append(weatherIcon);

        $("currentTemperature").text("Temperature" + weather.main.temp + " ˚F");
        $("currentHumidity").text("Humidity: " + weather.main.humidity + "%");
        $("currentWind").text("Wind Speed: " + weather.wind.spped + "MPH");


        latitude = weather.coord.lat;
        longitude = weather.coord.lon;

        // UV index got help through the website
        // helped with the format at the end from this week in class
        var queryURL3 = "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=93d8043af196220c5f35d380f7c697f4&q=" + "&lat=" + latitude + "&lon=" + longitude;

        // When use GET it is from a specified source W3 schools
        $.ajax({
            url: queryURL3,
            method: "GET"
        })
        .then(function(uvIndex) {
            console.log(uvIndex);
        
        // Needed help with the UV index Scale
        var uvIndexDisplay = $("<button>");
        uvIndexDisplay.addClass("btn btn-danger");
        $("currentUvScale").text("UV Index: ");
        $("currentUvScale").append(uvIndexDisplay.text(uvIndex[0].value));
        console.log(uvIndex[0].value);
        
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(forecast) {
            console.log(queryURL2);

            // Friend from home who works with computer helped me with this part
            console.log(forecast);
            for (var i = 6; i < forecast.list.length; i +=8) {
                var forecastDate = ("<h4>");
                // forecast

                $("#dateForecast" + forecastPosition).empty();
                $("#dateForecast" + forecastPosition).append(
                    forecastDate.text(nowMoment.add(1, "days"),format("MM/DD/YYYY"))
                );

                // Forecast icon from FontAwesome
                var forecastIcon = $("<img>");
                forecastIcon.attr(
                    "src",
                    "https://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png"
                );

                // Had to work with this to help with the 5 day forecast
                $("#forecast-icon" + forecastPosition).empty();
                $("#forecast-icon" + forecastPosition).append(forecastIcon);
                console.log(forecast.list[i].weather[0].icon);

                $("#tempForecast" + forecastPosition).text(
                    "Temperature: " + forecast.list[i].main.temp + " ˚F"
                );

                $("#humidityForecast" + forecastPosition).text(
                    "Humidity: " + forecast.list[i].main.humidity + "%"
                );

                // Maybe have to change this one
                $(".forecast").attr(
                    "style",
                    "background-color: darkblue; color: white"
                );
            }
          });
        });
     });
}

// jQuery 
$(document).ready(function() {         
    var citySearchListString = localStorage.getItem("citySearchList");

    var citySearchList = JSON.parse(citySearchListString);

    if (citySearchList == null) {
        citySearchList = {};
    }

    createCityList(citySearchList);

    $("#currentWeather").hide();
    $("#fiveDayWeather").hide();

    // Learned about this from MDN Web docs - if it doesn't get handled 
    // the default action should not be taken as it normally is

    $("submitButton").on("click", function(event) {
        event.preventDefault();
        var city = $("#citiesSearched")
            .val()  // jQuery - returns or sets the value attribute of the selected elements
            .trim() // removes whitespace from both ends of the trim
            .toLowerCase(); // returns the calling string value converted to lowercase

            if (city != "") {
                citySearchList[city] = true;
                localStorage.setItem("citySearchList", JSON.stringify(citySearchList)); // JSON.stringify converts the javascript object into a JSON string

                populateCityWeather(city,citySearchList);

                $("#currentWeather").show();
                $("#fiveDayWeather").show();
                }
            });

            $("#cityListSearch").on("click", "button", function(event) {
                event.preventDeafualt();
                var city = $(this).text();
                
                populateCitiesWeather(city, citySearchList);

                $("#currentWeather").show();
                $("#fiveDayWeather").show();
            });
        });



