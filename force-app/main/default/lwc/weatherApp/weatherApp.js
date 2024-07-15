import { LightningElement } from 'lwc';
import Weather_Icons from '@salesforce/resourceUrl/weatherAppIcons'
import Weather_App from '@salesforce/apex/WeatherAppController.getWeatherInfo'

export default class WeatherApp extends LightningElement {
    cityName = '';
    loadingMessage = '';
    isError = false;
    displayForm = true;
    weatherInfo;
    clearIcon = Weather_Icons+'/weatherAppIcons/clear.svg';
    rainIcon = Weather_Icons+'/weatherAppIcons/rain.svg';
    snowIcon = Weather_Icons+'/weatherAppIcons/snow.svg';
    cloudIcon = Weather_Icons+'/weatherAppIcons/cloud.svg';
    dropletIcon = Weather_Icons+'/weatherAppIcons/droplet.svg';
    hazeIcon = Weather_Icons+'/weatherAppIcons/haze.svg';
    mapIcon = Weather_Icons+'/weatherAppIcons/map.svg';
    stormIcon = Weather_Icons+'/weatherAppIcons/storm.svg';
    thermometerIcon = Weather_Icons+'/weatherAppIcons/thermometer.svg';
    arrow_backIcon = Weather_Icons+'/weatherAppIcons/arrow-back.svg';


    handleChange(event){
        this.cityName = event.target.value;
    }
    get msgClassStyle(){
        return this.isError ? 'errormsgclass' : 'msgclass';
    }

    get displayImage(){
        if(this.weatherInfo.id >= 200 && this.weatherInfo.id < 300){
            return this.stormIcon;
        }
        else if(this.weatherInfo.id >= 300 && this.weatherInfo.id < 400 || this.weatherInfo.id >= 500 && this.weatherInfo.id < 600 ){
            return this.rainIcon;
        }
        else if(this.weatherInfo.id >= 600 && this.weatherInfo.id < 700){
            return this.snowIcon;
        }
        else if(this.weatherInfo.id >= 700 && this.weatherInfo.id < 800){
            return this.hazeIcon;
        }
        else if(this.weatherInfo.id == 800){
            return this.clearIcon;
        }
        else if(this.weatherInfo.id > 800)
            return this.cloudIcon;
    }

    handleClick(){
        this.displayForm =true
        this.weatherInfo = null;
        this.isError = false;
        this.cityName = '';
        this.loadingMessage = '';
    }

    submitHandler(event){
        event.preventDefault();
        this.fetchData();
    }

    fetchData(){
        this.loadingMessage = 'fetching weather details...';

        //server side call
        Weather_App({cityName: this.cityName})
            .then(result => {
                this.loadingMessage = '';
                console.log(result);
                this.displayInfo(JSON.parse(result));
            })
            .catch(error => {
                this.isError =true;
                this.loadingMessage = 'unknown error occured';
            })

        //client side call
        /*const APIkey = 'e101f9d2888b3ca7f0f040493fb65bff'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${APIkey}&units=metric`

        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.loadingMessage = '';
            this.displayInfo(data);
        })
        .catch(error => {
            console.log(error);
            this.isError =true;
            this.loadingMessage = 'unknown error occured';
        })*/
    }

    displayInfo(response){
        if(response.cod === '404'){
            this.isError = true;
            this.loadingMessage = `${this.cityName} is not valid city`;
        }
        else{
            this.displayForm =false;
            this.isError = false;
            const city = response.name;
            const country = response.sys.country;
            const {temp,humidity,feels_like} = response.main
            const {description,id} = response.weather[0];

            this.weatherInfo = {
                location : `${city} ${country}`,
                id : id,
                temparature : Math.floor(temp),
                humidity : humidity,
                feels_like : Math.floor(feels_like),
                description : description
            }
        }
    }
    
}