var builder = require('botbuilder');
const uuid = require('uuid');

const library = new builder.Library('Logeo');

library.dialog('/', [
    (session) => {
    builder.Prompts.text(session,'Ingresa tu usuario:');
},
    (session, result) => {
    const name=result.response;
},
(session) => {
    builder.Prompts.text(session,'Ingresa tu Contraseña:');
},
(session)=>{
    session.send('Bienvenido %s', name);
    session.reset();
}

]).cancelAction('cancel', null, { matches: /^cancel/i });

module.exports = library;
//module.exports = name;