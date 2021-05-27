const submitBtn = document.getElementById('submitBtn');

const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const today_data = document.getElementById('today_data');
const day = document.getElementById('day');

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const data_hide = document.querySelector('.middle_layer');


const getInfo = async(event) =>{
    event.preventDefault();
    
    let cityVal = cityName.value;
   
    if (cityVal==="") {
        city_name.innerText = `Please Enter Valid City Name`;
        data_hide.classList.add('data_hide');
    }
    else {
        try {
            let url = `http://api.weatherapi.com/v1/current.json?key=ed4270b8ed544da7a6e232926212605&q=${cityVal}&aqi=no`;
            let response = await fetch(url);
            let data = await response.json();
           
            const arrData = [data];
            temp.innerText = arrData[0].current.temp_c;
            city_name.innerText = `${arrData[0].location.name}, ${arrData[0].location.country}`;

            const date = new Date(arrData[0].location.localtime);
            const date_month = date.toDateString().substring(4);

            today_data.innerText = date_month;

            var options = { weekday: 'long' };
            day.innerText = new Intl.DateTimeFormat('en-US', options).format(date);
            
            
            const tempmood = arrData[0].current.condition.text;
            if (tempmood=="Sunny") {
                temp_status.innerHTML = "<i class ='fas fa-sun' style='color: #eccc68;'></i>";
            }
            else if (tempmood == "Cloudy" || tempmood =="Partly cloudy"||tempmood == "Clear") {
                temp_status.innerHTML = "<i class ='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }
            else if (tempmood == "Rain") {
                temp_status.innerHTML = "<i class ='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }
            else {
                temp_status.innerHTML = "<i class ='fas fa-cloud' style='color: #f1f2f6;'></i>";

            }

            data_hide.classList.remove('data_hide');

        }   
        catch(e) {
            city_name.innerText = 'Please enter valid name';
               console.log(e.message);
            data_hide.classList.add('data_hide');
        }
        }
}
submitBtn.addEventListener('click', getInfo);
