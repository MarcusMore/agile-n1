const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const sendMail = require('../gmail');


router.get('/', (req, res)=>{
  res.render('main', {layout : 'index'});
})


router.post('/form', (req, res) =>{
    //res.send("Titulo: " + req.body.titulo+" Conteudo: " + req.body.conteudo)
    //res.send('Envio do formulario')
    const main = async () => {
      
        const options = {
          to: "marcusmore42@gmail.com",
          cc: null,
          replyTo: '',
          subject: req.body.titulo,
          text: req.body.conteudo,
          html: `<p> Assunto: ` + req.body.titulo + `</p>
          <p> E-mail do cliente: ` + req.body.email + `</p>` +  
          `<p> Mensagem: ` + req.body.conteudo  + `</p>`,
          attachments: null,
          textEncoding: 'base64',
          headers: [
            { key: 'X-Application-Developer', value: 'Amit Agarwal' },
            { key: 'X-Application-Version', value: 'v1.0.0.2' },
          ],
        };
        
      
        const messageId = await sendMail(options);
        return messageId;
      };
      
      main()
        .then((messageId) => console.log('Email enviado com sucesso:', messageId))
        .catch((err) => console.error(err));
        res.redirect('/')
      
  
})

module.exports = router