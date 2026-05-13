bConfig=0; loadedConfigId=0; 
modo=1; // 1->modificar 2->nuevo
noTime=0;
reduceVelocityWhen=0;


function config(){
  bConfig = !bConfig;

  bStart=0;
  $("#start-btn").val("start");
  clearTimeout(killTimeout); clearTimeout(killTimeout1);
  $("#screen").html("");
  
  if(!bConfig){
    $("#screen").html("");
    return;
  }

  loadedConfigId=0; modo=1;

  menu = "";

  for(i=0;i<arrayConfig.length;i++){
    menu += `<a href="#" onclick="selectConfig(${i});">${arrayConfig[i].nombre}</a><br>`
  }
  menu +=  `<a href="#" onclick="newConfig();">+New</a><br>`


  //velocites

  velocidades = arrayConfig[0].times;

  velocities = "<table>";

  
  
  for(i=52;i<80;i++){
    velocidades[i]=350;
  }
  

  for(i=0;i<velocidades.length;i++){

    velocities += `<tr><td>${i+1} <input type="number" id="velocity-${i}" value="${velocidades[i]}" style="width: 60px;"></td></tr>`;


  }

  velocities +="</table>";

  nombre = arrayConfig[0].nombre;
  cartasByFlash = arrayConfig[0].cartasByFlash;
  total = arrayConfig[0].total;
  tiempoInicial =   arrayConfig[0].tiempoInicial;
  blankTime = arrayConfig[0].blankTime;

  selectedConfig=`
    name : <input type="text" value="${nombre}" id="nombre">  figuresByFlash: <input type="number" value="${cartasByFlash}" id="cartasByFlash"> <br>
    numberOfFigures : <input type="number" value="${total}" id="numberOfCards"> <!-- inicialTime: <input type="number" value="${tiempoInicial}" id="tiempoInicial"> -->  
    BlankTime: <input type="number" value="${blankTime}" id="blankTime"> <br>
    putSuggestedVelocities:
    <select id="suggested" style="width: 65px;" onchange="putSuggested();">
        <option value="1750" selected>1.75s</option>
        <option value="1700">1.7s</option>
        <option value="1650">1.65s</option>
        <option value="1600">1.6s</option>
        <option value="1550">1.55s</option>
        <option value="1500">1.5s</option>
        <option value="1450">1.45s</option>
        <option value="1400">1.4s</option>
        <option value="1350">1.35s</option>
        <option value="1300">1.3s</option>
        <option value="1250">1.25s</option>
        <option value="1200">1.2s</option>
        <option value="1150">1.15s</option>
        <option value="1100">1.1s</option>
        <option value="1050">1.05s</option>
        <option value="1000">1.0s</option>
        <option value="950">0.95s</option>
        <option value="900">0.9s</option>
        <option value="850">0.85s</option>
        <option value="800">0.8s</option>
        <option value="750">0.75s</option>
        <option value="700">0.7s</option>
        <option value="650">0.65s</option>
        <option value="600">0.6s</option>
        <option value="550">0.55s</option>
        <option value="500">0.5s</option>
        <option value="450">0.45s</option>
        <option value="400">0.4s</option>
        <option value="350">0.35s</option>
        <option value="300">0.3s</option>
        <option value="250">0.25s</option>
        <option value="200">0.2s</option>
        <option value="150">0.15s</option>
        <option value="100">0.1s</option>
      </select> 
      SetAllTo: <input type="number" value="1750" id="setAllValue"> <input type="button" value="ok" onclick="setAllToFunction()">
      <br>
      <input type="button" value="+" onclick="sumSelectFc(1)">
      <select id="sumSelect" style="width: 65px;">
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select> 
      <input type="button" value="--" onclick="sumSelectFc(0)">
      <input type="button" value="setNoTimeLastVelocities" onclick="setNoTimeLastVelocities()">
     <br><br>

    Velocities: <br>

    ${velocities}
  `;

  configScreen = `
    <table border="1">
      <tr>
        <td width="200px;" valign="top" style="margin-left:20px;">
          ${menu}   
        </td>
        <td width="800px;">
          <div style="float:right;">
            <input type="button" value="save" id="save" onclick="save();">
            <input type="button" value="delete" id="delete" onclick="del();">
          </div>
          <br>
          <div id="currentConfig">
            ${selectedConfig}
          </div>
          <br>
          <div style="float:right;">
            <input type="button" value="save" id="save1" onclick="save();">
            <input type="button" value="delete" id="delete1" onclick="del();">
          </div>
        </td> 
      </tr>
    </table>
  `;

  $("#screen").html(configScreen);

}

