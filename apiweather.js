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
 			
 		

 			//display the choosen city and date from the requested data
 			$('#cityName').empty().append('Weather for '+ city + ' on '+ toDD_MM_YY_format(date));
 			//display the city name div after the user choose country and city
 			if ($('#cityName').attr("hidden")) {
					$('#cityName').show();
				}
 			$('#weatherInfo').empty().append(
 				'Weather Conditions: '+ weatherConditions + '</br>'+
 				'Temperature :'+ toCelssius(temprature) + '</br>'+
 				'Wind Speed :'+ toMilesPerHour(windSpeed) + '</br>' +
 				'Wind Direction: ' + toTextualDescription(windDirection));
 			if ($('#weatherInfo').attr("hidden")) {
					$('#weatherInfo').show();
				}
 		},
 		error: function(){
				$('#info').html('<p> An earror has occoured, Please try again later</p>');
			}
 		
 	});
 }
//convert temprature in kelvin to cellsius.
 function toCelssius(kelvin){
 	var tempInCelsius=Math.round(kelvin-273.15);
 	return tempInCelsius +'°C';
 }

 function toMilesPerHour(knots){
 	var speedInMilesPerHour=  Math.round(knots * 1.15077945); //1 Knot = 1.15077945 mph
 	return speedInMilesPerHour + ' mph';
 }

 function toDD_MM_YY_format(unixTimeStamp){
 	var d = new Date(unixTimeStamp * 1000);
 	var month = (d.getMonth())+1; //unix time stamp month starts from 0.
	var formattedDate = d.getDate() + "-" + month + "-" + d.getFullYear();
	return formattedDate;
 }

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


 
		 