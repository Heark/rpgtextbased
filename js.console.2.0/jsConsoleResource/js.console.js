onerror=handleErr
tabs = new Array("Log","Error","Trace","HTML","CSS","Script");
totError = 0;
/*----------The Object----------*/
function jsConsole(appName)
{
	/*---Methods---*/
	this.loadjsVariables = loadjsVariables;
	this.loadjsStruc = loadjsStruc;
	this.log = log;
	this.addTrace = addTrace;
	/*---Methods---*/

	this.loadjsVariables();
	this.loadjsStruc(appName);
}
function loadjsVariables()
{
	this.isDrag = 0;
	this.dragWhat = " "
	this.watched = new Array();
	this.dragX = 0;
	this.dragY = 0;
	this.totWatched = 0;
	this.open = 1;
	this.totLog = 1;
	this.totDiv = 1;
	this.totError = 1;
	this.tabs = new Array("Log","Error","Trace","HTML","CSS","Script");
}
function loadjsStruc(appName){
	var jsConsole = document.createElement("div");
	jsConsole.id="jsConsole";
	jsConsole.style.top= "20";
	jsConsole.style.left= "400";
	document.body.appendChild(jsConsole);
	jsConsole.innerHTML = "<h1 onmousedown='dragStart(this.id,event)' onmouseup='dragStop()' >"+appName+"</h1>";
	jsConsole.innerHTML += "<a href='#' onclick='jsClose()' class='close' title='Close Console'>&nbsp;</a>";
	jsConsole.innerHTML += "<a href='#' onclick='jsSemi()' class='hide' title='Hide Console'>&nbsp;</a>";
	jsConsole.innerHTML += "<a href='#' onclick='jsShow()' class='show' title='Show Console'>&nbsp;</a>";
	jsConsole.innerHTML += "<div id='jsTabs'></div>";
	jsConsole.innerHTML += '<div id="jsT"></div>';
	var jsTabs = document.getElementById('jsTabs');
	var jsT = document.getElementById('jsT');
	for (var i=0;i<=5 ;i++ )
	{
		jsTabs.innerHTML += '<div id="jsdiv'+this.tabs[i]+'" ><a href="#" onclick="showThis(this.innerHTML)" id="jsA'+this.tabs[i]+'">'+this.tabs[i]+'</a></div>';
		jsT.innerHTML += '<div id="jsT'+this.tabs[i]+'" style="display:none;"></div>';
	}
	document.getElementById('jsTLog').style.display = "";
	document.getElementById('jsdivLog').style.backgroundImage = 'url(jsConsoleResource/pix/activeTab.png)';
}
function showThis(what){
	for (var i=0;i<=5 ;i++ )	{
		document.getElementById('jsT'+tabs[i]).style.display = "none";
		document.getElementById('jsdiv'+tabs[i]).style.backgroundImage = 'url(jsConsoleResource/pix/inactiveTab.png)';
	}
	document.getElementById('jsT'+what).style.display = "";
	document.getElementById('jsdiv'+what).style.backgroundImage = 'url(jsConsoleResource/pix/activeTab.png)';
	if (what == "HTML")
	{
		getHTMLOf("document","jsTHTML");
	}
}
function log(logMess,type){
	if (type!= "info" && type!="warn")return;
	var where = document.getElementById("jsTLog");
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	var milli = currentTime.getMilliseconds();
	if (minutes < 10) minutes = "0" + minutes;
	logMess="<p id='jsLP"+this.totLog+"'><img src='jsConsoleResource/pix/icon-"+type+".gif' alt='"+type+"' style='padding: 0px'/><b>" + hours + ":" + minutes + ":" +seconds + ":"+milli+"</b> : "+logMess+"</p>";
	where.innerHTML = logMess + where.innerHTML;
	if (this.totLog%2==0)document.getElementById("jsLP"+this.totLog).style.backgroundColor = "#F1F5FA";
	this.totLog++;

}
function handleErr(msg,url,l){
	var where = document.getElementById("jsTError");
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	var milli = currentTime.getMilliseconds();
	if (minutes < 10) minutes = "0" + minutes;
	logMess = msg+" on "+l+" of "+url+"!";
	if (totError%2==0){
		logMess="<p id='jsLP"+totError+"' style='background-color:#F1F5FA;'><img src='jsConsoleResource/pix/icon-error.gif' alt='error' style='padding: 0px'/><b>" + hours + ":" + minutes + ":" +seconds + ":"+milli+"</b> : "+logMess+"</p>";
	}
	else
	{
		logMess="<p id='jsLP"+totError+"'><img src='jsConsoleResource/pix/icon-error.gif' alt='error' style='padding: 0px'/><b>" + hours + ":" + minutes + ":" +seconds + ":"+milli+"</b> : "+logMess+"</p>";
	}
	where.innerHTML = logMess + where.innerHTML;
	totError++;
	return true;
}
function addTrace(varName,varValue){
	flag=2455900;
	for (i=0;i<=this.totWatched ;i++ )
	{
		if (this.watched[i]==("jsTT"+varName)) flag=i;
	}
	if (flag!=2455900)
	{
		var it = document.getElementById("jsTT"+varName);
		it.innerHTML='<img src="jsConsoleResource/pix/icon-trace.png" alt="watch" style="padding: 0px"/><b>'+varName+'</b> : '+varValue+'<br>';
		con.log("I exist","warn");
	}
	else
	{
		var it = document.getElementById("jsTTrace");
		it.innerHTML+='<p id="jsTT'+varName+'"><img src="jsConsoleResource/pix/icon-trace.png" alt="watch" style="padding: 0px"/><b>'+varName+'</b> : '+varValue+'</p>';
		this.watched[i]="jsTT"+varName;
		var its = document.getElementById("jsTT"+varName);
		if (this.totWatched%2==0)its.style.backgroundColor="#F1F5FA";
		con.log(it.style.backgroundColor,"info");
		this.totWatched++;
	}
}
/*----------The Object----------*/

