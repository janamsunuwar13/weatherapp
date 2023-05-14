const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_real = document.getElementById("temp_real");
const temp_status = document.getElementById("temp_status")
//query selecto is use to select the first element of .middle_layer in below
const datahide = document.querySelector(".middle_layer");

const dav = document.getElementById("dav");
const today_data = document.getElementById("today_data");

//for date and time
const getCurrentDay = () => {
    let weekday = new Array(7);
    weekday[0] = 'sunday';
    weekday[1] = 'monday';
    weekday[2] = 'tuesday';
    weekday[3] = 'wednesday';
    weekday[4] = 'thursday';
    weekday[5] = 'friday';
    weekday[6] = 'saturday';
    //new Date() is a inbuild function to know curretn time
    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;   
}
    //adding day to dav id 
    dav.innerText = getCurrentDay();

const getCurrentMonth = () => {
    let months = [
        "jan",
        "feb",
        "mar",
        "apr",
        'may',
        'jun',
        'jul',
        "aug",
        'sep',
        'oct',
        'nov',
        'dec'
    ]
    let currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = months[currentDate.getMonth()];
    var day = currentDate.getDate();
    //for time 
        var hours = new Date();
        var hour = hours.getHours();
        var minutes = hours.getMinutes();

        let peroid = "AM";
        if(hour > 11){
            peroid = "PM"
            if(hour > 12) hour -= 12;
        }
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        console.log(hour + ":" + minutes)
        
    
    return ` ${year} ${month} ${day} | ${hour}:${minutes} ${peroid}`;
}
//adding date to today date
today_data.innerText = getCurrentMonth();


//for when the submit button is clicked
const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if(cityVal === ""){
        city_name.innerText = `Plz enter a city name`
        //to add hide data class css
        datahide.classList.add("data_hide");
    }else{
        try{
            //calling api
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=26c4f513e3bd0a830c4d109391b4a7e0&units=metric`
            //fetching https url given above
            const response = await fetch(url);
            //to convert fetch file to json file
            const data = await response.json();
            //converting data object inside a arry
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`
            temp_real.innerText = arrData[0].main.temp;

            //for logo in weatehr
            const tempMood = arrData[0].weather[0].main;
            //condition to check sunny of cloudy
            if(tempMood == "Clear"){
                temp_status.innerHTML =
                "<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }else if(tempMood == "Clouds") {
                temp_status.innerHTML = 
                "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            }else if(tempMood == "Rain"){
                temp_status.innerHTML =
                "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }else {
                temp_status.innerHTML =
                "<i class='fas fa-sun' style='color:L #f1f2f6;'></i>";
            }
             //to remove hide data class css
             datahide.classList.remove("data_hide");
        }catch{
            city_name.innerText = `please enter a correct city name`
             //to add hide data class css
        datahide.classList.add("data_hide");
        }
    }
}

submitBtn.addEventListener('click', getInfo);