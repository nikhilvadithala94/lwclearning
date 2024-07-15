import { LightningElement, api } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
export default class PortfolioUserStats extends LightningElement {

    trailheadLogo;
    @api totalBadges
    @api totalPoints
    @api trails
    @api rank 

    renderedCallback(){
        if(this.rank)
            this.trailheadLogo = `${PortfolioAssets}/PortfolioAssets/Ranks/${this.rank}.png`
    }

}