const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
const url = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc'; // origin api url

/** fetch api by origin url */
/*
axios.get(url)
  .then((response) => {
    const msg = response.data;
    },
    (error) => {
    }
  );
*/

arr = 'abc';

/** fetch api url by cors-anywhere */
axios.get(`${cors}${url}`)
  .then((response) => {
    const msg = response.data;
    //document.body.innerHTML = JSON.stringify(msg);
	//console.log(msg);
	arr = response.data;
  },
    (error) => {
    }
  );

/** load data into datatable */
function genTbl1() {
 
    //var aDemoItems  = oResults.lDemographicItems; //
	console.log("This is START of genTbl1");
	console.log(arr);
    //var jsonString = JSON.stringify(arr.data) //for testing
	//console.log(jsonString);
     
   //Load  
    $('#tbl1').DataTable ({
        //"data" : jsonString,
		/*
		deferRender:    true,
        scrollY:        200,
        scrollCollapse: true,
        scroller:       true,
		*/
		"columnDefs": [
		    { title: 'forecastDate',   targets: 0 },
		    { title: 'week',   targets: 1 },
		    { title: 'forecastWind',   targets: 2 },
		    { title: 'forecastWeather',   targets: 3 },
		    { title: 'forecastMaxtemp',   targets: 4 },
		    { title: 'forecastMintemp',   targets: 5 },
		    { title: 'PSR',   targets: 6 },
			],
		
        data : arr.weatherForecast,
			
		"columns": 
		[
            { "data": "forecastDate" },
            { "data": "week" },
            { "data": "forecastWind" },
            { "data": "forecastWeather" },
            { "data": "forecastMaxtemp",
			render: function (data, type, row, meta) {
                    return row.forecastMaxtemp.value + " " + row.forecastMaxtemp.unit;
                }
			},
            { "data": "forecastMintemp",
			render: function (data, type, row, meta) {
                    return row.forecastMintemp.value + " " + row.forecastMintemp.unit;
                }
			},
            { "data": "PSR" },
        ]
    });
	
	console.log("This is END of genTbl1");
}

/** init method */
$( document ).ready(function() {
    console.log( "ready1 !" );
	var delayInMilliseconds = 2500; //1 second

	setTimeout(function() {
		genTbl1();
	  //your code to be executed after 1 second
	}, delayInMilliseconds);

    console.log( "ready2 !" );
});