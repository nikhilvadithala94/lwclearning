import {LightningElement, wire ,api} from 'lwc';
import GetEducationDetails from '@salesforce/apex/PortfolioController.getEducationDetails';

// datatable columns with row actions. Set sortable = true
const columns = [ { label: 'Education', fieldName: 'Title__c'},
                  { label: 'Institution Name', fieldName: 'InstitutionName__c'},
                  { label: 'Year Of Passing', fieldName: 'YearOfPassing__c'},
                  { label: 'CGPA', fieldName: 'CGPA__c' }];

export default class DataTableSortingLWC extends LightningElement {
    @api recordId
    data;
    columns = columns;
    //sortBy='FirstName';
    //sortDirection='asc';
 
    // retrieving the data using wire service
    @wire(GetEducationDetails,{recordId : '$recordId'})
    contacts(result) {
        if (result.data) {
            this.data = result.data;
        } else if (result.error) {
           console.error(result.error)
        }
    }
}