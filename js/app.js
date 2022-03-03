const API_Key= 'aec9de5b62559cf233ab62cfd9a9bfda'

//get html elements by id
//get html elements by id
const cityName=document.getElementById('city-name')
const cityTemperature=document.getElementById('temperature')
const cityWeather=document.getElementById('Weather')

//parent div for more details btn 
const moreDetails=document.getElementById('weather-status')

//error massge hide
const errorMssege=document.getElementById('error-message')
errorMssege.style.display='none'

//search btn click event handler
let searchCity=()=>{

    const searchInput=document.getElementById('searchedcity')
    const cityName=searchInput.value.toLowerCase()
    console.log(cityName)
    //clearing search field
    searchInput.value=""
    errorMssege.style.display='none' 

    //invalid search error handling
    if(isNaN(cityName)){
      //url a https must include kora lagbey
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}&units=metric`  
      //data fetch from the api link
      fetch(url)
      .then(res=>res.json())
      .then(data=>displayWeather(data,data.message,data.cod))

    }
    else{
      errorMssege.style.display='block'
    }
}

let setInnerText=(id,textTobeSet)=>{
    
    id.innerText=textTobeSet        //using innerText bcz <h1></h1> html element
    
}

let displayWeather=(weatherCondition,message,cod)=>{
  //console.log(message)
    if(message=='city not found'|| cod==401){
      errorMssege.style.display='block'
    }
    else{
      //removing previous btn for city as new city is searched
      moreDetails.innerHTML=""
      
      console.log(weatherCondition)  

      //setting searched city name to 'cityName' dynamicly city name change hobey
      setInnerText(cityName,weatherCondition.name )
      //setting temperature according to cityname to 'cityTemperature'
      setInnerText(cityTemperature,weatherCondition.main.temp)
      //setting weather according to city name
      setInnerText(cityWeather,weatherCondition.weather[0].main)

      //setting weather icon
      const weatherIconUrl=`http://openweathermap.org/img/wn/${weatherCondition.weather[0].icon}@2x.png`
      console.log(weatherIconUrl)
      const weatherIcon=document.getElementById('weather-icon')
      weatherIcon.setAttribute('src',weatherIconUrl)          //image set kora holo dynamicly

      //for more details of weather related
      const feelsLike=weatherCondition.main.feels_like
      const humidity=weatherCondition.main.humidity
      const maxTemp=weatherCondition.main.temp_max
      const minTemp=weatherCondition.main.temp_min
      const weather=weatherCondition.weather[0].description

      //create div element
      const div =document.createElement('div')
      //adding innerHtml to div
      div.innerHTML=`
      <button class="custom-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"">Details</button>

      <!-- Modal -->
      <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
          <div class="modal-content custom-design">
            <div class="modal-header">
              <h5 class="modal-title custom-text" id="staticBackdropLabel">More Details About Weather</h5>
            </div>
            <div class="modal-body text-black text-center">
              <div>
              <img src="http://openweathermap.org/img/wn/${weatherCondition.weather[0].icon}@2x.png" alt="">
              </div>
              <p class="">Feels like: ${feelsLike}&deg;C</p>
              <p class="">Humidity: ${humidity}%</p>
              <p class="">Maximum_Temperature: ${maxTemp}&deg;C</p>
              <p class="">Minumum_Temperature: ${minTemp}&deg;C</p>
              <p class="">Weather: ${weather}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn custom-btn" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      `
      //append div to parent 'moreDetails'
      moreDetails.appendChild(div)
    }
    
}


