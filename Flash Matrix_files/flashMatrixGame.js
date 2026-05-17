function n(x){ return parseFloat($("#"+x).val()); }

var killTimeout,killTimeout1,tiempoInicial,pasadas,totalPasadas,modoJuego,selectedItems;
var ccg=0;
var t_ini;
var t_fin2;

var nt_t_ini, nt_t_fin, bLastNoTime, lastNoTimeArray=[], nt_pasadas;

etapa=0;

bStart=0;
cartasByFlash=0;

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

var ponerAnswer="";

function jugarRapid(fase){
	
	if(fase==1){
		bStart=!bStart;
		bConfig = 0;
		$("#start-btn").val("stop");
		$("#go-txt").html("stop");

		if(!bStart){
			$("#start-btn").val("start");
			clearTimeout(killTimeout); 
			clearTimeout(killTimeout1);
			$("#screen").html("");
			$("#go-txt").html("GO!");
			etapa=0;
			return;
		}

		etapa=1;
		ponerAnswer="";

		ccg = n("game");

		modoJuego=2;
		tamano=5;

		clearTimeout(killTimeout); 
		clearTimeout(killTimeout1);

		pasadas=0;

		totalPasadas = parseInt(arrayConfig[ccg].total);
		cartasByFlash = 1;
		
		selectedItems = [];

		for(i=0;i<totalPasadas;i++){

			selectedItems[i] = {};
			
			tam_x = parseInt(arrayConfig[ccg].matrix[i][0]);
			tam_y = parseInt(arrayConfig[ccg].matrix[i][1]);

			selectedItems[i].mostrar = [];

			for(j=0;j<tam_y;j++){

				selectedItems[i].mostrar[j]=[];

				for(k=0;k<tam_x;k++){
					selectedItems[i].mostrar[j][k]=_.random(0,1);		
				}
			}
		}

		if(noTime){
			lastNoTimeArray=[];
		}
		
		fase=2; 
		t_ini = Date.now();
	}

	tiempoInicial = arrayConfig[ccg].times[pasadas];

	tam_x  = parseInt(arrayConfig[ccg].matrix[pasadas][0]);
	tam_y = parseInt(arrayConfig[ccg].matrix[pasadas][1]);

	poner = `<table style="border-collapse: collapse; margin:auto;">`;

	for(i=0;i<tam_y;i++){

		poner += `<tr>`;

		for(j=0;j<tam_x;j++){

			myColor="white";

			if(selectedItems[pasadas].mostrar[i][j]==1){
				myColor="blue";
			}

			poner += `
				<td style="
					border: 1px solid black;
					background-color: ${myColor};
					width: 25px;
					height: 25px;
					min-width: 25px;
					min-height: 25px;
					padding: 0;
				">&nbsp;</td>
			`;
		}

		poner += `</tr>`;
	}

	poner += `</table>`;

	ponerAnswer += `
		<div style="display:inline-block; margin:10px; vertical-align:top;">
			<center><b>${pasadas}</b></center>
			${poner}
		</div>
	`;

	$("#screen").html(`
		<br><br>
		<center><b>${pasadas}</b></center>
		<br>
		<center>${poner}</center>
	`);

	if(!noTime){

		killTimeout = setTimeout(function(){

			t_fin2 = Date.now();

			$("#screen").html("");

			pasadas += cartasByFlash;

			if(pasadas >= totalPasadas){
				recall1();
				return;
			}

			killTimeout1 = setTimeout(function(){ 
				jugarRapid(2); 
			}, arrayConfig[ccg]._blankTime[pasadas-1]);

		}, tiempoInicial);

	}else{
		nt_t_ini = Date.now();
		bLastNoTime = 1;
	}
}

