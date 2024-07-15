import { LightningElement, api } from 'lwc';
import  IplImagesAndLogos from '@salesforce/resourceUrl/IPL_Images_and_logos'
export default class Iplkeyperformercard extends LightningElement {
    @api keystat

    get getImage() {
        //optional chaining operator
        let name = this.keystat?.name?.replaceall(' ','')
        return `${IplImagesAndLogos}/IPL_Images_and_logos/${name}.png`
    }

}