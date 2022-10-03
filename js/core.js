class Email {
    send() {
        const from_name = document.getElementById('from_name')
        const from_email = document.getElementById('from_email')
        const message = document.getElementById('message')
        const message_status = document.querySelector('.message_status')

        if (from_name.value && from_email.value && message.value) {

            message_status.innerHTML = 'Sending!!'

            const tempParams = {
                from_name: from_name.value,
                from_email: from_email.value,
                message: message.value,
            }

            emailjs.send("service_ygd6m6q", "template_zgc8t6b", tempParams,)
                .then(() => {
                    from_name.value = ''
                    from_email.value = ''
                    message.value = ''
                    message_status.innerHTML = "&#10003 message sent!!"
                });

        } else {
            if (!from_name.value) {
                from_name.classList.add('w3-border', 'w3-border-red')
            } else {
                from_name.classList.remove('w3-border', 'w3-border-red')
            }

            if (!from_email.value) {
                from_email.classList.add('w3-border', 'w3-border-red')
            } else {
                from_email.classList.remove('w3-border', 'w3-border-red')
            }

            if (!message.value) {
                message.classList.add('w3-border', 'w3-border-red')
            } else {
                message.classList.remove('w3-border', 'w3-border-red')
            }
        }
    }
}

class App {
    loadHome() {
        fetch('home.html')
            .then(response => response.text())
            .then(data => {
                $('#content #home').append(data);
                $('#sub').typewriter({delay: 50});
                $('.introduction').typewriter({delay: 50});
            })
    }

    loadProject() {
        fetch('project.html')
            .then(response => response.text())
            .then(function (data) {
                $('#content #project').append(data);

                const image = document.querySelectorAll('.image')
                const imageShow = document.querySelector('.imageShow')
                const imageShowModal = document.querySelector('.imageShowModal')
                const hideModal = document.getElementsByClassName('hideModal')

                hideModal.position = 'fixed'

                const clickImage = (e) => {
                    imageShowModal.style.display = 'block'
                    imageShow.src = e.target.src
                    imageShow.width = innerWidth - 50
                    imageShow.height = innerHeight - 20
                }

                const clickHideModalButton = (e) => {
                    imageShowModal.style.display = 'none'
                }

                for (const i = 0; i < image.length; i++) {
                    image[i].addEventListener('click', clickImage, false)
                }

                for (const i = 0; i < hideModal.length; i++) {
                    hideModal[i].addEventListener('click', clickHideModalButton, false)
                }

            })
    }

    loadAbout() {
        fetch('about.html')
            .then(response => response.text())
            .then((data) => {
                $('#content #about').append(data);
                const sendEmail = document.querySelector('form[name=sendEmail]')
                sendEmail.addEventListener('submit', (e) => {
                    e.preventDefault();
                    email.send();
                })

            })
    }
}

const app = new App;
const email = new Email;

app.loadHome();
app.loadProject();
app.loadAbout();