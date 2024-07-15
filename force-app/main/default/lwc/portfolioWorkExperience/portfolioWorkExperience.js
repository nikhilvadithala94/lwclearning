import { LightningElement , wire ,api} from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
export default class PortfolioWorkExperience extends LightningElement {
        @api recordId;
        workExperience = []
    
        @wire(getRelatedListRecords, {
            parentRecordId: '$recordId',
            relatedListId: 'Work_Experience__r',
            fields: ['WorkExperience__c.Company__c','WorkExperience__c.Description__c',
                 'WorkExperience__c.EndDate__c','WorkExperience__c.StartDate__c',
                 'WorkExperience__c.Role__c',
                 'WorkExperience__c.WorkLocation__c',
                 'WorkExperience__c.IsCurrent__c'
            ]
        })
        workExperienceDataHandler({ error, data }) {
            if (data) {
                this.formatWorkExperirenceData(data)
            }
            if(error){
                console.error(error)
            }
        }

        formatWorkExperirenceData(data){

             let workExperienceRec = data.records.map(item =>{
                let id = item.id
                const {Company__c,Description__c
                    ,EndDate__c,StartDate__c,Role__c,WorkLocation__c,IsCurrent__c} = item.fields
                    
                    let company =  Company__c&&(Company__c.displayValue||Company__c.value)
                    let description =Description__c&&(Description__c.displayValue||Description__c.value)
                    let endDate = EndDate__c&&(EndDate__c.displayValue||EndDate__c.value)
                    let startDate = StartDate__c&&(StartDate__c.displayValue||StartDate__c.value)
                    let role = Role__c&&(Role__c.displayValue||Role__c.value)
                    let Location = WorkLocation__c&&(WorkLocation__c.displayValue||WorkLocation__c.value)
                    let isCurrent = IsCurrent__c&&(IsCurrent__c.displayValue||IsCurrent__c.value)
                    return {id,company,description,endDate,startDate,role,Location,isCurrent}
                //return workExperienceRec                            
            })
            this.workExperience = workExperienceRec.sort((a, b) => {
                // Handle null values by checking if endDate is null
                if (a.endDate === null && b.endDate === null) {
                    return 0; // If both are null, consider them equal
                }
                if (a.endDate === null) {
                    return 1; // Null values should be sorted after non-null values
                }
                if (b.endDate === null) {
                    return -1; // Non-null values should be sorted before null values
                }
                // Compare endDate values for non-null cases
                return b.endDate - a.endDate;
            });
        }
}