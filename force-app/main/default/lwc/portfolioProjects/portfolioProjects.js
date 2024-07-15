import { LightningElement } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
import IPL_Images_and_logos from '@salesforce/resourceUrl/IPL_Images_and_logos'
export default class PortfolioProjects extends LightningElement {
    //bmiImage = `${PortfolioAssets}/PortfolioAssets/Projects/BMICalculator.png`
    projects =[
        {
            title: 'BMI Calculator',
            image: `${PortfolioAssets}/PortfolioAssets/Projects/BMICalculator.png`,
            url: 'https://nikhilv23-dev-ed.develop.my.site.com/MyPortfolio/bmicalculator'
         },
         {
            title: 'Alarm Clock',
            image: `${PortfolioAssets}/PortfolioAssets/Projects/AlarmClock.png`,
            url: 'https://nikhilv23-dev-ed.develop.my.site.com/MyPortfolio/alarmclockapp'
         },
         {
            title: 'Currency Converter',
            image: `${PortfolioAssets}/PortfolioAssets/Projects/CurrencyCalculator.png`,
            url: 'https://nikhilv23-dev-ed.develop.my.site.com/MyPortfolio/currencyconverter'
        },
        {
            title: 'Weather App',
            image: `${PortfolioAssets}/PortfolioAssets/Projects/WeatherApp.png`,
            url: 'https://nikhilv23-dev-ed.develop.my.site.com/MyPortfolio/weatherapp'
        },
        {
            title: 'Note Taking App',
            image: `${PortfolioAssets}/PortfolioAssets/Projects/NoteTakingApp.png`,
            url: 'https://nikhilv23-dev-ed.develop.my.site.com/MyPortfolio/notetakingapp'
        },
        {
            title: 'Surveys',
            image: `${PortfolioAssets}/PortfolioAssets/Projects/Survey.png`,
            url: 'https://nikhilv23-dev-ed.develop.my.site.com/Surveys/s/'
        },
        {
            title: 'IPL Dashboard',
            image: `${IPL_Images_and_logos}/IPL_Images_and_logos/ipl-logo-new-old.png`,
            url:'https://nikhilv23-dev-ed.develop.my.site.com/IPLDashboard/s/dashboard'
        }     
        ]

}