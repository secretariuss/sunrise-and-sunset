

//Part5 Add a listener for click events on submit button to save data
var submitBtn = $('.submitBtn');
var name = $('#name').text();
var email = $('#email').text();
var interest = $('#interest').text();

submitBtn.on('click', function(){
    var nameInput = $('#inputName').val();
    var emailInput = $('#inputEmail').val();
    var interestInput = $('#inputInterest').val();
    localStorage.setItem(name,nameInput);
    localStorage.setItem(email,emailInput);
    localStorage.setItem(interest,interestInput); 
    // <a href="https://www.booking.com/searchresults.html?ss=New+Brunswick%2C+Canada&efdco=1&label=gen173rf-1FCAEoggI46AdIM1gDaCeIAQGYATG4ARfIAQzYAQHoAQH4AQKIAgGiAg9sb2NhbGhvc3Q6NjMzNDKoAgO4Aqfbo6QGwAIB0gIkNTA0YTE0YWUtNzRmMS00MzJkLTkwMTQtMmY0MzA0MWFiMWQw2AIF4AIB&aid=304142&lang=en-us&sb=1&src_elem=sb&src=index&dest_id=3135&dest_type=region&ac_position=0&ac_click_type=b&ac_langcode=en&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=e6829e13e5c60232&ac_meta=GhBlNjgyOWUxM2U1YzYwMjMyIAAoATICZW46BW5ldyBiQABKAFAA&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure">Hotel
    //         information</a>  

});

var date = dayjs();

var inputValue = document.querySelector('.search-value');
var searchBtn = document.querySelector('.search-button');

var cityName = localStorage.getItem('cityNameStore');
function recordCityData() {
    localStorage.setItem('cityNameStore', inputValue.value);
}
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/city?name=' + cityName,
        headers: {'X-Api-Key': 'nJXzW/Qjcz5F0XFV2Dphrw==GPr65glggfFhYUHW'},
        contentType: 'application/json',
        success: function (result) {
            $('.city').html("<h2>" + cityName + "</h2>");
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var today  = new Date();
            var utc = today.toLocaleDateString("en-US", options)
            $('.current-date').html("<p>" + utc + "</p>")
            var latitude= result[0].latitude;
            var longitude = result[0].longitude;
            var queryURL = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;

            fetch(queryURL)
                .then(response => response.json())
                .then(data => {
                    $('.sunrise').html("<p>" + data.results.sunrise + "</p>");
                    $('.dawn').text("dawn: " + data.results.dawn);
                    $('.sunrise-text').text(`Sunrise today in ${cityName} was at ${data.results.sunrise}`);

                    $('.sunset').html("<p>" + data.results.sunset + "</p>");
                    $('.dusk').text("dusk: " + data.results.dusk);
                    $('.sunset-text').text(`Sunset today in ${cityName} will be at ${data.results.sunset}`);

                })
                .catch(error => console.error('Error:', error))
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    })



searchBtn.addEventListener('click', recordCityData);
