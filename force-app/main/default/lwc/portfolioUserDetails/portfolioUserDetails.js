import { LightningElement , api } from 'lwc';
import PortfolioObject from '@salesforce/schema/Portfolio__c'
import ADDRESS from '@salesforce/schema/Portfolio__c.Address__c'
import PHONE_NUMBER from '@salesforce/schema/Portfolio__c.Mobile_Number__c'
import EMAIL from '@salesforce/schema/Portfolio__c.Email__c'

export default class PortfolioUserDetails extends LightningElement {

    @api recordId
    @api objectApiName

    download(){

    }
}