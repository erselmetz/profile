const strings ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const numbers = '1234567890'
const special = ',./@{}[]()$#!*_-'

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

var Metz = function(selector) {
    if (! (this instanceof Metz) ) {
        return new Metz(selector)
    }
    this.element = document.querySelectorAll(selector)
    this.el = document.querySelectorAll(selector)[0]
    return this
}



Metz.prototype.animateColor = function(data,speed){
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
    
Metz.prototype.animateText = function(data,speed){
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

Metz.prototype.animateChar = function(data){
    this.element.forEach(obj => {
        var char = 0 
        var text = obj.innerText
        if(data.text){text = data.text}else{text = obj.innerText}
        var splitText = text.split('')
        obj.innerHTML = ''
        const classCode = generateStringWithoutNumbers(8)

        for(var i = 0;i < splitText.length;i++){
            if(data.color && data.color == 'random'){color = randomColor()}
            if(data.color != ''){color = data.color}
            if(!data.color){color = 'black'}
            obj.innerHTML += `<span class="${classCode} w3-invisible" style="color:${color};">${splitText[i]}</span>`
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

Metz.prototype.counterUp = function(data,speed){
    var count = data
    var x = 0
    this.element.forEach(obj => {
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

Metz.prototype.style = function(prop, val){
    this.element.forEach(function(element) {
        var classCode = generateStringWithoutNumbers(15)
        var css = '.'+classCode+'{'+prop+'}'
        element.classList.add(classCode)
        document.querySelector('style').innerHTML += css
    })
    return this
}

Metz.prototype.css = function(prop, val){
    this.element.forEach(function(element) {
        element.style[prop] = val
    })
    return this
}

// Metz.prototype.animate = function (params) {
//     this.element.forEach(element => {
        
//     });
// }

Metz.prototype.addClass = function (params) {
    this.element.forEach(element => {
        element.classList.add(params)
    });
    return this
}

Metz.prototype.removeClass = function (params) {
    this.element.forEach(element => {
        element.classList.remove(params)
    });
    return this
}

Metz.prototype.toggleClass = function (params) {
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


Metz.prototype.on = function(param,callback) {
    this.element.forEach(element => {
        element.addEventListener(param,function(){
            callback()
        })
    });
    return this
}

Metz.prototype.focus = function (params) {
    this.element.forEach(element => {
        element.focus()
    });
    return this
}

Metz.prototype.text = function (params) {
    this.element.forEach(element => {
        if(params || params == ''){
            element.innerText = params
        }
    });
    return this.element[0].innerText
}

Metz.prototype.html = function (params) {
    this.element.forEach(element => {
        if(params || params == ''){
            element.innerHTML = params
        }
    });
    return this.element[0].innerHTML
}

Metz.prototype.val = function (params) {
    this.element.forEach(element => {
        if(params || params == ''){
            element.value = params
        }
    });
    return this.element[0].value
}

Metz.prototype.validate = function (params) {
    this.element.forEach(element => {
        var input = document.querySelectorAll('element input')
        input.forEach(input => {
            if(input || input != '' || input == null){
                
            }
        });
    });
    return this
}

Metz.prototype.load = function (params) {
    this.element.forEach(element => {
        fetch(params).then(response => response.text())
        .then(data => {
            element.innerHTML = data
        })
    });
    return this
}