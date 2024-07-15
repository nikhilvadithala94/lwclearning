public with sharing class WeatherAppController {
    @AuraEnabled
    public static String  getWeatherInfo(String cityName) {
        String token = 'e101f9d2888b3ca7f0f040493fb65bff';
        String URL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+token+'&units=metric';
        HttpResponse response = new HttpResponse();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(URL);
        request.setMethod('GET');
        response = http.send(request);
        return response.getBody();
     
    }
}