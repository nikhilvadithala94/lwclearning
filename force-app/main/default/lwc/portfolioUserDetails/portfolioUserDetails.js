import { LightningElement , api , wire } from 'lwc';
import PortfolioObject from '@salesforce/schema/Portfolio__c'
import getResumeAsAttachment from '@salesforce/apex/PortfolioController.getRelatedFilesByRecordId'
import ADDRESS from '@salesforce/schema/Portfolio__c.Address__c'
import PHONE_NUMBER from '@salesforce/schema/Portfolio__c.Mobile_Number__c'
import EMAIL from '@salesforce/schema/Portfolio__c.Email__c'
import { NavigationMixin } from 'lightning/navigation'


export default class PortfolioUserDetails extends  NavigationMixin(LightningElement) {

    @api recordId
    @api objectApiName
    url

    @wire(getResumeAsAttachment, {recordId: '$recordId'})
    wiredResult({data, error}){ 
        if(data){ 
            console.log(data)
            let key = Object.keys(data)[0]
            this.url = `https://nikhilv23-dev-ed.develop.my.site.com/MyPortfolio/sfc/servlet.shepherd/document/download/${key}`
        }
        if(error){ 
            console.log(error)
        }
    }


    download(){
        window.open(this.url,"_blank")
    }
       /* getResumeAsAttachment({recordId : this.recordId}).then(
            result => {
                this.handleFormatAttachment(result)
        }).catch(error => {
            console.log(error)
            })
    }

    handleFormatAttachment(res){
        console.log('entered 2')
        this.fileList = Object.keys(res).map(item=>({
            'label' : res[item],
            'value' : item,
            'url' :`/sfc/servlet.shepherd/document/download/${item}`
        }))

            const url = this.fileList[0].url
           
            console.log(url)
            this[NavigationMixin.Navigate]({

                type: standard__webPage,

            attributes: {
            url: url
            }

        });


    }*/




}