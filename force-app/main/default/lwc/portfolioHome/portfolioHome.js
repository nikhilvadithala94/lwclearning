import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class PortfolioHome extends NavigationMixin(LightningElement) {

    handleClickBMI(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'BMI__c',
               
            },
            state: {
            }
        });
    }  
    
    handleClickAlarm(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'alarmclockapp__c',
               
            },
            state: {
            }
        });
    }
    handleCurrencyConversion(){
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'currencyconverter__c',
               
            },
            state: {
            }
        });
    }

        handleWeatherTracker(){
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: 'WeatherApp__c',
                   
                },
                state: {
                }
            });
        }
    


}