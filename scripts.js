var name = prompt("Please enter your name", "Lame Warrior");
var message = document.write
 message("Hi " + name + "!" )


 var classchoose = alert("Please choose your class")
 var on = true
 var off = false
 var userclass = prompt(name + "Please enter your class", " ");
 classchoose = on
 if(classchoose == on){
 message(" Classes: Paladin, Mage, and Cleric.")
 }
 if(userclass == "Paladin"){
  message("You're a Paladin!");
 }
 
 else if(userclass == "Mage"){
  message("You're a Mage!");
 }
 
 else if(userclass == "Cleric"){
  message("You're a Cleric!");
 }
 else{
  message("Class doesn't exist! Please try again.")
  var userclass = prompt(name + "Please enter your class", " ");
  

classchoose = off
var race = prompt("Please enter your race", "Human");
var gender = prompt("Please enter your gender", "Male");
 document.write("So you are " + name + " the " + gender + " " + race + " " + userclass + ".")

// Skills

var skills = this;
if(userclass == "Paladin")
var skill = Array["slice", "punch", "attack", "kick", "run", "Special"];
var basehp = 12
var basedef = 15
var baseagi = 20
var basemag = 0

else if(userclass == "Mage")
var skillM = Array["Punch", "Magic", "Run", "Special"]
var basehp = 14
var basedef = 10
var baseagi = 13
var basemag = 25

}

