import { LightningElement ,wire , api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import TECH_SKILLS from '@salesforce/schema/Portfolio__c.TechSkills__c'
import SOFT_SKILLS from '@salesforce/schema/Portfolio__c.SoftSkills__c'
import SOFTWARE_TOOLS from '@salesforce/schema/Portfolio__c.SoftwareTools__c'
import METHODOLOGIES from '@salesforce/schema/Portfolio__c.SdlcMethodologies__c'
export default class PortfolioSkills extends LightningElement {
    @api recordId
    techSkills
    softSkills
    methodologies
    softwareTools
    @wire(getRecord,{
            recordId: '$recordId',
            fields: [TECH_SKILLS,SOFT_SKILLS,SOFTWARE_TOOLS,METHODOLOGIES]
        }) 
        handleRecords({data,error}){
            if(data){
                this.formatSkills(data)
            }
            if(error){
                console.error(error)
            }
        }

        formatSkills(data){
            console.log(data)
            const{TechSkills__c,SoftSkills__c,SoftwareTools__c,SdlcMethodologies__c} = data.fields
            this.techSkills = TechSkills__c ? TechSkills__c.value.split(','):[]
            this.softSkills = SoftSkills__c ? SoftSkills__c.value.split(','):[]
            this.softwareTools = SoftwareTools__c?SoftwareTools__c.value.split(','):[]
            this.methodologies = SdlcMethodologies__c?SdlcMethodologies__c.value.split(','):[]
        }

}