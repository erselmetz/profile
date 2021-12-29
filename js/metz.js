export default class Metz{
    animateColor(data,speed){
        var obj = document.getElementById(data.id);
        var x = 0;
        var randomColor = [
            'yellow',
            'red',
            'purple',
            'green',
            'yellowgreen',
            'blue',
            'cyan',
            'orange',
            'pink',
        ];
        if(data.color == 'random'){
            data.color = randomColor;
        }
        if(data.type == 'border'){
            obj.style.border = '1px solid';
            setInterval(()=>{
                if(x <= data.color.length){
                    obj.style.borderColor = data.color[x];
                    x++;
                }
                if(x > data.color.length){
                    x = 0;
                }
            },speed);
        }
        if(data.type == "text"){
            setInterval(()=>{
                if(x <= data.color.length){
                    obj.style.color = data.color[x];
                    x++;
                }
                if(x > data.color.length){
                    x = 0;
                }
            },speed);
        }
    }
    animateText(data,speed){
        var animate = data;
        var sub = document.getElementById(animate.id);
        var text = animate.text += '       ';
        var x = 1;
        sub.innerHTML = animate.text.charAt(0);
        setInterval(()=>{
            if(x <= text.length){
                sub.innerHTML += text.charAt(x);
                x++;
            }
            if(animate.loop == true){
                if(x >= text.length){
                    x = 1;
                    sub.innerHTML = animate.text.charAt(0);
                }
            }
        },speed);
    }
    counterUp(data,speed){
        var count = data;
        var x = 0;
        var p = document.getElementById(count.id);
        setInterval(()=>{
            if(x <= count.number ){
                p.innerHTML = x;
                x++;
            }
            if(count.loop == true){
                if(x >= count.number){
                    x = 0;
                }
            }
        },speed);
    }
}