function jugarRapid222(fase){
	
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
			return;
		}

		etapa=1;
		ponerAnswer="";

		ccg = n("game");

		modoJuego=2;
		tamano=5;

		clearTimeout(killTimeout); clearTimeout(killTimeout1);

		pasadas=0;

		totalPasadas = parseInt(arrayConfig[ccg].total);
		cartasByFlash = 1;
		
		selectedItems = [];

		for(i=0;i<totalPasadas;i++){

			selectedItems[i] = {};
			
			tam_x = parseInt(arrayConfig[ccg].matrix[i][0]);
			tam_y = parseInt(arrayConfig[ccg].matrix[i][1]);

			selectedItems[i].mostrar = [];

			for(j=0;j<tam_y;j++){

				selectedItems[i].mostrar[j]=[];

				for(k=0;k<tam_x;k++){
					selectedItems[i].mostrar[j][k]=_.random(0,1);		
				}
			}
		}

		if(noTime){
			lastNoTimeArray=[];
		}
		
		fase=2; 
		t_ini = Date.now();
	}

	tiempoInicial = arrayConfig[ccg].times[pasadas];

	tam_x  = parseInt(arrayConfig[ccg].matrix[pasadas][0]);
	tam_y = parseInt(arrayConfig[ccg].matrix[pasadas][1]);

	poner = `<table style="border-collapse: collapse;">`;

	for(i=0;i<tam_y;i++){

		poner += `<tr>`;

		for(j=0;j<tam_x;j++){

			myColor="white";
			if(selectedItems[pasadas].mostrar[i][j]==1){
				myColor="blue";
			}

			myBorderColor="black";

			poner += `<td style="border: 1px solid black; background-color: ${myColor}; border-color: ${myBorderColor};" width="25px">&nbsp;</td>`;

		}
		poner += `</tr>`;
	}

	poner += `</table>`;

	cantidad_imagenes=parseInt(tam_y/2);

	poner="";

	console.log(tam_x);

	for(i=0;i<cantidad_imagenes;i++){
		if(tam_x==3){
			_r=_.random(0,99);

			if(casillerosLoad){
				__x=parseInt(_r%10);
				__y=parseInt(_r/10);

				poner+=`<img src="img/img_trans.gif" style="width: 64px; height: 64px; background: url(img/casillerosFull.jpg) ${__x*64}px ${__y*64}px; zoom:1;"> <br>`;

			}else{
				poner+=`<img src="casilleros/${_r}.jpg" width="64px" height="64px" title="${_r}"><br>`;
			}
		}else{
			_r=matrixBin8Img[_.random(0,255)];

			if(bin8Load){
				_r=_.random(0,255);
				__x=parseInt(_r%16);
				__y=parseInt(_r/16);

				poner+=`
					<img src="img/img_trans.gif" style="width: 64px; height: 63px; background: url(img/bin8Full.jpg) ${__x*64}px ${__y*64}px; zoom:1;"> 
				<br>`;

			}else{
				poner+=`<img src="Bin8/${_r}.jpg" width="64px" height="64px" title="${_r}"><br>`;
			}
		}
	}

	ponerAnswer+=`${pasadas+1}<br>${poner.split("<br>").join("&nbsp;")}<br>`;

	$("#screen").html(`<br><br><center><b>${pasadas+1}</b></center><br><center>${poner}</center>`);

	if(!noTime){
		killTimeout = setTimeout(function(){
			t_fin2 = Date.now();

			$("#screen").html("");

			pasadas+=cartasByFlash;

			if(pasadas>=totalPasadas){
				recall1();
				return;
			}

			console.log(arrayConfig[ccg]._blankTime[pasadas-1]+"-"+pasadas);
			killTimeout1 = setTimeout(function(){ jugarRapid(2); }, arrayConfig[ccg]._blankTime[pasadas-1]);

		}, tiempoInicial);
	}else{
		nt_t_ini = Date.now();
		bLastNoTime = 1;
	}
}

tamano = 10;

var arrayColors=["♠","♥","♦","♣"];
var arrayDirecciones=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

