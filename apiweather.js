 $(document).ready(function() {
	$('#countries').change(function() {
		$('#counties').load($(this).val() +'-cities'+'.html');
		$('#counties').change(function(){
			var selectedCounty = $(this).val();

			getData(selectedCounty);
	});
	});
 });

 function getData(selectedCounty)
 {
 	$.ajax(
 	{
 		url:'http://api.openweathermap.org/data/2.5/weather?id='+selectedCounty+'&appid=e4761ea183f1b15b7c6af8e63724a863',
 		type:'GET',
 		dataType:'json',
 		success: function(response){
 			console.log(JSON.stringify(response));

 			var city=response.name;
 			var weatherConditions=	response.weather[0].main;
 			var temprature = response.main.temp;
 			var windSpeed=	response.wind.speed;
 			var windDirection=	response.wind.deg;
 			var date= response.dt;
 			var icon= response.weather[0].icon;

 			displayWeatherIcon(icon);

 			//display the chosen city and date from the requested data
 			$('#cityName').empty().append('Weather for '+ city + ' on '+ toDD_MM_YY_format(date));
 			//display the city name div after the user choose country and city
 			if ($('#cityName').attr("hidden")) {
					$('#cityName').show();
				}
			
 			$('#weatherInfo').empty().append(
 				'Weather Conditions: '+ weatherConditions + '</br>'+ 
 				'Temperature :'+ toCelsius(temprature) + '</br>'+
 				'Wind Speed :'+ toMilesPerHour(windSpeed) + '</br>' +
 				'Wind Direction: ' + toTextualDescription(windDirection));
 			if ($('#weatherInfo').attr("hidden")) {
					$('#weatherInfo').show();
				}
				displayWeatherIcon(icon);
 		},
 		error: function(){
				$('#info').show().html('<p> An error has occurred, Please try again later</p>');
				$('#weatherInfo').empty();
				
			}
 		
 	});
 }

/**
 * convert temperature in kelvin to Celsius.
 * @param  {temperate in kelvin}
 * @return {temperature in Celsius concatenated with °C }
 */
 function toCelsius(kelvin){
 	var tempInCelsius=Math.round(kelvin-273.15);
 	return tempInCelsius +'°C';
 }
/**
 * converts speed in knots to miles per hour
 * @param  {speed in Knots}
 * @return {speed in mph concatenated with mph}
 */
 function toMilesPerHour(knots){
 	var speedInMilesPerHour=  Math.round(knots * 1.15077945); //1 Knot = 1.15077945 mph
 	return speedInMilesPerHour + ' mph';
 }
/**
 * converts UNIX time stamp in to readable format
 * @param  {Unix time stamp}
 * @return {formatted date in DD-MM-YY format}
 */
 function toDD_MM_YY_format(unixTimeStamp){
 	var d = new Date(unixTimeStamp * 1000);
 	var month = (d.getMonth())+1; //unix time stamp month starts from 0.
	var formattedDate = d.getDate() + "-" + month + "-" + d.getFullYear();
	return formattedDate;
 }
 /**
  * converts wind direction from degrees to textual description 
  * @param  {wind direction in degrees}
  * @return {textual description }
  */
function  toTextualDescription(degree){
	if ((degree>337.5 && degree<360)|| (degree>22.5 && degree<22.5))
	{return 'Northerly';}
 	else if(degree>22.5 && degree<67.5){return 'North Easterly'}
 	else if(degree>67.5 && degree<112.5){return 'Easterly'}
 	else if(degree>122.5 && degree<157.5){return 'South Easterly'} 
 	else if(degree>157.5 && degree<202.5){return 'Southerly'}
 	else if(degree>202.5 && degree<247.5){return 'South Westerly'}
 	else if(degree>247.5 && degree<292.5){return 'Westerly'}
 	else if(degree>292.5 && degree<337.5){return 'North Westerly'}
}
function displayWeatherIcon(iconID){
	var img = document.createElement("IMG");
	img.src = 'http://openweathermap.org/img/w/'+iconID+'.png';
	$('#imgDiv').empty();
	return document.getElementById('imgDiv').appendChild(img);
}


		 