window.addEventListener('load',function(){
    document.querySelector('.home').classList.add('text-red');
    load('#main','home.html');
});
function sendMail(params){
    var tempParams = {
        from_name:document.getElementById('from_name').value,
        from_email:document.getElementById('from_email').value,
        message:document.getElementById('message').value,
    };
    emailjs.send('service_mym8wyj','template_zgc8t6b',tempParams).then(function(res){
        console.log('success',res.status);
    });
}
function load(to, from){
    var req = new XMLHttpRequest();
    req.open('GET',from);
    req.setRequestHeader('Accept','text/javascript');
    req.setRequestHeader('content-type','text/html');
    req.send();
    req.onload = function(){
        document.querySelector(to).innerHTML = this.responseText;
    };
}
document.querySelector('.home').addEventListener('click',function(){
    document.querySelector('.about').classList.remove('text-red');
    document.querySelector('.project').classList.remove('text-red');
    document.querySelector('.home').classList.add('text-red');
    load('.main','home.html');
});
document.querySelector('.project').addEventListener('click',function(){
    document.querySelector('.about').classList.remove('text-red');
    document.querySelector('.home').classList.remove('text-red');
    document.querySelector('.project').classList.add('text-red');
    load('main','project.html');
});
document.querySelector('.about').addEventListener('click',function(){
    document.querySelector('.project').classList.remove('text-red');
    document.querySelector('.home').classList.remove('text-red');
    document.querySelector('.about').classList.add('text-red');
    load('main','about.html');
});
document.querySelector('.navbar-trigger').addEventListener('click',function(){
    document.querySelector('#navbar').classList.toggle('hide-small');
});
document.querySelector('.home').addEventListener('click',function(){
    document.querySelector('#navbar').classList.add('hide-small');
});
document.querySelector('.project').addEventListener('click',function(){
    document.querySelector('#navbar').classList.add('hide-small');
});
document.querySelector('.about').addEventListener('click',function(){
    document.querySelector('#navbar').classList.add('hide-small');
});

function modal_image(link){
    $('.modal').show();
    $('#image_here').attr('src',link);
}