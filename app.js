const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
//var nodemailer = require('nodemailer');
const { google } = require('googleapis');
const credentials = require('./credentials.json');
const path = require('path');

//config
app.use(express.json());

    //body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    //template
    //app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.engine('hbs', handlebars.engine({layoutsDir: __dirname + '/views/layouts', extname: 'hbs'}));
    app.set('view engine', 'hbs');
    
//app.use(express.static('public'))
//Rotas
app.use('/', admin)
app.use(express.static(path.join(__dirname, '/public')));
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor ligado: http://localhost:8081");
});