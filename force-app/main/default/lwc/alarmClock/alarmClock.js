import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets'
export default class AlarmClock extends LightningElement {
    alarmImg = AlarmClockAssets+'/AlarmClockAssets/clock.png'
    alarmSound  = new Audio(AlarmClockAssets+'/AlarmClockAssets/Clocksound.mp3')
    currentTime = '';
    hours = [];
    mins = [];
    meridian = ['AM','PM'];
    selHour;
    selMinute;
    selMeridian;
    alarmTime;
    alarmEnabled = false
    shakeAnimation =false

    connectedCallback(){
        this.populateHoursAndMins();
        this.getTimeHandler();
    }
    get isTimeNotSelected(){
        return !(this.selHour && this.selMin && this.selMeridian)
    }

    get addAnimation(){
        return this.shakeAnimation ? 'shake' : ''
    }

    getTimeHandler(){
        
        /*setInterval(function(){
            this.getCurrentTime();
        }, 1000);*/

        setInterval(() => this.getCurrentTime(),1000);
    }

    getCurrentTime(){
        let dateTime = new Date();
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        let seconds = dateTime.getSeconds();
        let meridian = 'AM';
        if(hours === 0){
            hours = 12;
            meridian = "AM";
        }
        else if(hours === 12){
            meridian = "PM";
        }
        else if(hours > 12){
            hours = hours-12;
            meridian = "PM";
        }
        hours = hours<10 ? "0"+hours : hours;
        minutes = minutes<10 ? "0"+minutes : minutes;
        seconds = seconds<10 ? "0"+seconds : seconds;
        //let meridian = hours >= 12 ? 'PM' : 'AM';
        this.currentTime = `${hours}:${minutes}:${seconds} ${meridian}`;

        if(this.alarmTime === `${hours}:${minutes}:${meridian}`){
            console.log('alarm triggered');
            this.shakeAnimation = true;
            this.alarmSound.play();
            this.alarmSound.loop = true;
        }

        
    }
    populateHoursAndMins(){

        for(let i=1;i<=12;i++){
            if(i<10)      
                this.hours.push(`0${i}`);
            else
                this.hours.push(i);
        }
        for(let i=0;i<=59;i++){
            if(i<10)
                this.mins.push(`0${i}`);
            else
                 this.mins.push(i);
        }
    }
    handleSelectEvent(event){
        console.log('entered event')
        if(event.detail.label === 'Hour(s)')
            this.selHour = event.detail.value;
        else if(event.detail.label === 'Minute(s)')
            this.selMin = event.detail.value;
        else if(event.detail.label === 'AM/PM')
            this.selMeridian = event.detail.value;
        console.log(this.selHour+this.selMin+this.selMeridian)

    }
    setAlarmHandler(){
        this.alarmTime = `${this.selHour}:${this.selMin}:${this.selMeridian}`
        this.alarmEnabled = true;
    }
    clearAlarmHandler(){
        this.alarmTime = '';
        this.alarmEnabled = false;
        this.shakeAnimation =false;
        this.alarmSound.pause();
        /*this.selHour = '';
        this.selMin = '';
        this.selMeridian = '';*/
        const elements = this.template.querySelectorAll('c-clock-drop-down');
        Array.from(elements).forEach(element => {
            element.reset("")
        })

    }

}