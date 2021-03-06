//countries api data
var countryData = fetch("https://restcountries.eu/rest/v2/all");
countryData
.then(function(data){
    return data.json();
})
.then(function(data){

//card design

//heading
var heading = document.createElement("p");
heading.innerHTML = "Display of Countries";
heading.setAttribute("style","text-align:center");

var row = document.createElement("div");
row.setAttribute("class","row");

for(var i in data){

    //column creation  
    var col = document.createElement("div");
    col.setAttribute("class","col-lg-3 col-md-4 col-sm-6");

    //card creation
    var card = document.createElement("div");
    card.setAttribute("class","card border-dark");

    //card header
    var header = document.createElement("div");
    header.setAttribute("class","card-header text-white bg-dark");
    header.innerHTML = data[i].name;

    var img = document.createElement("img");
    img.setAttribute("class","card-img-top");
    img.setAttribute("src",data[i].flag);
    img.setAttribute("alt","Country Flag");

    //card body
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");
    var title = document.createElement("h5");
    title.setAttribute("class","card-title");
    var info = document.createElement("div");
    info.setAttribute("class","text-justify");
    var capital = document.createElement("h6");
    capital.innerHTML = "Capital : " + data[i].capital;
    var region = document.createElement("h6");
    region.innerHTML = "Region : " + data[i].region;
    var population = document.createElement("h6");
    population.innerHTML = "Population : " + data[i].population;
    var code = document.createElement("h6");
    code.innerHTML = "Country Code : " + data[i].alpha3Code;

    //card footer
    var footer = document.createElement("div");
    footer.setAttribute("class","card-footer");

    var weather = document.createElement("button");
    weather.setAttribute("class","btn btn-dark");
    weather.innerHTML = "Get Weather";

    weather.addEventListener("click", function (){
      var weatherInfo = fetch("https://api.openweathermap.org/data/2.5/weather?lat="+data[i].latlng[0]+"&lon="+data[i].latlng[1]+"&appid=b49252325e1f247d7de7ce1e01fbf921");
      weatherInfo
      .then(function (res){
          console.log(res.json);
          return res.json(); 
          
      })
      .then(function (res){
          alert(
            "Latitudes: " + res.coord.lat +
            "\nLongitudes: " + res.coord.lon +
            "\nTemperature: " + res.main.temp +
            "\nPressure: " + res.main.pressure +
            "\nHumidity: " + res.main.humidity +
            "\nSea level: " + res.main.sea_level +
            "\nGround level: " + res.main.grnd_level 

          );
        })
      .catch(function (err){
          console.log(err);
      })
    })

    //appending
    info.append(capital,region,population,code);
    cardBody.append(title,info,weather);
    footer.append(weather);
    card.append(header,img,cardBody,footer);
    col.append(card);
    row.append(col);
    document.body.append(heading,row);
}

})
.catch(function(err){
    console.log(err);
})

