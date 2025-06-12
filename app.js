let apiKeys = "af90555b41a740e687d113411251006";

let searchbtn = document.querySelector('#search-btn')

searchbtn.addEventListener('click', function(){
    let city = document.querySelector('#input')
    let cityName = city.value.trim()
    city.value = ""

    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKeys}&q=${cityName}&aqi=yes`
    
    function weatherdata(url){
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => resolve(data))
            .catch(error => reject(error))        
        })
    }
    weatherdata(url)
    .then(data => {
        let content = document.querySelector('#content')
        content.style = 'display : block;'

        let main_content = document.querySelector('#error')
        main_content.style = 'display : none; '

        let city = document.querySelector('#city')
        city.textContent = data.location.name
        let date_time = document.querySelector('#date_time')
        const date = new Date(data.current.last_updated);
            const options = {
                weekday: 'short', 
                day: 'numeric',   
                month: 'short' 
            };
            date_time.textContent = date.toLocaleDateString('en-GB', options);
            
            let image1 = document.querySelector('#image1')
            image1.src = data.current.condition.icon   
            
            let cloud_data = document.querySelector('#cloud_data')
        cloud_data.innerHTML = data.current.condition.text
        
        let temp_p = document.querySelector('#temp_p')
        temp_p.innerHTML = `${Math.round(data.current.temp_c)} C` 
        
        let humidity = document.querySelector('#humidity')
        humidity.innerHTML = data.current.humidity + "%"
        
        let wind_speed = document.querySelector('#wind-speed')
        wind_speed.innerHTML =`${Math.round(data.current.wind_mph)} M/s`
    })
    .catch(error => {
        let content = document.querySelector('#content')
        content.style = 'display: none'
        let main_content = document.querySelector('#error')
        main_content.style = ' display: flex; text-align: center; align-items: center; font-Size: 22px; padding-inline:10px '
        main_content.innerHTML = `Location not match please valid location`
    } )
    
    // forcast api call
    let forcast = new Promise((resolve, reject) => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKeys}&q=${cityName}&days=8`)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error.message))
    })
    forcast
    .then(data => {
        

        let days =document.querySelector('#card-day')
        days.innerHTML = ""
        let forecastdata = data.forecast.forecastday 
            forecastdata.forEach(data => {
                const date = new Date(data.date);
                    const options = {
                        day: 'numeric',   
                        month: 'short',
                        weekday: 'short' 
                    };
                    console.log();
                    days.innerHTML +=   `<div style="background-color: rgba(51, 51, 50, 0.397); padding: 10px;border-radius: 8px;">
                                            <p style="color: white; font-size: 15px; text-align: center;">
                                                ${date.toLocaleDateString('en-GB', options)}
                                            </p>
                                            <image width="80px" src=${data.day.condition.icon}></image>
                                            <p style="color: white; font-size: 15px; text-align: center;">
                                               ${Math.round(data.day.avgtemp_c)} C
                                            </p>
                                        </div>`
            })    
    }).catch(error => {
        let content = document.querySelector('#content')
        content.style = 'display: none'
        let main_content = document.querySelector('#error')
        main_content.style = ' display: flex; text-align: center; align-items: center; font-Size: 22px; padding-inline:10px '
        main_content.innerHTML = `Location not match please valid location`
    })
})

