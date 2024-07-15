public with sharing class PortfolioController {
   @AuraEnabled(Cacheable=true)
   public static List<Education__c>  getEducationDetails(String recordId){
    try {
        system.debug('entered'+recordId);
        return ([SELECT Id,InstitutionName__c,Title__c,YearOfPassing__c,CGPA__c FROM Education__c WHERE Portfolio__c =: recordId ORDER BY YearOfPassing__c desc]);
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}