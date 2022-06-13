const express = require('express')
const path = require('path')
const app = express()

app.use('/style',express.static(path.join(__dirname,'./src/css/style.css')))
app.use('/w3css',express.static(path.join(__dirname,'./src/css/w3.css')))
app.use('/js/metz',express.static(path.join(__dirname,'./src/js/metz.js')))
app.use('/js/core',express.static(path.join(__dirname,'./src/js/core.js')))

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