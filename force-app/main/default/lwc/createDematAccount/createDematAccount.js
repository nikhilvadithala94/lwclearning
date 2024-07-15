import { LightningElement } from 'lwc';
import DEMATACCOBJECT from '@salesforce/schema/DematAccount__c'
import FULL_NAME from '@salesforce/schema/DematAccount__c.Full_Name__c'
import EMAIL from '@salesforce/schema/DematAccount__c.Email__c'
import DEPOSITORY from '@salesforce/schema/DematAccount__c.Depository__c'
import ACCOUNT_TYPE from '@salesforce/schema/DematAccount__c.AccountType__c'
import MOBILE from '@salesforce/schema/DematAccount__c.Mobile__c'
import ACCOUNT_PLAN from '@salesforce/schema/DematAccount__c.Account_Plan__c'
import SECONDARY_ACCOUNT_HOLDER from '@salesforce/schema/DematAccount__c.Secondary_Account_Holder__c'
import ANNUAL_INCOME from '@salesforce/schema/DematAccount__c.Annual_Income__c'
import DATE_OF_BIRTH from '@salesforce/schema/DematAccount__c.Date_Of_Birth__c'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class CreateDematAccount extends LightningElement {
    
    isCustomer = false;
    isNewCustomer =false;
    objectApiName = DEMATACCOBJECT;
    Name = FULL_NAME;
    Email = EMAIL;
    Depository = DEPOSITORY;
    AccountType = ACCOUNT_TYPE;
    Mobile = MOBILE;
    AccountPlan = ACCOUNT_PLAN;
    SecondaryAccountHolder = SECONDARY_ACCOUNT_HOLDER;
    AnnualIncome = ANNUAL_INCOME;
    DateofBirth = DATE_OF_BIRTH;
    handleClickYes(){
        this.isCustomer =true;
        this.isNewCustomer = false;
    }

    handleClickNo(){
        this.isNewCustomer = true;
        this.isCustomer =false;
    }
    /*submitHandler(event){
        event.preventDefault();

    }*/

    handleSuccess(){
        const toastEvent = new ShowToastEvent({
            title : 'Success',
            message : 'Demat Account Request Processed Successfully.' ,
            varient : 'success' 
        });
        this.dispatchEvent(toastEvent);
    }

}