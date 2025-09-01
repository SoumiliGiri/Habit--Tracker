var date = new Date();
console.log(date);

var currentDay = date.getDay();
var currentDate = date.getDate();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();
console.log(currentDay);
console.log(currentDate);
console.log(currentMonth);
console.log(currentYear);

var months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

var topic  = document.getElementById("topic");
topic.innerHTML = months[currentMonth];

var habitTitle = document.getElementById("habit");
habitTitle.onclick = function(){
    let habit = prompt("What is your habit?",habitTitle.innerHTML);
    if(habit.length == 0){
        habitTitle.innerHTML = "Click to set your habit";
    }else{
        habitTitle.innerHTML = habit;
    }
};

var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
var daysInThisMonth = daysInMonth[currentMonth];

var daysCompleated = 0;
var totalDays = document.getElementById("totalDays");
totalDays.innerHTML = "0/"+daysInThisMonth;

var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName("days");

for (let i = 0; i < days.length; i++) {
    let day = days[i].getElementsByClassName("day"); // get .day elements from current row
    for (let j = 0; j < day.length; j++) {
        if (dayCount == currentDate - 1) {
            day[j].setAttribute("style", "border:2px solid black");
        }
        if (dayCount < daysInThisMonth) {
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id", "day" + (dayCount + 1));
            dayCount++;
        } else {
            day[j].innerHTML = "";
            day[j].setAttribute("style","background-color: white");
        }
    }
}

var compleate = new Array(31);
for(var i=0;i<dayCount;i++){
    var tempString = (i+1) + "-" + (currentMonth+1) + "-" + currentYear;
    console.log("Storing Date: "+tempString);
    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);
    if(tempDay == null || tempDay == "false"){
        localStorage.setItem(tempString, "false");
    }else if(tempDay == "true"){
        daysCompleated++;
    }
    totalDays.innerHTML = daysCompleated+"/"+daysInThisMonth;
}

console.log("compleated array: "+compleate);
console.log("Total days compleated: "+daysCompleated);

for(var i=0;i<currentDate;i++){
    var tempString = ""+(i+1)+"-"+(currentMonth)+"-"+(currentYear);
    console.log(tempString);

    var chosenDay = localStorage.getItem(tempString);
    console.log(i+1+": "+chosenDay);
    var chosenDayDiv = document.getElementById("day" + (i+1));
    if(chosenDay === "true"){
        chosenDayDiv.style.backgroundColor = "blue";
    }else if(chosenDay === "false"){
        chosenDayDiv.style.backgroundColor = "white";
    }
}

var dayDivs = document.querySelectorAll(".day");
for(var i=0;i<currentDate;i++){
    dayDivs[i].onclick = function(e){
        var num = e.target.innerText;
        var selectedDate = document.getElementById(e.target.id);
        var storageString = ""+num+"-"+(currentMonth+1)+"-"+currentYear;

        if(localStorage.getItem(storageString) === "false"){
            selectedDate.style.backgroundColor = "rgb(12, 183, 240)";
            localStorage.setItem(storageString, true);
            daysCompleated++;
        }else if(localStorage.getItem(storageString) === "true"){
            selectedDate.style.backgroundColor = "white";
            localStorage.setItem(storageString, false);
            daysCompleated--;
        }

        totalDays.innerHTML = daysCompleated + "/" + dayCount;
        console.log(daysCompleated, currentDate);

        if(daysCompleated === currentDate){
            alert("Great Progress");
        }
    }
}

var resetButton = document.getElementById("resetButton");
resetButton.onclick = function(){
    for(var i=0;i<dayCount;i++){
        var tempString = ""+(i+1)+"-"+(currentMonth+1)+"-"+currentYear;
        console.log(tempString);
        localStorage.setItem(tempString, "false");
        var curDay = document.getElementById("day"+(i+1));
        curDay.style.backgroundColor = "white";
    }
    daysCompleated = 0;
    totalDays.innerHTML = daysCompleated+"/"+daysInThisMonth;
};