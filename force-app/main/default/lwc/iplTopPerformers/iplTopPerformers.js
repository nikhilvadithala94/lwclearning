import { LightningElement , wire} from 'lwc';
import fetchCricketStats from '@salesforce/apex/FetchIplStats.fecthIplStatistics'
export default class IplTopPerformers extends LightningElement {
    fileName = 'ipl2024stats.json';
    keyStats = [];
    @wire(fetchCricketStats,
        {fileName: '$fileName'
    })ipl2024StatsHandler({data, error}){
        if(data){
            console.log("ipl2024StatsHandler data", data)
            let prasedData = JSON.parse(data)
            this.keyStats = prasedData.keystats;

        }
        if(error)
        {
                console.error(error);
        }
    }
}