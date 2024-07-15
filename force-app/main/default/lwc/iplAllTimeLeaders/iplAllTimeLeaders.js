import { LightningElement , wire } from 'lwc';
import fetchCricketStats from '@salesforce/apex/FetchIplStats.fecthIplStatistics'
import  IplImagesAndLogos from '@salesforce/resourceUrl/IPL_Images_and_logos'
import {publish,MessageContext} from 'lightning/messageService'
import MSG_SERVICE from '@salesforce/messageChannel/Record_Selected__c'
import FORM_FACTOR from '@salesforce/client/formFactor'
const statsUnit = {
    'Most Runs': 'Runs',
    'Most Wickets':'Wickets',
    'Most Fours':'Fours',
    'Most Sixes':'Sixes',
    'Highest Score':'HS',
    'Best Strike Rate':'SR'
}
export default class IplAllTimeLeaders extends LightningElement {
    fileName = 'onAllTimeLeaders.json';
    allTimeLeaders = [];
    deviceType

    @wire (MessageContext)
    messageContext

    @wire(fetchCricketStats ,{fileName : '$fileName'       
    })allTimeLeaderHandler({data,error}){
        if(data){
            console.log(data);
            let parsedData = JSON.parse(data);
            const allTimeLeaders = parsedData.allTimeLeaders;
            this.allTimeLeaders = allTimeLeaders.map(item=>{
                let playerImg = `${IplImagesAndLogos}/IPL_Images_and_logos/${item.PLAYER_NAME.replaceAll(' ','')}.png`
                let teamLogo =  `${IplImagesAndLogos}/IPL_Images_and_logos/${item.TEAM_CODE}.png`
                let unit = statsUnit[item.title];
                return {...item,playerImg,teamLogo,unit} 
            });
            console.log(this.allTimeLeaders);
            const {KPIType , title} = this.allTimeLeaders[0]
            FORM_FACTOR === 'Large' || FORM_FACTOR === 'Medium'?this.deviceType = 'Desktop':this.deviceType='Mobile'
            if(this.deviceType === 'Desktop')
                this.publishData(KPIType,title)
            

        }
        
        if(error){
            console.error(error);
        }

        
    }

    publishData(name,title){
        let devType = this.deviceType
        const msg = {
            fileName:{
                name,
                title,
                devType
            }
        }
        publish(this.messageContext,MSG_SERVICE,msg);
    }
    handleClick(event){
        const name = event.target.dataset.filename
        const title = event.target.dataset.category
        this.publishData(name,title);
    }


}