function selectConfig(x){
  loadedConfigId=x; modo=1;
  
  //velocites
  velocidades = arrayConfig[loadedConfigId].times;

  if(velocidades.length==52){
    for(i=52;i<80;i++){
      velocidades[i]=350;
    }
  }

  velocities = "<table>";

  for(i=0;i<velocidades.length;i++){
    velocities += `<tr><td>${i+1} <input type="number" id="velocity-${i}" value="${velocidades[i]}"  style="width: 60px;"></td></tr>`;
  }

  velocities +="</table>";

  nombre = arrayConfig[loadedConfigId].nombre;
  cartasByFlash = arrayConfig[loadedConfigId].cartasByFlash;
  total = arrayConfig[loadedConfigId].total;
  tiempoInicial =   arrayConfig[loadedConfigId].tiempoInicial;
  blankTime = arrayConfig[loadedConfigId].blankTime;

  selectedConfig=`
    name : <input type="text" value="${nombre}" id="nombre">  figuresByFlash: <input type="number" value="${cartasByFlash}" id="cartasByFlash"> <br>
    numberOfFigures : <input type="number" value="${total}" id="numberOfCards"> <!-- inicialTime: <input type="number" value="${tiempoInicial}" id="tiempoInicial"> --> 
    BlankTime: <input type="number" value="${blankTime}" id="blankTime"> 
    <br>
    putSuggestedVelocities:
    <select id="suggested" style="width: 65px;" onchange="putSuggested();">
        <option value="1750" selected>1.75s</option>
        <option value="1700">1.7s</option>
        <option value="1650">1.65s</option>
        <option value="1600">1.6s</option>
        <option value="1550">1.55s</option>
        <option value="1500">1.5s</option>
        <option value="1450">1.45s</option>
        <option value="1400">1.4s</option>
        <option value="1350">1.35s</option>
        <option value="1300">1.3s</option>
        <option value="1250">1.25s</option>
        <option value="1200">1.2s</option>
        <option value="1150">1.15s</option>
        <option value="1100">1.1s</option>
        <option value="1050">1.05s</option>
        <option value="1000">1.0s</option>
        <option value="950">0.95s</option>
        <option value="900">0.9s</option>
        <option value="850">0.85s</option>
        <option value="800">0.8s</option>
        <option value="750">0.75s</option>
        <option value="700">0.7s</option>
        <option value="650">0.65s</option>
        <option value="600">0.6s</option>
        <option value="550">0.55s</option>
        <option value="500">0.5s</option>
        <option value="450">0.45s</option>
        <option value="400">0.4s</option>
        <option value="350">0.35s</option>
        <option value="300">0.3s</option>
        <option value="250">0.25s</option>
        <option value="200">0.2s</option>
        <option value="150">0.15s</option>
        <option value="100">0.1s</option>
      </select> 
      SetAllTo: <input type="number" value="1750" id="setAllValue"> <input type="button" value="ok" onclick="setAllToFunction()">
      <br>
      <input type="button" value="+" onclick="sumSelectFc(1)">
      <select id="sumSelect" style="width: 65px;">
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select> 
      <input type="button" value="--" onclick="sumSelectFc(0)">
      <input type="button" value="setNoTimeLastVelocities" onclick="setNoTimeLastVelocities()">
    <br><br>

    Velocities: <br>

    ${velocities}
  `;

  $("#currentConfig").html(selectedConfig);

}

function newConfig(){

  loadedConfigId=-1; modo=2;
  
  //velocites

  velocities = "<table>";

  nt=1750;
  _n=nt;

  for(i=0;i<80;i++){

    if(i==3)
      _n = nt * 0.8;
    if(i==6)
      _n = nt * 0.6;
    if(i==9)
      _n = nt * 0.4;
    if(i==12)
      _n = nt * 0.2;


    velocities += `<tr><td>${i+1} <input type="number" id="velocity-${i}" value="${_n}"  style="width: 60px;"></td></tr>`;

  }

  velocities +="</table>";

  nombre = "";
  cartasByFlash = 1;
  total = 15;
  tiempoInicial =   100;
  blankTime = 200;

  selectedConfig=`
    name : <input type="text" value="${nombre}" id="nombre">  figuresByFlash: <input type="number" value="${cartasByFlash}" id="cartasByFlash"> <br>
    numberOfFigures : <input type="number" value="${total}" id="numberOfCards"> <!-- inicialTime: <input type="number" value="${tiempoInicial}" id="tiempoInicial"> --> 
    BlankTime: <input type="number" value="${blankTime}" id="blankTime"> 
    <br>
    putSuggestedVelocities:
    <select id="suggested" style="width: 65px;" onchange="putSuggested();">
        <option value="1750" selected>1.75s</option>
        <option value="1700">1.7s</option>
        <option value="1650">1.65s</option>
        <option value="1600">1.6s</option>
        <option value="1550">1.55s</option>
        <option value="1500">1.5s</option>
        <option value="1450">1.45s</option>
        <option value="1400">1.4s</option>
        <option value="1350">1.35s</option>
        <option value="1300">1.3s</option>
        <option value="1250">1.25s</option>
        <option value="1200">1.2s</option>
        <option value="1150">1.15s</option>
        <option value="1100">1.1s</option>
        <option value="1050">1.05s</option>
        <option value="1000">1.0s</option>
        <option value="950">0.95s</option>
        <option value="900">0.9s</option>
        <option value="850">0.85s</option>
        <option value="800">0.8s</option>
        <option value="750">0.75s</option>
        <option value="700">0.7s</option>
        <option value="650">0.65s</option>
        <option value="600">0.6s</option>
        <option value="550">0.55s</option>
        <option value="500">0.5s</option>
        <option value="450">0.45s</option>
        <option value="400">0.4s</option>
        <option value="350">0.35s</option>
        <option value="300">0.3s</option>
        <option value="250">0.25s</option>
        <option value="200">0.2s</option>
        <option value="150">0.15s</option>
        <option value="100">0.1s</option>
      </select> 
      SetAllTo: <input type="number" value="1750" id="setAllValue"> <input type="button" value="ok" onclick="setAllToFunction()">
      <br>
      <input type="button" value="+" onclick="sumSelectFc(1)">
      <select id="sumSelect" style="width: 65px;">
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select> 
      <input type="button" value="--" onclick="sumSelectFc(0)">
      <input type="button" value="setNoTimeLastVelocities" onclick="setNoTimeLastVelocities()">

    <br><br>

    Velocities: <br>

    ${velocities}
  `;


  $("#currentConfig").html(selectedConfig);

}

