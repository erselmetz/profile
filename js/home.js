var d = new Date();
var myByear = 2004;
var currentYear = d.getFullYear();
var myAge = currentYear - myByear;
$('#age').text(myAge);
$('#age').counterUp({
    time: 1000
});