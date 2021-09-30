$(window).on('load',function(){
    $('main').load('home.html');
    $('.home').addClass('text-red');
});

$(document).ready(function(){
    $('.home').on('click',function(e){
        e.preventDefault();
        $('.project, .about').removeClass('text-red');
        $('.home').addClass('text-red');
        $('main').load('home.html');
    });
    $('.project').on('click',function(e){
        e.preventDefault();
        $('.home, .about').removeClass('text-red');
        $('.project').addClass('text-red');
        $('main').load('project.html');
    });
    $('.about').on('click',function(e){
        e.preventDefault();
        $('.home, .project').removeClass('text-red');
        $('.about').addClass('text-red');
        $('main').load('about.html');
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