function save(){

  if(loadedConfigId==0){
    alert("This is the default config and can not be changed.");
    return;
  }

  lc=loadedConfigId; //!important

  nombre = $("#nombre").val();
  cartasByFlash = $("#cartasByFlash").val();
  total = $("#numberOfCards").val();
  blankTime = $("#blankTime").val();

  msj=""; bError=0;

  if(nombre.length<3){ msj+="Incorrect name length."; bError=1; }else{
    for(i=0;i<arrayConfig.length;i++){
      if(i!=loadedConfigId){
        if(arrayConfig[i].nombre==nombre){
          msj +="Repeated name.";
          bError=1;
          break;
        }
      }
    }
  }

  if(cartasByFlash<1 || cartasByFlash>3){
    msj+="\nQuantity of cards per flash most be in values (1 to 3)."
    bError=1;
  }

  if(total<1 || total>80){
    msj+="\nTotal Figures most be in values (1 to 80)."
    bError=1;
  }

  if(blankTime<0){
    msj+="\nBlankTime most be positive ."
    bError=1;
  }

  v=[];
  for(i=0;i<80;i++){
    v[i]=$("#velocity-"+i).val();

    if(v[i]<0){
      msj+="\nVelocity-"+(i+1)+" most be positive";
      bError=1;
    }
  }

  if(bError){ alert(msj); return; }

  if(modo==1){ //modif
    arrayConfig[loadedConfigId].nombre = nombre;
    arrayConfig[loadedConfigId].cartasByFlash = cartasByFlash;
    arrayConfig[loadedConfigId].total = total;
    arrayConfig[loadedConfigId].tiempoInicial = 1750;
    arrayConfig[loadedConfigId].blankTime = blankTime;

    for(i=0;i<80;i++){
      arrayConfig[loadedConfigId].times[i]=v[i];
    }

  }else{ //new
    nuevo = arrayConfig.length;
    arrayConfig[nuevo] = {};

    
    arrayConfig[nuevo].nombre = nombre;
    arrayConfig[nuevo].cartasByFlash = cartasByFlash;
    arrayConfig[nuevo].total = total;
    arrayConfig[nuevo].tiempoInicial = 1750;
    arrayConfig[nuevo].blankTime = blankTime;

    arrayConfig[nuevo].times = [];

    for(i=0;i<80;i++){  
      arrayConfig[nuevo].times[i]=v[i];
    }

    lc=nuevo;
  }
/*
  `Default|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350@Canola|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350`;
*/
  poner = "";
  for(i=0;i<arrayConfig.length;i++){
    fc="";
    if(i>0) fc="@";

    poner += fc+arrayConfig[i].nombre+"|"+arrayConfig[i].cartasByFlash+"|"+arrayConfig[i].total+"|"+arrayConfig[i].tiempoInicial+"|"+arrayConfig[i].blankTime+"|";

    for(j=0;j<80;j++){
      fc="-"
      if(j==79) fc="";
      poner+=j+" "+arrayConfig[i].times[j]+fc;
    }
  }

  configApp=poner;
  localStorage.setItem("configAppLocalStorageFC1", configApp);
  
  bConfig=0; loadConfig(); config(); selectConfig(lc);


}

function del(){

  if(loadedConfigId==0){
    alert("This is the default config and can not be changed.");
    return;
  }

  if(confirm("Do you want to delete this config?")){
    a = []; z=0;
    for(i=0;i<arrayConfig.length;i++){
      if(i!=loadedConfigId){
        a[z] = arrayConfig[i];
        z++;
      }
    }
    arrayConfig = a; 

    poner = "";

    for(i=0;i<arrayConfig.length;i++){
      fc="";
      if(i>0) fc="@";

      poner += fc+arrayConfig[i].nombre+"|"+arrayConfig[i].cartasByFlash+"|"+arrayConfig[i].total+"|"+arrayConfig[i].tiempoInicial+"|"+arrayConfig[i].blankTime+"|";

      for(j=0;j<80;j++){
        fc="-"
        if(j==79) fc="";
        poner+=j+" "+arrayConfig[i].times[j]+fc;
      }
    }

    configApp=poner;
    localStorage.setItem("configAppLocalStorageFC1", configApp);
    
    bConfig=0; loadConfig(); config();
  }
}


arrayConfig=[]

function loadConfig(){
  $("#game").html("");
  //str = `Default|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350@Canola|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350`;
  str = configApp;
  res = str.split("@");

  for(i=0;i<res.length;i++){
    str1 = res[i];
    res1 = str1.split("|");

    arrayConfig[i] = {};

    arrayConfig[i].nombre = res1[0];
    arrayConfig[i].cartasByFlash = res1[1];
    arrayConfig[i].total = res1[2];
    arrayConfig[i].tiempoInicial = res1[3];
    arrayConfig[i].blankTime = res1[4];

    str2 = res1[5];
    res2 = str2.split("-");

    arrayConfig[i].times = [];

    for(j=0;j<res2.length;j++){

      str3 = res2[j];
      res3 = str3.split(" ");

      arrayConfig[i].times[j] = res3[1];
    }

  }
 // console.log(arrayConfig);

  //cargo la config en el front-end

  for(i=0;i<arrayConfig.length;i++){
    $('#game').append($('<option>', {
      value: i,
      text: arrayConfig[i].nombre
    }));
  }

  //config();

}


//nombre cartas_x_flash total tiempo_inicial blank_time
defaultText=`Default|1|15|1750|200|0 1750-1 1750-2 1750-3 1400-4 1400-5 1400-6 1050-7 1050-8 1050-9 700-10 700-11 700-12 350-13 350-14 350-15 350-16 350-17 350-18 350-19 350-20 350-21 350-22 350-23 350-24 350-25 350-26 350-27 350-28 350-29 350-30 350-31 350-32 350-33 350-34 350-35 350-36 350-37 350-38 350-39 350-40 350-41 350-42 350-43 350-44 350-45 350-46 350-47 350-48 350-49 350-50 350-51 350-52 350-53 350-54 350-55 350-56 350-57 350-58 350-59 350-60 350-61 350-62 350-63 350-64 350-65 350-66 350-67 350-68 350-69 350-70 350-71 350-72 350-73 350-74 350-75 350-76 350-77 350-78 350-79 350`;

