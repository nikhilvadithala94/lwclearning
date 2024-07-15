import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getTrainStatus from '@salesforce/apex/GetTrainStatus.GetSearchedTrainStatus';
const col = [
    {label : 'Station Name', fieldName : 'station_name'},
    {label : 'Distance', fieldName : 'distance'},
    {label : 'Timing', fieldName : 'timing'},
    {label : 'Platform', fieldName : 'platform'},
    {label: 'Delay' , fieldName: 'delay'},
    {label: 'Halt' , fieldName: 'halt'}
];
export default class CheckTrainRunningStatus extends LightningElement {
    trainNumber = '';
    trainDetails = {};
    showSpinner = false;
    showDataTable = false;
    columns = col;

    handleChange(event) {
        this.trainNumber = event.target.value;
    }

    handleClick(){
        this.showSpinner = true;
        getTrainStatus({trainNumber: this.trainNumber}).then(result => {
            this.trainDetails =result;
            console.log('entered')
            this.showSpinner =false;
            this.showDataTable =true;
        })
        .catch(error => {
            console.error(error);
            this.showSpinner =false;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        })
    }
}