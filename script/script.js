/* jshint esversion: 6 */

async function getData(){ //jshint ignore:line

	let myWeatherResponse = await fetchData("http://api.openweathermap.org/data/2.5/weather?id=2673730&units=metric&APPID=501fd8025b1109e72c5fc70dd0da9d45");
	let myForecastResponse = await fetchData("http://api.openweathermap.org/data/2.5/forecast?id=2673730&units=metric&APPID=501fd8025b1109e72c5fc70dd0da9d45");
	let iconResponse = "http://openweathermap.org/img/w/";

// console.log(myWeatherResponse);
// console.log(myWeatherResponse2.list[0].dt_txt + " " + myWeatherResponse2.list[0].main.temp + " " + myWeatherResponse2.city.name);
console.log(myForecastResponse);

let result = document.getElementById("result");
let myUl = document.getElementById("myUl");
let myLi = document.createElement("li");

let weatherIcon = document.createElement("img");
weatherIcon.setAttribute("src", iconResponse + myWeatherResponse.weather[0].icon + ".png");

let currentWeather = document.createTextNode(myWeatherResponse.name + " " + myWeatherResponse.main.temp + 
	" " + Date(myWeatherResponse.dt));

myLi.appendChild(currentWeather);
myLi.appendChild(weatherIcon);
myUl.appendChild(myLi);
result.appendChild(myUl);

// let filterForecast = myWeatherResponse2.list.filter(value => value);
myForecastResponse.list.forEach( value =>  {

	let forecastLi = document.createElement("li");
	let forecastWeather = document.createTextNode(myForecastResponse.city.name + " " + value.main.temp + " " + value.dt_txt);
	let newIcon = document.createElement("img");
	newIcon.setAttribute("src", iconResponse + value.weather[0].icon + ".png");
	forecastLi.appendChild(forecastWeather);
	forecastLi.appendChild(newIcon);
	myUl.appendChild(forecastLi);

});

}

async function fetchData(url){ // jshint ignore:line

	let promise = await fetch(url);
	let data = await promise.json();

	return data;
}

getData();