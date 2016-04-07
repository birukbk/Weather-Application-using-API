 $(document).ready(function() {
     $('#countries').change(function() {
     $('#counties').load($(this).val() + '-cities' + '.html');
         $('#counties').change(function() {
             var selectedCounty = $(this).val();
             var responseStatus = 'success';
             getData(selectedCounty);
         });
     });
 });

 function getData(selectedCounty) {
     $.ajax({
         url: 'http://api.openweathermap.org/data/2.5/weather?id=' + selectedCounty + '&appid=e4761ea183f1b15b7c6af8e63724a863',
         type: 'GET',
         dataType: 'json',
         success: function(response) {
         
             //display the chosen city and date from the requested data
             $('#cityName').empty().append('Weather for ' + response.name + ' on ' + toDD_MM_YY_format(response.dt));
             //display the city name div after the user choose country and city

             $('#weatherInfo').empty().append(
                 'Weather Conditions: ' + response.weather[0].main + '</br>' +
                 'Temperature :' + toCelsius(response.main.temp) + '</br>' +
                 'Wind Speed :' + toMilesPerHour(response.wind.speed) + '</br>' +
                 'Wind Direction: ' + toTextualDescription(response.wind.deg));
             displayWeatherIcon(response.weather[0].icon);
         },
         error: function() {
             $('#errorInfo').show().html('<p> An error has occurred, Please try again later</p>');
             $('#weatherInfo').empty();
         }
     });
 }

 //convert temperature in kelvin to Celsius.
 function toCelsius(kelvin) {
     var tempInCelsius = Math.round(kelvin - 273.15);
     return tempInCelsius + '°C';
 }

 //converts speed in knots to miles per hour(mph)
 function toMilesPerHour(knots) {
     var speedInMilesPerHour = Math.round(knots * 1.15077945); //1 Knot = 1.15077945 mph
     return speedInMilesPerHour + ' mph';
 }

 //converts UNIX time stamp in to readable format
 function toDD_MM_YY_format(unixTimeStamp) {
     var d = new Date(unixTimeStamp * 1000);
     var month = (d.getMonth()) + 1; //unix time stamp month starts from 0.
     var formattedDate = d.getDate() + "-" + month + "-" + d.getFullYear();
     return formattedDate;
 }
//convert the wind direction from degree to textual description.
function  toTextualDescription(degree){
var sectors = ['Northerly','North Easterly','Easterly','South Easterly','Southerly','South Westerly','Westerly','North Westerly'];
  degree += 22.5;
  var which = parseInt(degree / 45);
  return sectors[which%8];
}
//displays the corrosponding weather icon to weather condetion
function displayWeatherIcon(iconID) {
    var img = document.createElement("IMG");
    img.src = 'http://openweathermap.org/img/w/' + iconID + '.png';
    $('#imgDiv').empty();
    return document.getElementById('imgDiv').appendChild(img);
}



		 