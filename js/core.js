import Metz from './metz.js';

let $ = new Metz();

var main = document.getElementById('main');
var home = document.querySelector('.home');
var project = document.querySelector('.project');
var about = document.querySelector('.about');
var navbar = document.querySelector('#navbar');

function sendMail(){

    var from_name = document.getElementById('from_name');
    var from_email = document.getElementById('from_email');
    var message = document.getElementById('message');
    var message_status = document.querySelector('.message-status');

    message_status.innerHTML = 'Sending!!';

    var tempParams = {
        from_name: from_name.value,
        from_email: from_email.value,
        message: message.value,
    };

    emailjs.send('service_mym8wyj','template_zgc8t6b',tempParams)
    .then(function(res){
        console.log('success',res.status);
        from_name.value = '';
        from_email.value = '';
        message.value = '';
        message_status.innerHTML = "&#10003; message sent!!";
    },function(error){
        alert('Error Sending Message!!',error);
    });
}

function loadHome(){
    fetch('home.html').then((response)=>{
        return response.text();
    }).then(function(data){
        main.innerHTML = data;

        $.animateText({
            text: 'Backend Web Developer',
            id: 'sub',
        },100);

        $.animateColor({
            color: 'random',
            id: 'card',
            type:'border'
        },1000);

        $.animateColor({
            color: 'random',
            id: 'sub',
            type:'text'
        },500);

        $.counterUp({
            number:'17',
            id:'age',
        },100);
    });
}

function loadProject(){
    fetch('project.html').then((response)=>{
        return response.text();
    }).then(function(data){
        main.innerHTML = data;

        $.counterUp({
            number: 5,
            id: 'project',
            loop: false,
        },100);

        $.animateColor({
            color: 'random',
            id: 'project',
            type: 'text'
        },100);
    });
}

function loadAbout(){
    fetch('about.html').then((response)=>{

        return response.text(); 

    }).then((data)=>{

        main.innerHTML = data;

        var sendEmail = document.getElementById('sendEmail');
        sendEmail.addEventListener('click',()=>{
            sendMail();
        });

    });
}

window.addEventListener('load',function(){
    home.classList.add('text-red');

    loadHome();

});

home.addEventListener('click',function(){
    about.classList.remove('text-red');
    project.classList.remove('text-red');
    home.classList.add('text-red');
    loadHome();
});
project.addEventListener('click',function(){
    about.classList.remove('text-red');
    home.classList.remove('text-red');
    project.classList.add('text-red');
    loadProject();
});
about.addEventListener('click',function(){
    project.classList.remove('text-red');
    home.classList.remove('text-red');
    about.classList.add('text-red');
    loadAbout();
});
document.querySelector('.navbar-trigger').addEventListener('click',function(){
    navbar.classList.toggle('hide-small');
});
home.addEventListener('click',function(){
    navbar.classList.add('hide-small');
});
project.addEventListener('click',function(){
    navbar.classList.add('hide-small');
});
about.addEventListener('click',function(){
    navbar.classList.add('hide-small');
});

function modal_image(link){
    $('.modal').show();
    $('#image_here').attr('src',link);
}