configApp=localStorage.getItem("configAppLocalStorageFC1");
//configApp = defaultText;

if(configApp==null){
  
  configApp=defaultText;
  localStorage.setItem("configAppLocalStorageFC1", configApp);
  
}else{
  //console.log(configApp);

}

loadConfig();

$(document).keypress(function(event) {
  
  console.log(event.charCode);
  if (event.charCode==100){

    //localStorage.removeItem('configAppLocalStorageFC1');
    //window.location.href= "/flashFiguresAndColors";
  }
  if (event.charCode==32){
    jugarRapid(1);
    event.preventDefault();

  }

});

function putSuggested(){

  nt=$("#suggested").val();
  var n=nt;

  for(i=0;i<80;i++){

    if(i==3)
      n = nt * 0.8;
    if(i==6)
      n = nt * 0.6;
    if(i==9)
      n = nt * 0.4;
    if(i==12)
      n = nt * 0.2;

    if(n<121){
      n=120;
    }

    $("#velocity-"+i).val(parseInt(n));
  }

}

function setAllToFunction(){

  var n=$("#setAllValue").val();
  

  for(i=0;i<80;i++){

    $("#velocity-"+i).val(parseInt(n));
  }

}

function setNoTimeLastVelocities(){

  if(bLastNoTime){
    for(i=0;i<lastNoTimeArray.length;i++){
    
      if (lastNoTimeArray[i] == null){
          lastNoTimeArray[i] = 0;
      }
    

      $("#velocity-"+i).val(lastNoTimeArray[i]);
    }
  }else{

    alert("NoTime is not used in this session.")
  }
}

function sumSelectFc(x){

  var n=parseInt($("#sumSelect").val());

  if(!x)
    n=-n;

  
  for(i=0;i<80;i++){
    __vel = parseInt($("#velocity-"+i).val());

    if(__vel+n>0){
      __vel += n;
      $("#velocity-"+i).val(__vel); 
    }

  }
}
/*
setTimeout(function(){
  poner="";
  nt=1750;
  n=nt;
  for(i=0;i<80;i++){

    if(i==3)
      n = nt * 0.8;
    if(i==6)
      n = nt * 0.6;
    if(i==9)
      n = nt * 0.4;
    if(i==12)
      n = nt * 0.2;

    poner += i+" "+parseInt(n)+"-";
  }

  $("#screen").html(poner);



},5000);

*/


function n(x){ return parseFloat($("#"+x).val()); }

var killTimeout,killTimeout1,tiempoInicial,pasadas,totalPasadas,modoJuego,selectedItems;
var ccg=0;
var t_ini;
var t_fin2;

var nt_t_ini, nt_t_fin, bLastNoTime, lastNoTimeArray=[], nt_pasadas;

etapa=0;

bStart=0;
cartasByFlash=0;

arrayColors=["000000","974b00","ff0000","ff8c55","fff200","00ff00","0000ff","800080","808080","ffffff"];
arrayColors1=["000000","974b00","ff0000","ff8c55","fff200","00ff00","0000ff","800080","808080","ffffff"];

var plusInfinity=0;

var myInfinityTime=0;

  /*
    if(pasadas>=3 && pasadas<6)
      t = (arrayConfig[ccg].times[0]+plusInfinity) * 0.8;
    if(pasadas>=6 && pasadas<9)
      t = (arrayConfig[ccg].times[0]+plusInfinity) * 0.6;
    if(pasadas>=9 && pasadas<12)
      t = (arrayConfig[ccg].times[0]+plusInfinity) * 0.4;
    if(pasadas>=12)
      t = (arrayConfig[ccg].times[0]+plusInfinity) * 0.2;

    */

function putInfinityVelocity(){
    
    //if(pasadas>=0 && pasadas<3)
    t = (arrayConfig[ccg].times[0]+plusInfinity);

    if(plusInfinity==0) return;

    $("#velocity-infinity").html("<center>"+t+"</center>");

    setTimeout(function(){ $("#velocity-infinity").html(""); },400);


}

//no time
function nttt(){
  if(noTime){
    
    $("#next-btn").css("width","50%");
    $("#go-btn").css("width","50%");
    
    //$("#go-btn").css("border-style","solid");

  }else{
    $("#next-btn").css("width","0px");
    $("#go-btn").css("width","100%");
  }
}

pasadasInfinity=0;
advancePasadasInfinity=0;
advancePlusInfinity=0;

function updateInfinity(){

  pasadasInfinity=0;
  advancePasadasInfinity=n("advance-pasadas-infinity")
  advancePlusInfinity=n("advance-plus-infinity")

}


limitVelocity=0;
bDirection=0;
multiplicador1=1;
tricky=0;

myR=0;
globalPasadas=-1;


