import { LightningElement ,wire ,api } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
import { getRecord ,getFieldValue } from 'lightning/uiRecordApi';
import FULL_NAME from '@salesforce/schema/Portfolio__c.Full_Name__c'
import Designation from '@salesforce/schema/Portfolio__c.Designation__c'
import location from '@salesforce/schema/Portfolio__c.company_location__c'
import company from '@salesforce/schema/Portfolio__c.Company__c'
export default class PortfolioBanner extends LightningElement {
    @api linkedinURL  = '';
    @api githuburl = '';
    @api twitterURL = '';
    @api youtubeURL = '';
    @api trailheadURL = '';
    @api blogURL = '';
    userImage = PortfolioAssets +'/PortfolioAssets/userPic.jpeg';
    linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`
    github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`
    youtube = `${PortfolioAssets}/PortfolioAssets/Social/youtube.svg`
    trailhead = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`
    twitter = `${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`
    blogger = `${PortfolioAssets}/PortfolioAssets/Social/blogger.svg`

    @api recId = '';
    @wire(getRecord, {recordId: "$recId", fields:[FULL_NAME,Designation,location,company]})
    portfolioRec

    get fullName(){
        return getFieldValue(this.portfolioRec.data,FULL_NAME)
    }
    
    get company(){
        return getFieldValue(this.portfolioRec.data,company)
    
    }

    get location(){
        return getFieldValue(this.portfolioRec.data,location)
    }

    get designation(){
        return getFieldValue(this.portfolioRec.data,Designation)
    }

}