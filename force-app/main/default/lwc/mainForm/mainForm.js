import { LightningElement } from 'lwc';

export default class MainForm extends LightningElement {
    abbreivatedName = '';
    isNameEntered =false;
    


    handleChildEvent(event){
        console.log('entered event handler');
        this.abbreivatedName = event.detail.shortName;
        this.isNameEntered = event.detail.isNameEntered;
        console.log(this.isNameEntered);
        console.log('entered')
    }
}