function jugarRapid(fase){
  
  if(fase==1){
    bStart=!bStart;
    bConfig = 0;
    $("#start-btn").val("stop");
    $("#go-txt").html("stop");

    if(!bStart){
      $("#start-btn").val("start");
      clearTimeout(killTimeout); clearTimeout(killTimeout1);
      $("#screen").html("");
      $("#go-txt").html("GO!");
      etapa=0;
      $("#footer").hide();
      return;


    }

    myPalabras=_.shuffle(window.palabras);


    etapa=1;

    globalPasadas++;
    myR= n("myR")


    ccg = n("game");

    modoJuego=2;
    tamano=5;

    clearTimeout(killTimeout); clearTimeout(killTimeout1);

    pasadas=0;

    totalPasadas = parseInt(arrayConfig[ccg].total);
    //console.log(totalPasadas);
    cartasByFlash = parseInt(arrayConfig[ccg].cartasByFlash);

    
    myArray = _.range(0,10);
    myArray = myArray.concat(_.range(30,100));
    myArray = _.shuffle(myArray);

    tricky=n("tricky");

    if(globalPasadas%myR==0 || !bInfinity){

      selectedItems = [];

      for(i=0;i<120;i++){

      selectedItems[i] = {};
      
      if(i>80){
        selectedItems[i].mostrar = "1";
        selectedItems[i].txt = "A";
        selectedItems[i].color = "X";
        continue;

      }

      if(tricky!=0 && _.random(1,100)<=tricky && i>=1 && i<15){


        _r=_.random(1,2)
        if(i==1) _r=1

        selectedItems[i]=_.extend(selectedItems[i-_r]);
        console.log("tricky "+_r)

        continue;
      }

      __p=myArray[i]+"";
      if(myArray[i]<10)
        __p="0"+myArray[i];

      selectedItems[i].mostrar = __p;

      selectedItems[i].color = arrayColors[parseInt(__p[1])];
      selectedItems[i].txt = parseInt(__p[0]);

      //var arrayColors=["♠","♥","♦","♣"];

      //arrayColors=["000000","974b00","ff0000","ff8c55","fff200","00ff00","0000ff","800080","808080","ffffff"];

      /*
      if(myArray[i]<14){selectedItems[i].color = "♥"; }
      if(myArray[i]>13 && myArray[i]<27 ){selectedItems[i].color = "♠"; }
      if(myArray[i]>26 && myArray[i]<40 ){selectedItems[i].color = "♦"; }
      if(myArray[i]>39){selectedItems[i].color = "♣"; }

      if(myArray[i]<11)
        selectedItems[i].txt = myArray[i];

      if(myArray[i]>13 && myArray[i]<24)
        selectedItems[i].txt = myArray[i]-13;

      if(myArray[i]>26 && myArray[i]<37)
        selectedItems[i].txt = myArray[i]-26;

      if(myArray[i]>39 && myArray[i]<50)
        selectedItems[i].txt = myArray[i]-39;

      //A
      if(myArray[i]==1 || myArray[i]==14 || myArray[i]==27 || myArray[i]==40) selectedItems[i].txt="A";
      //j 11 24 37 50
      if(myArray[i]==11 || myArray[i]==24 || myArray[i]==37 || myArray[i]==50) selectedItems[i].txt="J";
      //q
      if(myArray[i]==12 || myArray[i]==25 || myArray[i]==38 || myArray[i]==51) selectedItems[i].txt="Q";
      //k
      if(myArray[i]==13 || myArray[i]==26 || myArray[i]==39 || myArray[i]==52) selectedItems[i].txt="K";

      if(i<totalPasadas){
        //console.log(selectedItems[i].color + " " + selectedItems[i].txt);
      }

      //selectedItems[i].color = myArray[i];
      //selectedItems[i].txt = myArray[i];
      */
      } 

    }


    if(noTime){
      lastNoTimeArray=[]
    }
    
    fase=2; t_ini = Date.now();

    if(bInfinity) $("#footer").show(); else $("#footer").hide();
    if(bInfinity){

      //for(i=0;i<15;i++){
        arrayConfig[ccg].times[0]=parseInt(arrayConfig[ccg].times[0])
        advancePasadasInfinity=n("advance-pasadas-infinity")
        advancePlusInfinity=n("advance-plus-infinity")

      //}
    }

    limitVelocity=n("limitVelocity");

     _x=0; 
     for(i=6;i<=11;i++){
      break;
      selectedItems[i].mostrar=myPalabras[_x];
      _x++;
      
      }

      console.log(selectedItems)
    

  }//fase==1

  

  if(plusInfinity!=0){

    if(pasadas>=0 && pasadas<3)
      tiempoInicial = (arrayConfig[ccg].times[0]+plusInfinity);
    if(pasadas>=3 && pasadas<6)
      tiempoInicial = (arrayConfig[ccg].times[0]+plusInfinity) * 0.8;
    if(pasadas>=6 && pasadas<9)
      tiempoInicial = (arrayConfig[ccg].times[0]+plusInfinity) * 0.6;
    if(pasadas>=9 && pasadas<12)
      tiempoInicial = (arrayConfig[ccg].times[0]+plusInfinity) * 0.4;
    if(pasadas>=12)
      tiempoInicial = (arrayConfig[ccg].times[0]+plusInfinity) * 0.2;
  }else{
    tiempoInicial = arrayConfig[ccg].times[pasadas];

  }


  myColor="black";

  put1=""
  put2=""
  if(pasadas==12 && bInfinity){
    // put1="["
    // put2="]"
  }


 
  _img=selectedItems[pasadas].mostrar.replace("png","jpg")
  if(_img.charAt(0)=="0") _img=_img.substr(1);
   console.log(_img)



  if(cartasByFlash==1){

     if(pasadas>=6 && pasadas<=11 && 0){
        _img=selectedItems[pasadas].mostrar;
        _img=`<img src="figuras/${selectedItems[pasadas].mostrar}.png">`;

         $("#screen").html(`<br><center><span style="color: ${myColor}"><b><!--${put1}${pasadas+1}${put2}--></b></span></center><br><center><b>${_img}</b></center>`);

      }else{
        /*
    _r=parseInt(_img);
    __x=parseInt(_r%10);
    __y=parseInt(_r/10);
    $("#screen").html(`<br><center><span style="color: ${myColor}"><b><!--${put1}${pasadas+1}${put2}--></b></span></center><br><center>
      <img src="img/img_trans.gif" style="width: 64px; height: 64px; background: url(img/casillerosFull.jpg) ${__x*64}px ${__y*64}px; zoom:1;">
      <!--<img src="casilleros/${_img}.jpg" width="128" height="128">-->
      </center>`);*/

           _img=`<img src="figuras/${selectedItems[pasadas].mostrar}.png">`;

         $("#screen").html(`<br><center><span style="color: ${myColor}"><b><!--${put1}${pasadas+1}${put2}--></b></span></center><br><center><b>${_img}</b></center>`);

    //$("#screen").html(`<br><center><span style="color: ${myColor}"><b>${put1}${pasadas+1}${put2}</b></span></center><br><center><img src="casilleros/${selectedItems[pasadas].mostrar}.png"></center>`);
    }
  }
  if(cartasByFlash==2){
    _p1=`<img src="figuras/${selectedItems[pasadas].mostrar}.png">`;
    _p2="";
    if(pasadas+1<totalPasadas)
      _p2=`<img src="figuras/${selectedItems[pasadas+1].mostrar}.png">`;

    $("#screen").html(`<br><br><center><b>${pasadas+1}</b></center><br><center><span>${_p1}</span>&nbsp;<span>${_p2}</span></center>`);
  }
  if(cartasByFlash==3){
    _p1=`<img src="figuras/${selectedItems[pasadas].mostrar}.png">`;
    _p2="";
    if(pasadas+1<totalPasadas)
      _p2=`<img src="figuras/${selectedItems[pasadas+1].mostrar}.png">`;
    _p3="";
    if(pasadas+2<totalPasadas)
      _p3=`<img src="figuras/${selectedItems[pasadas+2].mostrar}.png">`;

    $("#screen").html(`<br><br><center><b>${pasadas+1}</b></center><br><center><span>${_p1}</span>&nbsp;<span>${_p2}</span><span>${_p3}</span></center>`);
  }

  if(!noTime){
    killTimeout = setTimeout(function(){
      t_fin2 = Date.now();

      $("#screen").html("");

      pasadas+=cartasByFlash;

      //console.log(pasadas);
      //console.log(totalPasadas);

      maxPasadasInfinity=n("max-pasadas-infinity");
      if(bInfinity && pasadas==maxPasadasInfinity){

         reduceVelocityWhen=n("reduceVelocityWhen")

         multiplicador=1;   
         if( (arrayConfig[ccg].times[0]+plusInfinity) <= reduceVelocityWhen) 
          multiplicador=0.5;

         pasadasInfinity++;

        if(pasadasInfinity!=0 && pasadasInfinity%advancePasadasInfinity==0){

          if( (arrayConfig[ccg].times[0]+plusInfinity) >= arrayConfig[ccg].times[0] && !bDirection){
             multiplicador1=1; 
             bDirection=1;
             console.log("aumenta v")
          } 

          if( (arrayConfig[ccg].times[0]+plusInfinity) <= limitVelocity && bDirection){
             multiplicador1=-1; 
             bDirection=0;
             console.log("disminuye v")
          }    
          if(!bDirection) multiplicador = 1
          
          plusInfinity+=(n("advance-plus-infinity") * multiplicador * multiplicador1)


          console.log( (n("advance-plus-infinity") * multiplicador * multiplicador1) + " - " + reduceVelocityWhen + " - " + tiempoInicial )

          setTimeout(function(){ putInfinityVelocity(); },n("delay-infinity")*0.66);

        }


        setTimeout(function(){ jugarRapid(1); jugarRapid(1); },n("delay-infinity"));

        return;


      }

      if(pasadas>=totalPasadas){

        //$("#screen").append("<br><br><center><input type=\"button\" value=\"Recall\" id=\"recall\"></center>");

        recall1();

        return;
      }

      killTimeout1 = setTimeout(function(){ jugarRapid(2); }, arrayConfig[ccg].blankTime);

    }, tiempoInicial);
  }else{ //noTime
    nt_t_ini = Date.now();
    bLastNoTime = 1;
  }

}

