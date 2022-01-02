const strings ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const numbers = '1234567890'
const special = ',./@{}[]()%$#!*_-=+|/\\?<>'

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
    result = "#"+Math.floor(Math.random() * 16777215).toString(16)
    return result
}



var $ = function(selector) {
    if (! (this instanceof $) ) {
        return new $(selector)
    }
    this.el = document.querySelectorAll(selector)
    return this
}

$.prototype.css = function(prop, val){
    this.el.forEach(function(element) {
        element.style[prop] = val
    })
    return this
}

$.prototype.animate = function (params) {
    
}

$.prototype.addClass = function (params) {
    this.el.forEach(element => {
        element.classList.add = params
    });
    return this
}

$.prototype.removeClass = function (params) {
    this.el.forEach(element => {
        element.classList.remove = params
    });
    return this
}

$.prototype.animateColor = function(data,speed){
    var x = 0
    this.el.forEach(obj => {
        if(data.color == 'random'){
            setInterval(function(){obj.style.borderColor = randomColor()},speed)
        }
        if(data.type == 'border'){
            obj.style.border = '1px solid'
            setInterval(function(){
                if(x <= data.color.length){
                    obj.style.borderColor = data.color
                    x++
                }
                if(x > data.color.length){
                    x = 0
                }
            },speed)
        }
        if(data.type == "text"){
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
    })
    return this
}
    
$.prototype.animateText = function(data,speed){
    var animate = data
    var text = animate.text
    var x = 1
    this.el.forEach(function(sub){
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

$.prototype.animateChar = function(data){
    this.el.forEach(obj => {
        var char = 0 
        var text = obj.innerText
        if(data.text){text = data.text}else{text = obj.innerText}
        var splitText = text.split('')
        obj.innerHTML = ''
        const classCode = generateStringWithoutNumbers(8)

        for(var i = 0;i < splitText.length;i++){
            if(data.color && data.color == 'random'){
                color = randomColor()
            }else if(data.color != ''){
                color = data.color
            }else{
                color = 'black'
            }
            obj.innerHTML += `<span class="${classCode} w3-invisible" style="color:${color}">${splitText[i]}</span>`
        }

        var timer = setInterval(function(){
            var span = document.querySelectorAll('span.'+classCode)[char]
            span.classList.remove('w3-invisible')
            span.classList.add('w3-animate-'+data.effect)
            char++
            if(char >= splitText.length){
                clearInterval(timer)
            }
        }, data.speed)
    })
    return this
}

$.prototype.counterUp = function(data,speed){
    var count = data
    var x = 0
    this.el.forEach(obj => {
        setInterval(()=>{
            if(x <= count.number ){
                obj.innerHTML = x
                x++
            }
            if(count.loop == true){
                if(x >= count.number){
                    x = 0
                }
            }
        },speed)
    })
    return this
}

$.prototype.on = function(param,callback) {
    this.el.forEach(element => {
        element.addEventListener(param,function(){
            callback()
        })
    });
    return this
}

$.prototype.focus = function (params) {
    this.el.forEach(element => {
        element.focus()
    });
    return this
}

$.prototype.text = function (params) {
    this.el.forEach(element => {
        if(params || params == ''){
            element.innerText = params
        }
    });
    return this.el[0].innerText
}

$.prototype.html = function (params) {
    this.el.forEach(element => {
        if(params || params == ''){
            element.innerHTML = params
        }
    });
    return this.el[0].innerHTML
}

$.prototype.val = function (params) {
    this.el.forEach(element => {
        if(params || params == ''){
            element.value = params
        }
    });
    return this.el[0].value
}

$.prototype.validate = function (params) {
    this.el.forEach(element => {
        
    });
    return this
}