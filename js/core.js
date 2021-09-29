$(window).on('load',function(){
    $('main').load('home.html');
    $('.home').addClass('is-active gradient');
});

$(document).ready(function(){
    $('.home').on('click',function(e){
        e.preventDefault();
        $('.project, .about').removeClass('is-active gradient');
        $('.home').addClass('is-active gradient');
        $('main').load('home.html');
    });
    $('.project').on('click',function(e){
        e.preventDefault();
        $('.home, .about').removeClass('is-active gradient');
        $('.project').addClass('is-active gradient');
        $('main').load('project.html');
    });
    $('.about').on('click',function(e){
        e.preventDefault();
        $('.home, .project').removeClass('is-active gradient');
        $('.about').addClass('is-active gradient');
        $('main').load('about.html');
    });

    $('.navbar-burger').click(function(){
        $('.navbar-menu').toggle('is-active');
    });
    $('.navbar-trigger').click(function(e){
        e.preventDefault();
        $('#navbar').toggleClass('hide-small');
    });
    $('.home, .project, .about').click(function(e){
        e.preventDefault();
        $('#navbar').addClass('hide-small');
    });
});