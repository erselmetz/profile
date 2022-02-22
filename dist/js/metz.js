const strings ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const numbers = '1234567890'
const special = ',./@{}[]()$#!*_-'

const addStyle = () => {
    const style = document.createElement('style')
    style.textContent = `
    .w3-animate-fading{animation:fading 10s infinite}@keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}
    .w3-animate-opacity{animation:opac 0.8s}@keyframes opac{from{opacity:0} to{opacity:1}}
    .w3-animate-top{position:relative;animation:animatetop 0.4s}@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}
    .w3-animate-left{position:relative;animation:animateleft 0.4s}@keyframes animateleft{from{left:-300px;opacity:0} to{left:0;opacity:1}}
    .w3-animate-right{position:relative;animation:animateright 0.4s}@keyframes animateright{from{right:-300px;opacity:0} to{right:0;opacity:1}}
    .w3-animate-bottom{position:relative;animation:animatebottom 0.4s}@keyframes animatebottom{from{bottom:-300px;opacity:0} to{bottom:0;opacity:1}}
    .w3-animate-zoom {animation:animatezoom 0.6s}@keyframes animatezoom{from{transform:scale(0)} to{transform:scale(1)}}
    .w3-animate-input{transition:width 0.4s ease-in-out}.w3-animate-input:focus{width:100%!important}
    `
    document.body.appendChild(style)
}

addStyle()

function generateString(length){
    const characters = strings+numbers
    result = ''
    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

function generateStringWithoutNumbers(length){
    result = ''
    for(let i = 0; i < length; i++){
        result += strings.charAt(Math.floor(Math.random() * strings.length))
    }
    return result
}

function generateNumber(length){
    result = ''
    for(let i = 0; i < length; i++){
        result += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return result
}

function randomColor() {
    result = '#'+Math.floor(Math.random() * 16777215).toString(16)
    return result
}

var Metz = (selector) => {
    return new MetzLibrary(selector)
}

class MetzLibrary {
    constructor (element) {

        this.element = document.querySelectorAll(element)
        this.el = document.querySelectorAll(element)[0]

    }

    animateText (data,speed){
        var animate = data
        var text = animate.text
        var x = 1
        this.element.forEach(function(sub){
            sub.innerHTML = animate.text.charAt(0)
            var timer = setInterval(function(){
                if(x <= text.length){
                    sub.innerHTML += text.charAt(x)
                    x++
                }
                if(animate.loop == true){
                    if(x >= text.length){
                        x = 1
                        sub.innerHTML = animate.text.charAt(0)
                    }
                }
                if(x >= text.length){
                    clearInterval(timer)
                }
            },speed)
        })
        return this
    }

    animateColor (data,speed) {
        var x = 0
        this.element.forEach(obj => {
            if(data.type == 'border'){
                obj.style.border = '1px solid'
                if(data.color == 'random'){
                    setInterval(function(){obj.style.borderColor = randomColor()},speed)
                }else{
                    setInterval(function(){
                        if(x <= data.color.length){
                            obj.style.borderColor = data.color[x]
                            x++
                        }
                        if(x > data.color.length){
                            x = 0
                        }
                    },speed)
                }
                
            }
            if(data.type == "text"){
                if(data.color == 'random'){
                    setInterval(function(){obj.style.color = randomColor()},speed)
                }else if(data.color && data.color != ''){
                    setInterval(function(){
                        if(x <= data.color.length){
                            obj.style.color = data.color[x]
                            x++
                        }
                        if(x > data.color.length){
                            x = 0
                        }
                    },speed)
                }
            }
        })
        return this
    }

    animateChar (data) {
        this.element.forEach(obj => {
            var char = 0 
            var text = obj.innerText
            var color
            if(data.text){text = data.text}else{text = obj.innerText}
            var splitText = text.split('')
            obj.innerHTML = ''
            const classCode = generateStringWithoutNumbers(8)

            const effect= (params) => {
                const arr = ['top','bottom','right','left']
                if(params != 'random'){return params}else{return arr[Math.floor(Math.random() * arr.length)]}
            }
    
            for(var i = 0;i < splitText.length;i++){
                if(data.color == null){color = 'black'}
                if(data.color != null && data.color == 'random'){color = randomColor()}
                if(data.color != null && data.color != 'random'){color = data.color}
                obj.innerHTML += `<span class="${classCode} w3-invisible" style="color:${color};">${splitText[i]}</span>`
            }
    
            var timer = setInterval(function(){
                var span = document.querySelectorAll('span.'+classCode)[char]
                span.classList.remove('w3-invisible')
                span.classList.add('w3-animate-'+effect(data.effect))
                char++
                if(char >= splitText.length){
                    clearInterval(timer)
                }
            }, data.speed)
        })
        return this
    }

    counterUp (data) {
        this.element.forEach(obj => {
            var number
            var x = 0
    
            if(data.number){
                number = data.number
            }
    
            if(!data.number){
                number = obj.innerText
            }
    
            var counterUpTimer = setInterval(() => {runCounterUp()},data.speed)
    
            function runCounterUp(){
                x++
                if(x <= number ){
                    obj.innerHTML = x
                }
                if(data.loop == true){
                    if(x >= number){
                        x = 0
                    }
                }else{
                    if(x >= number){
                        clearInterval(counterUpTimer)
                    }
                }
            }
            
        })
        return this
    }

    style (prop, val) {
        this.element.forEach(function(element) {
            var classCode = generateStringWithoutNumbers(15)
            var css = '.'+classCode+'{'+prop+'}'
            element.classList.add(classCode)
            document.querySelector('style').innerHTML += css
        })
        return this
    }

    css (prop, val) {
        this.element.forEach(function(element) {
            element.style[prop] = val
        })
        return this
    }

    addClass (params) {
        this.element.forEach(element => {
            element.classList.add(params)
        });
        return this
    }

    removeClass (params) {
        this.element.forEach(element => {
            element.classList.remove(params)
        });
        return this
    }

    toggleClass (params) {
        this.element.forEach(element => {
            var list = element.classList.contains(params)
            if(list == true){
                element.classList.remove(params)
            }
            if(list == false){
                element.classList.add(params)
            }
        });
        return this
    }

    on (param,callback) {
        this.element.forEach(element => {
            element.addEventListener(param,function(){
                callback()
            })
        });
        return this
    }

    focus (params) {
        this.element.forEach(element => {
            element.focus()
        });
        return this
    }

    text (params) {
        this.element.forEach(element => {
            if(params || params == ''){
                element.innerText = params
            }
        });
        return this.element[0].innerText
    }

    html (params) {
        this.element.forEach(element => {
            if(params || params == ''){
                element.innerHTML = params
            }
        });
        return this.element[0].innerHTML
    }

    val (params) {
        this.element.forEach(element => {
            if(params || params == ''){
                element.value = params
            }
        });
        return this.element[0].value
    }

    // validate (params) {
    //     this.element.forEach(element => {
    //         var input = document.querySelectorAll('element input')
    //         input.forEach(input => {
    //             if(input || input != '' || input == null){
                    
    //             }
    //         });
    //     });
    //     return this
    // }

    load (params) {
        this.element.forEach(element => {
            fetch(params).then(response => response.text())
            .then(data => {
                element.innerHTML = data
            })
        });
        return this
    }

}