tamano = 10;


var arrayDirecciones=["09","39","49","59","69","79","89","99"];

function recall1(){
  etapa=2;

  recall = []; t_fin = Date.now();
  for (var i = 0; i < 120; i++) {
      recall[i]={};
      recall[i].txt="x";
      recall[i].color="x";
  };

  //selectedItemsRnd = selectedItems.slice();
  //selectedItemsRnd = selectedItemsRnd.sort(function() {return Math.random() - 0.5});
  /*
  poner2 = "<table border=\"0\">";
  z=0;
  for(i=0;i<tamano;i++){
    recall[z] = "#FFFFFF";  
    poner2 += "<tr>";

    for(j=0;j<tamano;j++){

      idRnd = selectedItemsRnd[z];

      //poner2 += "<td><div class=\"dropdown\"><a href=\"#\" class=\"dropbtn\" style=\"text-decoration: none;\"><div style=\"background-color: " + colores[idRnd][1] + "; width: 30px; height: 30px;  z-index: 90;\" onclick=\"contestar(fff,'" + colores[idRnd][1] + "');\" title=\"" + colores[idRnd][0] + "\">&nbsp;</div></a><div class=\"dropdown-content\" style=\"z-index: 100; display:none;\"></div></div></td>";


      z++;
    }
    poner2 += "</tr>";
  }
  poner2 += "</table>";
  */

  poner2=`<div>`;

  for (var i = 0; i < arrayColors.length; i++) {

    bgColor=arrayColors[i];

    dv=""; dv1="";
    if(bgColor=="ffffff"){
      dv=`<div style="border-style: solid; border-width: 0.1px; float: left; opacity: 0.25;">`;
      dv1="</div>";
    }
    

    poner2+=`${dv}<div class="respuesta-color-class-zzz" id="respuesta-color-id-zzz-${i}" style="background-color: #${bgColor}; width:20px; height:20px; float: left; border-style: solid; border-width: 2px; border-color: white;" onclick="contestarColor(zzz,'${_.lastIndexOf(arrayColors,arrayColors[i])}','${i}');">&nbsp;</div>${dv1}`;
  };
  poner2+=`<br><div style="clear: both"></div>`;
  for (var i = 0; i < arrayDirecciones.length; i++) {
    poner2+=`<div class="respuesta-txt-class-zzz" id="respuesta-txt-id-zzz-${i}"  style="width: 20px; height:20px; float: left; border-style: solid; border-width: 2px;  border-color: white;" onclick="contestarDireccion(zzz,'${arrayDirecciones[i][0]}','${i}');"><img src="figuras/${arrayDirecciones[i]}.png" style="zoom: 0.2;"></div>`;
  };

  poner2+= `<br></div>`;

  poner = "<input type=\"button\" value=\"Answer\" id=\"answer1\"><br><br><table border=\"1\" style=\"border: 1px solid gray;  border-collapse: collapse;\">";

  z=0;
  for(i=0;i<30;i++){
    if(z>=totalPasadas){
      continue;
    }
    poner += "<tr>";

    if(bMovil){
      tamano=3;
    }

    for(j=0;j<tamano;j++){

      poner3 = poner2;
      poner3 = poner3.replace(/zzz/g,z);
      //console.log(poner3);


      if(modoJuego==1){
        poner += `<td><center>${z+1}</center>  <br> ${poner3}</td>`;


      }else{
        if(z>=totalPasadas){
          poner += `<td>&nbsp;</td>`;

        }else{
          poner += `<td><center>${z+1}</center> <br> ${poner3}</td>`;
        }
      }
      
      z++;
    }
    poner += "</tr>";
  }
  poner += "</table>";
  
  //$("#screen").html(poner);
  $("#screen").html(poner);
  $("#screen").append("<br><input type=\"button\" value=\"Answer\" id=\"answer\">");
  //$("html, body").animate({ scrollTop: $(document).height() }, 1000);

  $("#answer").click(answer);
  $("#answer1").click(answer);
  //$("#screen").html("");

  $("#start-btn").val("start");
  clearTimeout(killTimeout); clearTimeout(killTimeout1);
  //$("#screen").html("");
  $("#go-txt").html("GO!");
  etapa=0;
  $("#footer").hide();
  bStart=0;
}

