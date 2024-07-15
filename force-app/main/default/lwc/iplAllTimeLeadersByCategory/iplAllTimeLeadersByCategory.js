import { LightningElement ,wire} from 'lwc';
import {subscribe,MessageContext,unsubscribe,APPLICATION_SCOPE} from 'lightning/messageService'
import fetchCricketStats from '@salesforce/apex/FetchIplStats.fecthIplStatistics'
import IplImagesAndLogos from '@salesforce/resourceUrl/IPL_Images_and_logos'
import MSG_SERVICE from '@salesforce/messageChannel/Record_Selected__c'
export default class IplAllTimeLeadersByCategory extends LightningElement {
    headerInfo;
    fileName = '';
    statsByCategory = [];
    deviceType
    @wire(MessageContext)
    messageContext
    subscription
    isShowModal = false
    @wire(fetchCricketStats,
        {fileName: '$fileName'
    })AllTimeStatsHandlerByCategory({data, error}){
        if(data){
            console.log("data", data)
            let parsedData = JSON.parse(data);
            this.statsByCategory = parsedData.map((item,index)=>{
                let img = `${IplImagesAndLogos}/IPL_Images_and_logos/${item.StrikerName.replaceAll(" ","")}.png`
                return {...item,position:index+1,img}
            })
        }
        if(error)
        {
                console.error(error);
        }
    }
    connectedCallback(){
        if(!this.subscription){
        this.subscription = subscribe(this.messageContext,
            MSG_SERVICE,
            (message) => this.handleMessage(message),
            { scope : APPLICATION_SCOPE });
        }

    
    }
    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
        this.statsByCategory = [];
    }

    handleMessage(message){
        console.log(message);
        this.headerInfo = `TOP 5 ${message.fileName.title} All Time`
        this.fileName = message.fileName.name+'.json';
        this.deviceType =message.fileName.devType;
        if(this.deviceType === 'Mobile')
            this.isShowModal = true
    }

    get isBatsmen(){
        return this.fileName !== "MostWickets.json"
    }
    get isBowler(){
        return this.fileName === "MostWickets.json"
    }
    get isDesktop(){
        return this.deviceType === 'Desktop'
    }
    handleError(event){
        event.target.src = `${IplImagesAndLogos}/IPL_Images_and_logos/default.png`
    }

    hideModalBox() {
        this.isShowModal =false;
    }

}