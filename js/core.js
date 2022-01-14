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
            console.log('success',res.status)
            from_name.value = ''
            from_email.value = ''
            message.value = ''
            message_status.innerHTML = "&#10003 message sent!!"
        },function(error){
            alert('Error Sending Message!!',error)
        })

    }else{
        if(!from_name.value){
            from_name.classList.remove('w3-border-green')
            from_name.classList.add('w3-border-red')
        }else{
            from_name.classList.remove('w3-border-red')
            from_name.classList.add('w3-border-green')
        }

        if(!from_email.value){
            from_email.classList.remove('w3-border-green')
            from_email.classList.add('w3-border-red')
        }else{
            from_email.classList.remove('w3-border-red')
            from_email.classList.add('w3-border-green')
        }

        if(!message.value){
            message.classList.remove('w3-border-green')
            message.classList.add('w3-border-red')
        }else{
            message.classList.remove('w3-border-red')
            message.classList.add('w3-border-green')
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
        },100)

        Metz('#card').animateColor({
            color: 'random',
            type:'border'
        },500)

        Metz('.w3-title').animateChar({
            effect: 'top',
            speed: 40
        })

    })
}

function loadProject(){
    fetch('project.html').then((response)=>{
        return response.text()
    }).then(function(data){
        main.innerHTML = data

        Metz('#project').counterUp({
            number: 4,
            speed: 100
        })

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
    Metz('.home').addClass('w3-text-red')
    loadHome()
})

Metz('.home').on('click',function(){
    Metz('.about').removeClass('w3-text-red')
    Metz('.project').removeClass('w3-text-red')
    Metz('.home').addClass('w3-text-red')
    loadHome()
})
Metz('.project').on('click',function(){
    Metz('.about').removeClass('w3-text-red')
    Metz('.home').removeClass('w3-text-red')
    Metz('.project').addClass('w3-text-red')
    loadProject()
    window.scrollTo(top)
})
Metz('.about').on('click',function(){
    Metz('.project').removeClass('w3-text-red')
    Metz('.home').removeClass('w3-text-red')
    Metz('.about').addClass('w3-text-red')
    loadAbout()
    window.scroll(top)
})

Metz('.w3-navbar-trigger').on('click',function(){
    Metz('#navbar').toggleClass('w3-hide-small')
})
Metz('.home').on('click',function(){
    Metz('.navbar').addClass('w3-hide-small')
    Metz('#navbar').toggleClass('w3-hide-small')
})
Metz('.project').on('click',function(){
    Metz('.navbar').addClass('w3-hide-small')
    Metz('#navbar').toggleClass('w3-hide-small')

})
Metz('.about').on('click',function(){
    Metz('.navbar').addClass('w3-hide-small')
    Metz('#navbar').toggleClass('w3-hide-small')

})