function dragStart(id,evObj){
	this.dragWhat=id;
	this.isDrag=1;
	var it = document.getElementById("jsConsole");
	var topVal=it.style.top;
	var topInt=new Array();
	topInt=topVal.split('p');
	var leftVal=it.style.left;
	var leftInt=new Array();
	leftInt=leftVal.split('p');
	this.dragY=parseInt(evObj.clientY+ document.body.scrollTop)-topInt[0];
	this.dragX=parseInt(evObj.clientX+ document.body.scrollLeft)-leftInt[0];
	it.style.top=evObj.clientY+ document.body.scrollTop - dragY;
	it.style.left=evObj.clientX+ document.body.scrollLeft - dragX;
}
function dragIt(evObj){
	if (this.isDrag!=1)return;
	var it = document.getElementById("jsConsole");
	it.style.top=evObj.clientY+ document.body.scrollTop - this.dragY;
	it.style.left=evObj.clientX+ document.body.scrollLeft - this.dragX;
}
function dragStop(){this.isDrag=0;}

function setTrans(id,opacity) {
    var object = document.getElementById(id).style;
    object.opacity = (opacity / 100);
    object.MozOpacity = (opacity / 100);
    object.KhtmlOpacity = (opacity / 100);
    object.filter = "alpha(opacity=" + opacity + ")";
}

function jsSemi(){
	setTrans("jsConsole",75);
}
function jsClose()
{
	document.getElementById('jsConsole').style.height = "23px";
}
function jsShow()
{
	document.getElementById('jsConsole').style.height = "350px";
}
function getHTMLOf(of,ins){
	var x=document.getElementById(of).getElementsByTagName("p");
	for (var i=0;i<x.length;i++)
	{ 
		alert(x[i]);
	}
}
function getCSSOf(of,ins){}