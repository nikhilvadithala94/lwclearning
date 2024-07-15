import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class NavigateToIplDashboard extends NavigationMixin(LightningElement) {
    handleclick(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name : 'dasboard__c'
            },
            state : {

            }
        });
    }
}