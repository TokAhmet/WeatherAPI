/* jshint esversion: 6 */

async function getData(){ //jshint ignore:line


let myWeatherResponse = await fetchData("http://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&APPID=501fd8025b1109e72c5fc70dd0da9d45");
let myForecastResponse = await fetchData("http://api.openweathermap.org/data/2.5/forecast?id=2673730&units=metric&APPID=501fd8025b1109e72c5fc70dd0da9d45");
let iconResponse = "http://openweathermap.org/img/w/";

let weatherIcon = document.createElement("img");
weatherIcon.setAttribute("src", iconResponse + myWeatherResponse.weather[0].icon + ".png");

document.getElementById("city").innerHTML = myWeatherResponse.name;
document.getElementById("date").innerHTML = new Date(Date(myWeatherResponse.dt)).toLocaleString();
document.getElementById("temp").innerHTML = Math.floor(myWeatherResponse.main.temp) + "&degC";
// var currentIcon = document.getElementById("icon");
// currentIcon.appendChild(weatherIcon);

var dateObj = new Date();

var month = "0" + (dateObj.getMonth() + 1); 
if (month >= 10) {
	month = dateObj.getMonth() + 1;
}
var day = "0" + (dateObj.getDate() + 1);
if (day >= 10) {
	day = dateObj.getDate();
}

var year = dateObj.getFullYear();

var todayDate = year + "-" + month + "-" + day;

/*
let filterMaxTemp = myForecastResponse.list.filter(value => value.dt_txt.includes(todayDate))
.reduce((a, b) => a.main.temp < b.main.temp ? a : b);
let filterMinTemp = myForecastResponse.list.filter(value => value.dt_txt.includes(todayDate))
.reduce((a, b) => a.main.temp > b.main.temp ? a : b);
*/

let futureDays = document.getElementById("future");

for(var i = 7; i < myForecastResponse.list.length; i+=8){

	let forecastDiv = document.createElement("div");
	forecastDiv.setAttribute("class", "day");

	let dateh5 = document.createElement("h5");
	let forecastWeatherDate = document.createTextNode(new Date(myForecastResponse.list[i].dt_txt).toDateString());
	dateh5.appendChild(forecastWeatherDate);

	let tempMinh6= document.createElement("h6");
	let forecastWeatherMinTemp = document.createTextNode("Min-Temp: " + myForecastResponse.list[i + 1].main.temp_min);
	tempMinh6.appendChild(forecastWeatherMinTemp);

	let tempMaxh6 = document.createElement("h6");
	let forecastWeatherMaxTemp = document.createTextNode("Max-Temp: " + myForecastResponse.list[i].main.temp_max);
	tempMaxh6.appendChild(forecastWeatherMaxTemp);

	let newIcon = document.createElement("img");
	newIcon.setAttribute("src", iconResponse + myForecastResponse.list[i].weather[0].icon + ".png");
	
	forecastDiv.appendChild(dateh5);
	forecastDiv.appendChild(tempMinh6);
	forecastDiv.appendChild(tempMaxh6);
	forecastDiv.appendChild(newIcon);
	futureDays.appendChild(forecastDiv);
}

}
async function fetchData(url){ // jshint ignore:line

	let promise = await fetch(url);
	let data = await promise.json();

	return data;
}

getData();