document.addEventListener('DOMContentLoaded',()=>{
    console.log("Dom fully loaded");

    const covidData = document.querySelector('.coviddata') ;

    const getCovidData = function(){
        const request = new XMLHttpRequest();
        // const lat= 44.34;
        // // const lon = 10.99;
        // // const apiKey='be75d3e978896f4522b7642d5c150feb';
        request.open('GET',`https://covid-19-data.p.rapidapi.com/country/code?format=json&code=NZ`);
        request.setRequestHeader('X-RapidAPI-Host', 'covid-19-data.p.rapidapi.com');
        request.setRequestHeader('X-RapidAPI-Key', 'c4708bdf4dmsh226ae5f06c82ac5p16fb25jsncd7f97a49dfe');
        request.send();
      
// lines 11,12,13 are same in the website from where i brought the api but in 13 line we need to get endpoint key
  // here initially i got the url and then setRequestHeader =>         request.setRequestHeader('X-RapidAPI-Host', 'covid-19-data.p.rapidapi.com');
// since we have took the url from rapidapi.com so need to login and subscribes for 0$ and then tested the endpoint key
//  there i found this api key "c4708bdf4dmsh226ae5f06c82ac5p16fb25jsncd7f97a49dfe"
        request.addEventListener('load',function(){
            if(this.status=== 200){
                const data = JSON.parse(this.responseText);
                console.log(data);
                if (covidData) {  
                    const country = data[0].country.toLowerCase();
                    const flagUrl = `https://flagcdn.com/w320/${country.substring(0,2)}.png`;
                    const html = `
                    <article class="country">
                        <img class="country__img" src="${flagUrl}" alt="Flag of ${data[0].country}" />
                        <div class="country__data">
                            <h3 class="country__name">COVID-19 Data for ${data[0].country}</h3>
                            <h4 class="country__cases">Confirmed: ${data[0].confirmed}</h4>
                            <h4 class="country__recovered">Recovered: ${data[0].recovered}</h4>
                            <h4 class="country__death">Deaths: ${data[0].deaths}</h4>
                        </div>
                    </article>`;
                    covidData.insertAdjacentHTML('beforeend', html);
                    covidData.style.opacity = 1;
                }
            } else {
                console.error('Error fetching COVID-19 data:', this.status, this.statusText);
            }
        });

        request.addEventListener('error', function() {
            console.error('Request failed');
        });
    };

    // Call the function to fetch COVID-19 data
    getCovidData();
});

