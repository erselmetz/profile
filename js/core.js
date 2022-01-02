var main = document.getElementById('main')
var home = document.querySelector('.home')
var project = document.querySelector('.project')
var about = document.querySelector('.about')
var navbar = document.querySelector('#navbar')
var navbarTrigger = document.querySelector('.w3-navbar-trigger')

function sendMail(){

    var from_name = document.getElementById('from_name')
    var from_email = document.getElementById('from_email')
    var message = document.getElementById('message')
    var message_status = document.querySelector('.message-status')

    message_status.innerHTML = 'Sending!!'

    var tempParams = {
        from_name: from_name.value,
        from_email: from_email.value,
        message: message.value,
    }

    emailjs.send('service_mym8wyj','template_zgc8t6b',tempParams)
    .then(function(res){
        console.log('success',res.status)
        from_name.value = ''
        from_email.value = ''
        message.value = ''
        message_status.innerHTML = "&#10003 message sent!!"
    },function(error){
        alert('Error Sending Message!!',error)
    })
}

function loadHome(){
    fetch('home.html').then((response)=>{
        return response.text()
    }).then(function(data){
        main.innerHTML = data

        $('#sub').animateText({
            text: 'Backend Web Developer',
        },100)

        $('#card').animateColor({
            color: 'random',
            type:'border'
        },1000)

        $('.w3-title').animateChar({
            text: 'Hi, I am Ersel Metz Magbanua, 17 years old.',
            effect: 'top',
            color: 'random',
            speed: 40
        })

    })
}

function loadProject(){
    fetch('project.html').then((response)=>{
        return response.text()
    }).then(function(data){
        main.innerHTML = data

        $('#project').counterUp({
            number: 5,
        },100)

        // $('#project').animateColor({
        //     color: ['white','black'],
        //     type: 'text',
        // },1000)

        var image = document.querySelectorAll('.image')
        var imageShow = document.querySelector('.imageShow')
        var imageShowModal = document.querySelector('.imageShowModal')
        var hideModal = document.getElementsByClassName('hideModal')

        hideModal.position = 'fixed'

        var clickImage = (e)=>{
            imageShowModal.style.display = 'block'
            imageShow.src = e.target.src
            imageShow.width = innerWidth - 50
            imageShow.height = innerHeight - 20
        }

        var clickHideModalButton = (e)=>{
            imageShowModal.style.display = 'none'
        }

        for(var i = 0; i < image.length; i++){
            image[i].addEventListener('click',clickImage,false)
        }

        for(var i = 0; i<hideModal.length; i++){
            hideModal[i].addEventListener('click',clickHideModalButton,false)
        }

    })
}

function loadAbout(){
    fetch('about.html').then((response)=>{

        return response.text() 

    }).then((data)=>{

        main.innerHTML = data

        var sendEmail = document.getElementById('sendEmail')
        sendEmail.addEventListener('click',()=>{
            sendMail()
        })

    })
}

window.addEventListener('load',function(){
    home.classList.add('w3-text-red')

    loadHome()

})

home.addEventListener('click',function(){
    about.classList.remove('w3-text-red')
    project.classList.remove('w3-text-red')
    home.classList.add('w3-text-red')
    loadHome()
})
project.addEventListener('click',function(){
    about.classList.remove('w3-text-red')
    home.classList.remove('w3-text-red')
    project.classList.add('w3-text-red')
    loadProject()
})
about.addEventListener('click',function(){
    project.classList.remove('w3-text-red')
    home.classList.remove('w3-text-red')
    about.classList.add('w3-text-red')
    loadAbout()
})
navbarTrigger.addEventListener('click',function(){
    navbar.classList.toggle('w3-hide-small')
})
home.addEventListener('click',function(){
    navbar.classList.add('w3-hide-small')
})
project.addEventListener('click',function(){
    navbar.classList.add('w3-hide-small')
})
about.addEventListener('click',function(){
    navbar.classList.add('w3-hide-small')
})