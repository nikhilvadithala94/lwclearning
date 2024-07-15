import { LightningElement , api } from 'lwc';
import  IplImagesAndLogos from '@salesforce/resourceUrl/IPL_Images_and_logos'
export default class Iplkeyperformercard extends LightningElement {
    @api keyStat

    get getImage() {
        //optional chaining operator
        console.log('im child');
        let name = this.keyStat?.name?.replaceAll(' ','')
        return `${IplImagesAndLogos}/IPL_Images_and_logos/${name}.png`
    }
    get cardStyle(){
        let styleName = this.keyStat?.category?.replaceAll(' ','')+'_bg'
        return `slds-grid slds-wrap maindiv ${styleName}`
    }
}