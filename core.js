import ProjectBox from "./components/project.js"

var main = document.querySelector('main')

function sendMail(){

    var from_name = document.getElementById('from_name')
    var from_email = document.getElementById('from_email')
    var message = document.getElementById('message')
    var message_status = document.querySelector('.message-status')

    if(from_name.value&&from_email.value&&message.value){

        message_status.innerHTML = 'Sending!!'

        var tempParams = {
            from_name: from_name.value,
            from_email: from_email.value,
            message: message.value,
        }

        emailjs.send('service_mym8wyj','template_zgc8t6b',tempParams)
        .then(function(res){
            from_name.value = ''
            from_email.value = ''
            message.value = ''
            message_status.innerHTML = "&#10003 message sent!!"
        },function(error){
            alert('Error Sending Message!!',error)
        })

    }else{
        if(!from_name.value){
            from_name.classList.add('border-red-700')
        }else{
            from_name.classList.remove('border-red-700')
        }

        if(!from_email.value){
            from_email.classList.add('border-red-700')
        }else{
            from_email.classList.remove('border-red-700')
        }

        if(!message.value){
            message.classList.add('border-red-700')
        }else{
            message.classList.remove('border-red-700')
        }
    }
}

function loadHome(){
    fetch('home.html').then((response)=>{
        return response.text()
    }).then(function(data){
        main.innerHTML = data

        Metz('#sub').animateText({
            text: 'Frontend Web Developer',
        },20)

        Metz('#card').animateColor({
            color: 'random',
            type:'border'
        },500)

        Metz('.introduction').animateChar({
            effect: 'random',
            speed: 10
        })

    })
}

function loadProject(){
    fetch('project.html').then((response)=>{
        return response.text()
    }).then(function(data){
        main.innerHTML = data

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
    Metz('.home').addClass('text-blue-700')
    loadHome()
})

const navbar = () => {
    const trigger = document.querySelector('#navbarTrigger')
    const list = document.querySelector('#navbarList')
    trigger.addEventListener('click',() => {
        list.classList.toggle('hidden')
    })

    Metz('.home').on('click',function(){
        Metz('.about').removeClass('text-blue-700')
        Metz('.project').removeClass('text-blue-700')
        Metz('.home').addClass('text-blue-700')
        loadHome()
    })
    Metz('.project').on('click',function(){
        Metz('.about').removeClass('text-blue-700')
        Metz('.home').removeClass('text-blue-700')
        Metz('.project').addClass('text-blue-700')
        loadProject()
        window.scrollTo(top)
    })
    Metz('.about').on('click',function(){
        Metz('.project').removeClass('text-blue-700')
        Metz('.home').removeClass('text-blue-700')
        Metz('.about').addClass('text-blue-700')
        loadAbout()
        window.scroll(top)
    })
    
    Metz('.home').on('click',function(){
        Metz('#navbarList').toggleClass('hidden')
    })
    Metz('.project').on('click',function(){
        Metz('#navbarList').toggleClass('hidden')
    
    })
    Metz('.about').on('click',function(){
        Metz('#navbarList').toggleClass('hidden')
    
    })
}

navbar()