correctas = 0;

function answer(){
  etapa = 0;

  location.href = "#top";

  z=0; correctas=0;
  poner = "<div id=\"stats\"></div><br><br><table border=\"0\">";

  for(i=0;i<30;i++){
   
    if(z>=totalPasadas){
      continue;
    }
    
    poner += "<tr>";

    if(bMovil){
      tamano=3;
    }

    for(j=0;j<tamano;j++){

      border = "";
      //idSelectedItem = selectedItems[z];

      border = " border: 1px solid green;";
      //console.log(arrayImages[recall[z].color]);
      if(selectedItems[z].color!=arrayColors[recall[z].color] || selectedItems[z].txt+""!=recall[z].txt+""){
        border = " border: 1px solid red;";

        if(modoJuego==1){
          poner += "<td>" +
              "<div style=\"width 32px; height: 30px !important; " + border + "\">" +
                "<div style=\"color: #" + selectedItems[z].color + "; width: 20px; height: 40px;  float: left; font-size: 20px;\">" + selectedItems[z].txt + "</div>" + 
                "<div style=\"color: #" + recall[z].color + "; width: 20px; height: 40px; float: left; font-size: 20px;\">" + recall[z].txt + "</div>" +
              "</div>" + 
            "</td>";


        }else{

            if(z>=totalPasadas){
              poner += `<td>&nbsp;</td>`;

            }else{
              bgColor="black";
              if(selectedItems[z].color=="♥" || selectedItems[z].color=="♦")
                bgColor="red";

              bgColor1="black";
              if(recall[z].color=="♥" || recall[z].color=="♦")
                bgColor1="red";

              console.log(recall[z].txt+"-"+recall[z].color);

              poner += "<td>" +
                "<center>" + (z+1) + "</center><br>" +  
                  "<div style=\"width 32px; height: 30px !important; " + border + "\">" +
                    "<div style=\"color: " + bgColor + "; width: 25px; height: 80px;  float: left; font-size: 16px;\">" + `<img src="figuras/${selectedItems[z].mostrar}.png"  style="zoom: 0.2; margin-top: 15px;">` + "</div>" + 
                    "<div style=\"color: " + bgColor1 + "; width: 25px; height: 80px; float: left; font-size: 16px;\">" + `<img src="figuras/${recall[z].txt+""+recall[z].color}.png"  style="zoom: 0.2; margin-top: 15px;">` +  "</div>" +
                  "</div>" + 
                "</td>";


            }
        }
        

      }else{
        

        if(modoJuego==1){
          correctas++;

          poner += "<td>" +
                "<div style=\"width 32px; height: 30px !important; " + border + "\">" +          
                  "<div style=\"color: #" + recall[z].color + "; width: 40px; height: 40px; float: left; font-size: 20px;\"><center>" + recall[z].txt + "</center></div>" +
                "</div>" + 
              "</td>";
        }else{
          if(z>=totalPasadas){
              poner += `<td>&nbsp;</td>`;

            }else{
              correctas++;

              bgColor1="black";
              if(recall[z].color=="♥" || recall[z].color=="♦")
                bgColor1="red";

              poner += "<td>" +
               "<center>" + (z+1) + "</center><br>" + 
                "<div style=\"width 32px; height: 30px !important; " + border + "\">" +          
                  "<div style=\"color: " + bgColor1 + "; width: 50px; height: 80px; float: left; font-size: 16px;\"><center>" + `<img src="figuras/${recall[z].txt+""+recall[z].color}.png" style="zoom: 0.2; margin-top: 15px;">` +  "</center></div>" +
                "</div>" + 
              "</td>";

            }
        }
      }

      z++;
    }//for j
    poner += "</tr>";
  }//for i
  poner += "</table>";

  bStart=0;
  $("#start-btn").val("start");
  $("#go-txt").html("GO!");

  myDate =  new Date();
  month = myDate.getMonth(); fullYear = myDate.getFullYear(); day = myDate.getDay(); date = myDate.getDate(); year = myDate.getYear();
  ponerFecha = (month+1) + "/" + date + "/" + fullYear + "<br>";

  if(modoJuego==1){

    tt = (parseInt(tamano)*parseInt(tamano));
    porcent = correctas * 100 / tt; 

    t_dif = t_fin - t_ini;

    $("#screen").html(poner);
    $("#screen").append("<br><br><div style=\"background-color: #3fad46; color:white; width 500px;\">You got " + correctas + " out of " + tt + " attempted! (" + porcent.toFixed(2)  + "% accuracy) in " + getDuration(t_dif) + ", " + ponerFecha +  "</div>");
    // $("#screen").append("<br><input type=\"button\" value=\"Agregar al Ranking\" id=\"addRank\">");

  }else{

    tt = (parseInt(tamano)*parseInt(tamano));
    porcent = correctas * 100 / totalPasadas; 

    t_dif = t_fin2 - t_ini;

    $("#screen").html(poner);

    //$("#screen").append("<br><br><div style=\"background-color: #3fad46; color:white; width 500px;\">You got " + correctas + " out of " + totalPasadas + " attempted! (" + porcent.toFixed(2)  + "% accuracy) in " + getDuration(t_dif) + ", " + ponerFecha +  "</div>");
    
    $("#stats").append("<br><br><div style=\"background-color: #3fad46; color:white; width 500px;\">You got " + correctas + " out of " + totalPasadas + " attempted! (" + porcent.toFixed(2)  + "% accuracy) in " + getDuration(t_dif) + ", " + ponerFecha +  "</div>");
    // $("#screen").append("<br><input type=\"button\" value=\"Agregar al Ranking\" id=\"addRank\">");

  }
}


