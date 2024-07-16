import { LightningElement, api } from 'lwc';

export default class PortfolioTabsWrapper extends LightningElement {
    @api objectName
    @api recordId 
    acc1 = false
    acc2 = false
    acc3 = false
    acc4 = false
    acc5 = false
    acc6 = false
    acc7 = false
    tab1 = false
    tab2 = false
    tab3 = false
    tab4 = false
    tab5 = false
    tab6 = false
    tab7 = false 


    handleActive(event){
        const activeTab = event.target.value

        if(activeTab === 'tab1'){
            this.tab1 = true
        }
        else if(activeTab === 'tab2'){
            this.tab2 = true
        }
        else if(activeTab === 'tab3'){
            this.tab3 = true
        }
        else if(activeTab === 'tab4'){
            this.tab4 = true
        }
        else if(activeTab === 'tab5'){
            this.tab5 = true
        }
        else if(activeTab === 'tab6'){
            this.tab6 = true
        }
        else if(activeTab === 'tab7'){
            this.tab7 = true
        }
    }

    
    handleToggle(event){
        const activeSections = event.detail.openSections;
        this.acc1 = activeSections.includes('Summary')
        this.acc2 = activeSections.includes('Personal_Projects')
        this.acc3 = activeSections.includes('Work_Experience')
        this.acc4 = activeSections.includes('Skills')
        this.acc5 = activeSections.includes('Education')
        this.acc6 = activeSections.includes('Certifications')
        this.acc7 = activeSections.includes('Others')

    }
}