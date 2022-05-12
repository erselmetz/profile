const strings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const numbers = '1234567890'
const special = ',./@{}[]()$#!*_-'

function generateString(length) {
    const characters = strings + numbers
    result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

function generateStringWithoutNumbers(length) {
    result = ''
    for (let i = 0; i < length; i++) {
        result += strings.charAt(Math.floor(Math.random() * strings.length))
    }
    return result
}

function generateNumber(length) {
    result = ''
    for (let i = 0; i < length; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return result
}

function randomColor() {
    result = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return result
}

var Metz = (selector) => {
    return new MetzLibrary(selector)
}

class MetzLibrary {
    constructor(element) {

        this.element = document.querySelectorAll(element)
        this.el = document.querySelectorAll(element)[0]

    }

    animateText(data, speed) {
        var animate = data
        var text = animate.text
        var x = 1
        this.element.forEach(function (sub) {
            sub.innerHTML = animate.text.charAt(0)
            var timer = setInterval(function () {
                if (x <= text.length) {
                    sub.innerHTML += text.charAt(x)
                    x++
                }
                if (animate.loop == true) {
                    if (x >= text.length) {
                        x = 1
                        sub.innerHTML = animate.text.charAt(0)
                    }
                }
                if (x >= text.length) {
                    clearInterval(timer)
                }
            }, speed)
        })
        return this
    }

    animateColor(data, speed) {
        var x = 0
        this.element.forEach(obj => {
            if (data.type == 'border') {
                obj.style.border = '1px solid'
                if (data.color == 'random') {
                    setInterval(function () { obj.style.borderColor = randomColor() }, speed)
                } else {
                    setInterval(function () {
                        if (x <= data.color.length) {
                            obj.style.borderColor = data.color[x]
                            x++
                        }
                        if (x > data.color.length) {
                            x = 0
                        }
                    }, speed)
                }

            }
            if (data.type == "text") {
                if (data.color == 'random') {
                    setInterval(function () { obj.style.color = randomColor() }, speed)
                } else if (data.color && data.color != '') {
                    setInterval(function () {
                        if (x <= data.color.length) {
                            obj.style.color = data.color[x]
                            x++
                        }
                        if (x > data.color.length) {
                            x = 0
                        }
                    }, speed)
                }
            }
        })
        return this
    }

    animateChar(data) {
        this.element.forEach(obj => {
            var char = 0
            var text = obj.innerText
            var color
            if (data.text) { text = data.text } else { text = obj.innerText }
            var splitText = text.split('')
            obj.innerHTML = ''
            const classCode = generateStringWithoutNumbers(8)

            const effect = (params) => {
                const arr = ['top', 'bottom', 'right', 'left']
                if (params != 'random') { return params } else { return arr[Math.floor(Math.random() * arr.length)] }
            }

            for (var i = 0; i < splitText.length; i++) {
                if (data.color == null) { color = 'black' }
                if (data.color != null && data.color == 'random') { color = randomColor() }
                if (data.color != null && data.color != 'random') { color = data.color }
                obj.innerHTML += `<span class="${classCode} w3-invisible" style="color:${color};">${splitText[i]}</span>`
            }

            var timer = setInterval(function () {
                var span = document.querySelectorAll('span.' + classCode)[char]
                span.classList.remove('w3-invisible')
                span.classList.add('w3-animate-' + effect(data.effect))
                char++
                if (char >= splitText.length) {
                    clearInterval(timer)
                }
            }, data.speed)
        })
        return this
    }
}