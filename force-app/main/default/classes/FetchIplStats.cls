public class FetchIplStats {
    private static final String endpoint = 'https://raw.githubusercontent.com/karkranikhil/responses/main/';
        
    @AuraEnabled(cacheable = true)
        public static String fecthIplStatistics(String fileName){
            http http =new http();
            httpRequest request = new httprequest();           
            request.setEndpoint(endpoint+fileName);
            request.setMethod('GET');
            try{
            httpResponse response = http.send(request);
            System.debug(response.getBody());
            System.debug(response.getStatusCode());
            if(response.getStatusCode() == 200){
                return response.getBody();
            }
            else{
                system.debug(response.getStatusCode());              
                throw new AuraHandledException('Error while fetching data failed with response code'+response.getStatusCode());
            }
            }
            catch(exception e){
                System.debug(e.getMessage());
                throw new AuraHandledException('Error while executing request'+ e.getMessage());
            }
            
        
            
        }
}