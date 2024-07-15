public with sharing class GetTrainStatus {
    public static final String endpoint = 'https://rappid.in/apis/train.php?train_no=';
    @AuraEnabled
    public static TrainStatusWrapper GetSearchedTrainStatus(String trainNumber) {
        TrainStatusWrapper trainStatusLst = new TrainStatusWrapper();
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint+trainNumber);
        req.setMethod('GET');
        try{
        HttpResponse res = http.send(req);
        if(res.getStatusCode() == 200){
            system.debug(res.getBody());
            TrainStatusWrapper status = (TrainStatusWrapper) json.deserialize(res.getBody(), TrainStatusWrapper.class);
            return status;
        }
        else{
            system.debug(res.getStatusCode());              
            throw new AuraHandledException('Error while fetching data failed with response code'+res.getStatusCode());
        }
    }
    catch(exception e){
        System.debug(e.getMessage());
        throw new AuraHandledException('Error while executing request'+ e.getMessage());
    }
    }


    public class TrainStatusWrapper {

        @AuraEnabled public Boolean success{get; set;}
        @AuraEnabled public String train_name{get; set;}
        @AuraEnabled public String message{get; set;}
        @AuraEnabled public String updated_time{get; set;}
        @auraenabled public List<Data> data{get; set;}
    }
    
    public class Data {
            @AuraEnabled public Boolean is_current_station{get; set;}
            @AuraEnabled public String station_name{get; set;}
            @AuraEnabled public String distance{get; set;}
            @AuraEnabled public String timing{get; set;}
            @AuraEnabled public String delay{get; set;}
            @AuraEnabled public String platform{get; set;}
            @AuraEnabled public String halt{get; set;}
    }
    

}