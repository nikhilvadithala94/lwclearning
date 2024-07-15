import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import Name from '@salesforce/schema/User.Name';
import creditscore from '@salesforce/schema/User.Contact.Credit_Score__c';
export default class CheckCreditScore extends LightningElement {
   userId = Id;
   userCreditScore;

    @wire(getRecord, { recordId: Id, fields: [creditscore ,Name] })
    userDetails({ error, data }) {
        if (error) {
            this.error = error;
        } else if (data) {
            console.log(data);
            if (data.fields.Contact.value.fields.Credit_Score__c.value != null) {
                this.userCreditScore = data.fields.Contact.value.fields.Credit_Score__c.value;
            }
            
        }
    }

    get getUserCreditScore(){
        console.log(this.userCreditScore);
        if(this.userCreditScore >= 650)
            return true;
        else
            return false;
    }
}