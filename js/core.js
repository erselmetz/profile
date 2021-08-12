$(window).on('load',function(){
    $('main').load('home.html');
    $('.home').addClass('active');
});
$(document).ready(function(){
    $('#home').on('click',function(e){
        e.preventDefault();
        $('.project, .about').removeClass('active');
        $('.home').addClass('active');
        $('main').load('home.html');
    });
    $('#project').on('click',function(e){
        e.preventDefault();
        $('.home, .about').removeClass('active');
        $('.project').addClass('active');
        $('main').load('project.html');
    });
    $('#about').on('click',function(e){
        e.preventDefault();
        $('.home, .project').removeClass('active');
        $('.about').addClass('active');
        $('main').load('about.html');
    });
});