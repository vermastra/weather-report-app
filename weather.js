let icon = document.getElementById("icon");
let place_date = document.getElementsByClassName("place_date");
let temp = document.getElementsByClassName("temp");
let place = document.getElementsByClassName("place");
let cloud = document.querySelectorAll(".cloud");
let date = document.getElementById("date");
let min_max = document.getElementById("min_max");
let card = document.getElementsByClassName("card");
let search = document.getElementById("searchBtn")
let cityName = document.getElementById("city");

//clearing all data from card in case of any error or at welcoming time
function clearCard() {
   cloud.forEach(element => element.style.visibility = "hidden")
   icon.style.display = 'none';
   place_date[0].style.display = 'none'
   card[0].style.backgroundImage = `url("./photos/short.png")`
   temp[1].innerHTML = ``
}
clearCard();

//main function
search.addEventListener("click", async () => { //async & await is uesd to use try and catch method

   // in case city name is empty
   if (cityName.value.trim() == "") {
      clearCard();
      temp[0].innerHTML = `Please enter the <br>name of the city `
   }
   else {

      //trying to fetch data from API without any error
      try {
         let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=4bb339a18cc2fbaa6f057175abe8bef8`
         await fetch(url).then((response) => {
            return response.json()
         }).then((data) => {
            //making the card ready with photos and animation to show the data
            cloud.forEach(element => element.style.visibility = "visible")
            card[0].style.backgroundImage = "none"
            card[0].style.justifyContent = "space-evenly";
            icon.style.display = 'block';
            place_date[0].style.display = 'block'

            //updating the data 
            temp[0].innerHTML = Math.round(data.main.temp) + `&deg` + 'C'
            min_max.innerHTML = Math.round(data.main.temp_min) + `&deg` + 'C' + ' | ' + Math.round(data.main.temp_max) + `&deg` + 'C'
            temp[1].innerHTML = data.weather[0].main;
            //BUG in API
            if (data.main.temp_max == data.main.temp_min) {
               min_max.innerHTML = "";
            }
            place[0].innerHTML = data.name + ", " + data.sys.country
            var id = data.weather[0].id;

            //selecting image to show based on current weather
            if (id >= 200 && id <= 230) {
               icon.style.backgroundImage = `url("./photos/thunderstrom.png")`

            }
            if (id >= 300 && id <= 321) {
               icon.style.backgroundImage = `url("./photos/dizzy.png")`

            }
            if (id >= 500 && id <= 531) {
               icon.style.backgroundImage = `url("./photos/rainy.png")`

            }
            if (id >= 600 && id <= 622) {
               icon.style.backgroundImage = `url("./photos/snow.png")`

            }
            if (id >= 700 && id <= 781) {
               icon.style.backgroundImage = `url("./photos/atmosphere.png")`

            }
            if (id >= 800) {
               icon.style.backgroundImage = `url("./photos/clear.png")`

            }
            if (id >= 801 && id <= 804) {
               icon.style.backgroundImage = `url("./photos/cloudy.png")`

            }

         })

         //updating todays date,day,and month
         let dayArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
         let monthArray = ["JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"]
         let today = new Date();
         date.innerHTML = ` ${dayArray[today.getDay()]} | ${today.getDate()} | ${monthArray[today.getMonth()]}`
      }

      //in case any error has been found under the try method
      catch (error) {
         clearCard();
         temp[0].innerHTML = `City not found <br>Please enter correct spelling of the city`
      }
   }
})