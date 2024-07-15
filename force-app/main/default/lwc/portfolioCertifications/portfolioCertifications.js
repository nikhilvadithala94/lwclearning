import { LightningElement ,wire ,api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
import SF_CERT from '@salesforce/schema/Portfolio__c.Certifications__c'
import OtherCert from '@salesforce/schema/Portfolio__c.Other_Certifications__c'
export default class PortfolioCertifications extends LightningElement {

    @api recordId
    certs
    otherCerts = []
    sfCertLogo = `${PortfolioAssets}/PortfolioAssets/cert_logo.png`

    get hasItems(){
        return this.otherCerts.length > 0
    }
    @wire (getRecord,{recordId: '$recordId', 
        fields: [SF_CERT,OtherCert]
    })
        certsHandler({data,error}){
            if(data){
                console.log(JSON.stringify(data))
                this.formatCertsData(data)
            }
            if(error)
            {
                console.log(error)
            }
        }


    formatCertsData(data){
        const {Certifications__c,Other_Certifications__c} = data.fields
        this.certs = Certifications__c ? Certifications__c.value.split(';').map(item =>{
            return `Salesforce Certified ${item}`
         }) : []
        this.otherCerts = Other_Certifications__c.value ? 
        (Other_Certifications__c.value.includes(',')?Other_Certifications__c.value.split(','):Other_Certifications__c.value) :[]
        
        console.log(this.otherCerts);
    }

}