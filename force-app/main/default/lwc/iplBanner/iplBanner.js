import { LightningElement,wire } from 'lwc';
import fetchCricketStats from '@salesforce/apex/FetchIplStats.fecthIplStatistics'
import Iplwinners from '@salesforce/resourceUrl/IPL_Winners';
import cssUtil from '@salesforce/resourceUrl/CssStylingUtil'
import winner2024 from '@salesforce/resourceUrl/winner2024'
import { loadStyle } from 'lightning/platformResourceLoader';
export default class IplBanner extends LightningElement {
    fileName = 'ipl2024stats.json';
    carouselImgList=[];
    ipl2024Stats=[];
    leftStats = [];
    rightStats = [];
    rightStats1 = [];
    winner = winner2024;
    @wire(fetchCricketStats,
        {fileName: '$fileName'
    })ipl2024StatsHandler({data, error}){
        if(data){
            console.log("ipl2024StatsHandler data", data)
            let prasedData = JSON.parse(data)
            this.ipl2024Stats = prasedData.stats
            const half = Math.ceil(this.ipl2024Stats.length/2)
            this.leftStats = this.ipl2024Stats.slice(0,half);
            this.rightStats = this.ipl2024Stats.slice(half)
            this.rightStats1 = this.rightStats.map(item=>{
                let newKPI = item.KPIUnit === 'KPH' ? 'Mayank Yadav': item.KPIUnit
                return{...item , newKPI};
            })
            console.log(this.rightStats)

            /*this.rightStats = this.rightStats.map(item=>{
                let newType = item.KPIUnit === 'Kph' ? 'Mayank Yadav': ''
                return {...item, newType}*/

        }
        if(error)
            console.log(error);
    }

    connectedCallback(){
        this.loadIplWinnersData();
        this.loadUtilStyle();
    }

    loadUtilStyle(){
        loadStyle(this, cssUtil).then(() =>{
            console.log('loaded');
        }).catch(error =>{
            console.log('failed'+error);
        })
    }
    

    loadIplWinnersData(){
        for(let i=2008;i<2024;i++){

            this.carouselImgList.push({
                url: `${Iplwinners}/IPL_Winners/${i}.png`,
                altText: 'IPL winner of'+i,
                year: i
            });
        }
    }

}