fetch('https://restcountries.com/v2/all')
.then(function(data){
return data.json();
})
.then((data)=>{
    data.forEach(element => {
       // console.log(element.name +' '+element.capital+' '+element.region+" "+element.latlng+' '+element.alpha2Code+' ')

       //console.log(element)
    //   console.log()
       let myDiv=document.querySelector('.containers');
       let div=document.createElement('div')
        div.className="main"
       let h1=document.createElement('h1');
       h1.innerText=element.name;
       let img=document.createElement('img')
       img.src=element.flags.svg;
      // console.log(element.flags[0])
       let cap=document.createElement('p');
       cap.innerText="Capital : "+element.capital;
       let reg=document.createElement('p');
       reg.innerText="Region : "+element.region;
       let countryCode=document.createElement('p');
       countryCode.innerText="Country Code : "+element.alpha2Code;
       let latlng=document.createElement('p');
       latlng.innerText="Latlng : ["+element.latlng+"]";
      div.appendChild(h1);
      div.appendChild(img)
       div.appendChild(cap);
       div.appendChild(reg);
       div.appendChild(countryCode);
       div.appendChild(latlng);
       //let btn=`<button onclick='showWhether("${element.capital}")'>Click For Weather</button>`
      // let btn=`<button type="button" class="btn btn-primary button" data-toggle="modal" data-target="#exampleModal" onclick='showWhether("${element.capital}")'>Click For Weather</button>`
      let btn=`<a href="#myModal" role="button" class="btn btn-lg btn-primary button" data-bs-toggle="modal" onclick='showWhether("${element.capital}","${element.name}")'>Click For Weather</a>`
       div.innerHTML= div.innerHTML+btn
       myDiv.appendChild(div);
       
       //document.body.appendChild(div);

      
     
    });
}
)
.catch()

function showWhether(code,name)
{
    
    let headDiv=document.getElementById('headDiv');
    headDiv.innerText='Weather Report of '+name;

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${code}&appid=cdd9d644f9c43076864a476b120ddc44`;
   // let url=`https://api.openweathermap.org/data/2.5/weather?q=`+code+`&appid=cdd9d644f9c43076864a476b120ddc44`;
    fetch(url)
    .then(function (data){
        return data.json();
    })
    .then((data)=>{

        let modalDiv=document.getElementById('modal-body');

        let feels=document.createElement('p');
        let hum=document.createElement('p');
        let pres=document.createElement('p');        
        let t=document.createElement('p');        
        let max=document.createElement('p');        
        let min=document.createElement('p');
        
        let feelsLike=data.main.feels_like;
        feels.innerHTML="Feels like ="+Math.round((feelsLike-273))+"&deg C"
        let humidity=data.main.humidity
        hum.innerText=" Humidity="+humidity+"%"
        let pressure=data.main.pressure
        pres.innerText=" Pressure="+pressure+" pascal"
        let temp=data.main.temp
        t.innerHTML=" Temperatrure="+Math.round((temp-273))+"&deg C"
        let temp_max=data.main.temp_max
        max.innerHTML=" Max Temperature="+Math.round((temp_max-273))+"&deg C"
        let temp_min=data.main.temp_min
        min.innerHTML=" Min Temperature="+Math.round((temp_min-273))+"&deg C"

        modalDiv.innerText="";
        modalDiv.appendChild(feels);
        modalDiv.appendChild(hum);
        modalDiv.appendChild(pres);
        modalDiv.appendChild(t);
        modalDiv.appendChild(max);
        modalDiv.appendChild(min);

        console.log("Feels like ="+feelsLike+" humidity="+humidity+" Pressure="+pressure+" Temperatrure="+temp+" Max Temperature="+temp_max+" Max Temperature="+temp_min)
    })
   
    .catch()
}

function clear()
{
    let modalBody=document.getElementById('modal-body');
    modalBody.innerText="";
}