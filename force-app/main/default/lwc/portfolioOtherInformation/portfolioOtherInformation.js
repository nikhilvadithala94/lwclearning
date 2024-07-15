import { LightningElement ,api , wire } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
import { getRecord } from 'lightning/uiRecordApi';
import AWARDS_FIELD from '@salesforce/schema/Portfolio__c.Awards__c'
import SUPERBADGES_FIELD from '@salesforce/schema/Portfolio__c.superbadges__c'
import LANGUAGE_FIELD from '@salesforce/schema/Portfolio__c.Languages__c'
export default class PortfolioOtherInformation extends LightningElement {
    @api recordId
    awards
    languages
    superbadges
    awardsImg = `${PortfolioAssets}/PortfolioAssets/trophy.png`
    languagesImg = `${PortfolioAssets}/PortfolioAssets/language.png`
    superbadgesImg = `${PortfolioAssets}/PortfolioAssets/badge.png`
    @wire (getRecord,{
            recordId: '$recordId',
            fields: [AWARDS_FIELD,SUPERBADGES_FIELD,LANGUAGE_FIELD]
        })
        wiredData({data,error}){
            if(data){
                this.formatInfo(data)
            }
            if(error){
                console.error(error)
            }
        }

        formatInfo(data){
            const{Awards__c,superbadges__c,Languages__c} = data.fields
            this.awards = Awards__c?Awards__c.value.split(','):[]
            this.superbadges = superbadges__c?superbadges__c.value.split(';'):[]
            this.languages = Languages__c?Languages__c.value.split(','):[]
        }
}