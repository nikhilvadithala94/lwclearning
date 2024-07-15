import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList'
import currencyConverterAsset from '@salesforce/resourceUrl/currencyConverterAssets'
export default class CurrencyConverter extends LightningElement {
    currencyimg = currencyConverterAsset+'/currencyConverterAssets/currency.svg'
    options = countryCodeList;
    fromCountry = 'USD'
    toCountry = 'INR'
    result 
    error
    Amount = ''
    handleChangeEvent(event){
        const {name,value} = event.target;
        console.log(event.target.name)
        console.log(event.target.value)
        this[name] = value;
        console.log(this.fromCountry);
        console.log(this.toCountry);
        this.result = '';
        this.error = '';

    }

    get inputValid(){
        return !this.Amount
    }

    shuffle(){
        let temp = this.fromCountry;
        this.fromCountry =this.toCountry;
        this.toCountry =temp;
        this.result = '';
        this.error = '';
    }

    submitHandler(event){
        event.preventDefault();
        this.convert()
    }

    async convert(){
        const accessKey = 'efdda4301eaeb0649ec0fd90'
        const url = `https://v6.exchangerate-api.com/v6/${accessKey}/pair/${this.fromCountry}/${this.toCountry}`
        try{
        const data =await fetch(url)
        const jsonData = await data.json()
        this.result = (Number(this.Amount)* jsonData.conversion_rate).toFixed(2);
        console.log('result'+this.result)
        }
        catch(error){
            console.log(error);
            this.error="An error occurred. Please try again..."
        }
    }

}