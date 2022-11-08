let weather = {
    "apiKey": "9d7089634fb72666bec73760fe7da341",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=metric&appid=" + this.apiKey
            ).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + "km/h";

        document.querySelector(".weather").classList.remove('loading');

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x1600/?"+ name +"')";
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
.querySelector(".search")
.addEventListener("click", function() {
    weather.search();
})

document
.querySelector(".search-bar").addEventListener('keypress', (e) => {
    if(e.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather("delhi");