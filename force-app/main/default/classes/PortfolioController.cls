public with sharing class PortfolioController {
   @AuraEnabled(Cacheable=true)
   public static List<Education__c>  getEducationDetails(String recordId){
    try {
        return ([SELECT Id,InstitutionName__c,Title__c,YearOfPassing__c,CGPA__c FROM Education__c WHERE Portfolio__c =: recordId ORDER BY YearOfPassing__c desc]);
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }

   @AuraEnabled(Cacheable =true)
   public static Map<ID, String> getRelatedFilesByRecordId(String recordId) {
    // Get record file IDs        
    List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
    List<ID> fileIDs = new List<ID>();
    for (ContentDocumentLink docLink : files) {
        fileIDs.add(docLink.ContentDocumentId);
    }

    List<ContentVersion> docs = [SELECT ContentDocumentId, FileExtension, Title 
        FROM ContentVersion WHERE ContentDocumentId IN : fileIDs];
    Map<ID, String> mapIdTitle = new Map<ID, String>();
    for (ContentVersion docLink : docs) {
        mapIdTitle.put(docLink.ContentDocumentId, docLink.Title);
    }
    return mapIdTitle;
    }
}
