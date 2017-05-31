var builder = require('botbuilder');
const uuid = require('uuid');

const library = new builder.Library('personalizada-Dialogo');

library.dialog('/', [
    (session) => {

    session.send('Por favor aguarda, uno de nuestros ejecutivos se conectara al chat en breve');
    session.send('Tiempo estimado de espera: 7 min');
    //session.reset();
    }

]).cancelAction('cancel', null, { matches: /^cancel/i });

module.exports = library;