function recall1(){
	etapa = 2;
	recall = [];
	t_fin = Date.now();

	for (var i = 0; i < totalPasadas; i++) {
		recall[i] = {};
		recall[i].mostrar = [];

		tam_x = parseInt(arrayConfig[ccg].matrix[i][0]);
		tam_y = parseInt(arrayConfig[ccg].matrix[i][1]);

		for (var j = 0; j < tam_y; j++) {
			recall[i].mostrar[j] = [];
			for (var k = 0; k < tam_x; k++) {
				recall[i].mostrar[j][k] = 0;
			}
		}
	}

	var columnasRecall = tamano;
	if (typeof bMovil !== "undefined" && bMovil) {
		columnasRecall = 1;
	}
	columnasRecall = Math.max(1, parseInt(columnasRecall || 1));

	var poner = `
		<div style="padding:10px; text-align:center;">
			<input type="button" value="Answer corregir" id="answer1" style="font-size:18px; padding:10px; margin:5px;">
			<input type="button" value="Answer rápido" id="answerQuick" style="font-size:18px; padding:10px; margin:5px;">
			<div style="font-size:12px; opacity:.75; margin-top:4px;">
				Answer corregir compara tu recall. Answer rápido solo muestra la solución.
			</div>
		</div>
		<br>
		<table border="0" style="margin:auto; border-collapse:collapse;">
	`;

	var z = 0;

	while (z < totalPasadas) {
		poner += "<tr>";

		for (var j = 0; j < columnasRecall; j++) {
			if (z >= totalPasadas) {
				poner += `<td>&nbsp;</td>`;
				continue;
			}

			tam_x = parseInt(arrayConfig[ccg].matrix[z][0]);
			tam_y = parseInt(arrayConfig[ccg].matrix[z][1]);

			var grid = `<table style="border-collapse: collapse; margin:auto;">`;

			for (var y = 0; y < tam_y; y++) {
				grid += `<tr>`;

				for (var x = 0; x < tam_x; x++) {
					grid += `
						<td id="td-${z}-${y}-${x}" style="
							border: 1px solid black;
							background-color: white;
							width: 25px;
							height: 25px;
							min-width: 25px;
							min-height: 25px;
							padding: 0;
							cursor: pointer;
						" onclick="contestarDireccion(${x},${y},${z});">&nbsp;</td>
					`;
				}

				grid += `</tr>`;
			}

			grid += `</table>`;

			poner += `
				<td style="padding: 10px; vertical-align:top;">
					<center><b>${z}</b></center>
					<br>
					${grid}
				</td>
			`;

			z++;
		}

		poner += "</tr>";
	}

	poner += "</table>";

	$("#screen").html(poner);
	$("html, body").animate({ scrollTop: $(document).height() }, 300);

	$("#answer").off("click").on("click", answer);
	$("#answer1").off("click").on("click", answer);
	$("#answerQuick").off("click").on("click", answerQuick);
}

correctas = 0;
arrayCorrectas = [];

totalCuadros = 0;

function answerQuick(){
	etapa = 0;
	location.href = "#top";

	bStart = 0;
	$("#start-btn").val("start");
	$("#go-txt").html("GO!");

	$("#screen").html(`<br><br><center>${ponerAnswer}</center>`);
}