function contestarDireccion(x,y,z){

  if(recall[x].txt==y){
    $(".respuesta-txt-class-"+x).css("border-color","white");
    recall[x].txt="x";
    return;
  }

  //console.log(x + " = " + y);
  //$("#respuesta"+x).css("background-color",y);
  $(".respuesta-txt-class-"+x).css("border-color","white");

  $("#respuesta-txt-id-"+x+"-"+z).css("border-color","black");
  recall[x].txt=y;
}

function contestarColor(x,y,z){
  if(recall[x].color==y){
    $(".respuesta-color-class-"+x).css("border-color","white");
    recall[x].color="x";
    return;
  }

  //console.log(x + " = " + y);
  $(".respuesta-color-class-"+x).css("border-color","white");

  $("#respuesta-color-id-"+x+"-"+z).css("border-color","black");
  //$("#respuesta"+x).css("background-color",y);
  recall[x].color=y;
  
}

$(document).keydown(function(event) {
  
  if (event.which==39){

    if(etapa==0){

      noTime=1;
      $("#noTime").prop( "checked", true );

      $("#next-btn").css("width","50%");
      $("#go-btn").css("width","50%");

      jugarRapid(1);

      return;

    }

    //nextCard
    if(etapa==1 && noTime){
      nt_t_fin =  Date.now();
      lastNoTimeArray[pasadas] = parseInt(nt_t_fin - nt_t_ini);

      t_fin2 = Date.now();

      $("#screen").html("");

      

      pasadas+=cartasByFlash;

      if(pasadas>=totalPasadas){
        alert()

        $("#screen").append("<br><br><center><input type=\"button\" value=\"Recall\" id=\"recall\"></center>");

        recall1();

        return;
      }


      jugarRapid(2);


    }//etapa==1

    
  }//event
});

function next(){
  if(etapa==0){

      noTime=1;
      $("#noTime").prop( "checked", true );

      $("#next-btn").css("width","50%");
      $("#go-btn").css("width","50%");

      jugarRapid(1);

      return;

  }


  //next
  if(etapa==1 && noTime){
    nt_t_fin =  Date.now();
    lastNoTimeArray[pasadas] = parseInt(nt_t_fin - nt_t_ini);

    t_fin2 = Date.now();

    $("#screen").html("");

    pasadas+=cartasByFlash;

    if(pasadas>=totalPasadas){

      //$("#screen").append("<br><br><center><input type=\"button\" value=\"Recall\" id=\"recall\"></center>");

      recall1();

      return;
    }

    jugarRapid(2);

  }

}

var getDuration = function(millis){
  var dur = {};
  var units = [
      {label:"millis",    mod:1000},
      {label:"seconds",   mod:60},
      {label:"minutes",   mod:60},
      {label:"hours",     mod:24},
      {label:"days",      mod:31}
  ];
  // calculate the individual unit values...
  units.forEach(function(u){
      millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
  });
  // convert object to a string representation...
  var nonZero = function(u){ return dur[u.label]; };
  dur.toString = function(){
      return units
          .reverse()
          .filter(nonZero)
          .map(function(u){
              return dur[u.label] + " " + (dur[u.label]==1?u.label.slice(0,-1):u.label);
          })
          .join(', ');
  };
  return dur;
};

