var imgs={
  "Default" : "https://media.giphy.com/media/PLJzdMVafDLTW/giphy.gif",
  "Rain" : "http://33.media.tumblr.com/tumblr_lv6bvbfp6e1r1yutvo1_500.gif",
  "Clouds" : "https://media.giphy.com/media/3o7rc6sa2RvKo8K5EI/giphy.gif",
  "Snow" : "https://m.popkey.co/000c51/A6zrV.gif",
  "Rain" : "https://mystery756.files.wordpress.com/2017/02/heavy-rain-storm.gif?w=990",
  "Drizzle" : "https://thumbs.gfycat.com/PettyGreenCommongonolek-small.gif",
  "Thunderstorm" : "http://24.media.tumblr.com/tumblr_m9j87qRdLP1rsq9eyo1_r1_500.gif",
  "Clear" : "https://i2.wp.com/blogsizzle.com/wp-content/uploads/2016/02/Animated-Sun.gif?resize=590%2C443",
  "Haze" : "http://weloveweather.tv/wp-content/uploads/2016/08/PhobiasFog.gif"
}

var tempInC;
var unit='C';
var qtemp;
var lat=''; var lon='';
var back='';
navigator.geolocation.getCurrentPosition(getWeather);

function getWeather(position){
        lat=position.coords.latitude;
        lon=position.coords.longitude;
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon, function(json) {
          qtemp=json.main.temp;
          tempInC=qtemp;
          if (imgs.hasOwnProperty(json.weather[0].main))
            back = imgs[json.weather[0].main];
          else
            back=imgs['Default'];
  $("#forecast").html('You\'re in '+json.name+' '+json.sys.country+'<br>You\'re having '+json.weather[0].main+' over there.<br>The temperature is <button class="link" id="t">'+qtemp+String.fromCharCode(176)+unit+'</button> <img src="'+json.weather[0].icon+'">');
          $('html body').css('background','url('+back+')').css('background-size','cover');
          $("#t").click(function(){
            if (unit==='C'){
              unit='F';
              qtemp=Math.floor((qtemp*9/5)+32);
            }
            else if (unit==='F'){
              unit='C';
              qtemp=tempInC;
            } $("#t").html(qtemp+String.fromCharCode(176)+unit);
          });
});
}

getWeather();