function answer(){
	etapa = 0;
	totalCuadros = 0;
	correctas = 0;

	location.href = "#top";

	var columnasResultado = tamano;
	if (typeof bMovil !== "undefined" && bMovil) {
		columnasResultado = 1;
	}
	columnasResultado = Math.max(1, parseInt(columnasResultado || 1));

	var poner = "<div id=\"stats\"></div><br><br><table border=\"0\" style=\"margin:auto; border-collapse:collapse;\">";

	var z = 0;

	while (z < totalPasadas) {
		poner += "<tr>";

		for (var j = 0; j < columnasResultado; j++) {
			if (z >= totalPasadas) {
				poner += `<td>&nbsp;</td>`;
				continue;
			}

			tam_x = parseInt(arrayConfig[ccg].matrix[z][0]);
			tam_y = parseInt(arrayConfig[ccg].matrix[z][1]);

			var tieneError = 0;
			var matrizOriginal = `<table style="border-collapse: collapse; margin:auto;">`;
			var matrizRecall = `<table style="border-collapse: collapse; margin:auto;">`;

			for (var y = 0; y < tam_y; y++) {
				matrizOriginal += `<tr>`;
				matrizRecall += `<tr>`;

				for (var x = 0; x < tam_x; x++) {
					var originalBit = selectedItems[z].mostrar[y][x] ? 1 : 0;
					var recallBit = recall[z].mostrar[y][x] ? 1 : 0;
					var borderColor = "black";

					if (originalBit === recallBit) {
						correctas++;
					} else {
						borderColor = "red";
						tieneError = 1;
					}

					var colorOriginal = originalBit ? "blue" : "white";
					var colorRecall = recallBit ? "blue" : "white";

					matrizOriginal += `
						<td style="
							border: 1px solid ${borderColor};
							background-color: ${colorOriginal};
							width: 25px;
							height: 25px;
							min-width: 25px;
							min-height: 25px;
							padding: 0;
						">&nbsp;</td>
					`;

					matrizRecall += `
						<td style="
							border: 1px solid ${borderColor};
							background-color: ${colorRecall};
							width: 25px;
							height: 25px;
							min-width: 25px;
							min-height: 25px;
							padding: 0;
						">&nbsp;</td>
					`;

					totalCuadros++;
				}

				matrizOriginal += `</tr>`;
				matrizRecall += `</tr>`;
			}

			matrizOriginal += `</table>`;
			matrizRecall += `</table>`;

			var bordeCaja = tieneError ? "red" : "green";

			poner += `
				<td style="padding: 10px; vertical-align:top;">
					<center><b>${z}</b></center>
					<div style="padding: 10px; border: 2px solid ${bordeCaja}; display:inline-block;">
						<div style="font-size:12px; text-align:center;">original</div>
						${matrizOriginal}
						<br>
						<div style="font-size:12px; text-align:center;">tu recall</div>
						${matrizRecall}
					</div>
				</td>
			`;

			z++;
		}

		poner += "</tr>";
	}

	poner += "</table>";

	bStart = 0;
	$("#start-btn").val("start");
	$("#go-txt").html("GO!");

	myDate = new Date();
	month = myDate.getMonth();
	fullYear = myDate.getFullYear();
	date = myDate.getDate();
	ponerFecha = (month + 1) + "/" + date + "/" + fullYear + "<br>";

	var porcent = totalCuadros ? (correctas * 100 / totalCuadros) : 0;
	var t_dif = t_fin2 - t_ini;

	$("#screen").html(poner);

	$("#stats").append(`
		<br><br>
		<div style="background-color:#3fad46; color:white; width:500px; max-width:95%; padding:10px; margin:auto;">
			You got ${correctas} out of ${totalCuadros} attempted! (${porcent.toFixed(2)}% accuracy) in ${getDuration(t_dif)}, ${ponerFecha}
		</div>
	`);
}

function contestarDireccion(x,y,z){

	recall[z].mostrar[y][x]=!recall[z].mostrar[y][x];

	myColor = "white";
	if(recall[z].mostrar[y][x]==1)
		myColor = "blue";

	$("#td-"+z+"-"+y+"-"+x).css("background-color",myColor);
}

function contestarColor(x,y,z){
	if(recall[x].color==y){
		$(".respuesta-color-class-"+x).css("border-color","white");
		recall[x].color="x";
		return;
	}

	$(".respuesta-color-class-"+x).css("border-color","white");

	$("#respuesta-color-id-"+x+"-"+z).css("border-color","black");
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

		if(etapa==1 && noTime){
			nt_t_fin =  Date.now();
			lastNoTimeArray[pasadas] = parseInt(nt_t_fin - nt_t_ini);

			t_fin2 = Date.now();

			$("#screen").html("");

			pasadas+=cartasByFlash;

			if(pasadas>=totalPasadas){
				recall1();
				return;
			}

			jugarRapid(2);
		}
	}
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

	if(etapa==1 && noTime){
		nt_t_fin =  Date.now();
		lastNoTimeArray[pasadas] = parseInt(nt_t_fin - nt_t_ini);

		t_fin2 = Date.now();

		$("#screen").html("");

		pasadas+=cartasByFlash;

		if(pasadas>=totalPasadas){
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

	units.forEach(function(u){
	    millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
	});

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