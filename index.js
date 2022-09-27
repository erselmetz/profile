const express = require('express')
const path = require('path')
const app = express()

// assets
app.use('/style',express.static(path.join(__dirname,'./src/css/style.css')))
app.use('/w3css',express.static(path.join(__dirname,'./src/css/w3.css')))
app.use('/js/metz',express.static(path.join(__dirname,'./src/js/metz.js')))
app.use('/js/core',express.static(path.join(__dirname,'./src/js/core.js')))
app.use('/js/jquery',express.static(path.join(__dirname, './src/js/jquery.js')));

// img
app.use('/img/simple-calculator',express.static(path.join(__dirname,'./src/img/Simple-calculator.png')))
app.use('/img/note-app-javascript',express.static(path.join(__dirname,'./src/img/Note-App-Javascript.png')))
app.use('/img/login-system',express.static(path.join(__dirname,'./src/img/Screenshot 2022-09-09 161657.png')))

// jQueryScript
app.use('/jQueryScript/aeo-typewriter/css',express.static(path.join(__dirname,'./src/jQueryScript/aeo-typewriter/css/aeo-style.css')))
app.use('/jQueryScript/aeo-typewriter/js',express.static(path.join(__dirname,'./src/jQueryScript/aeo-typewriter/js/aeo-typewriter.js')))

// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'./src/index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname,'./src/home.html'))
});

app.get('/project', (req, res) => {
    res.sendFile(path.join(__dirname,'./src/project.html'))
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'./src/about.html'))
});

app.listen(8080, () => console.log('project is live on port:8080'));