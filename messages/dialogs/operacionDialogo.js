var builder = require('botbuilder');
const uuid = require('uuid');

const library = new builder.Library('operacion-Dialogo');
const deposito = 'Deposito';
const retiro = 'Retiro';
const transaccion = 'Transaccion';
const inversion = 'Inversion';
const apertura = 'Apertura de Cuenta';


library.dialog('/', [
    (session) => {
    builder.Prompts.choice(session,'Elige el tipo de operacion a realizar:',
    [deposito,retiro,transaccion,inversion,apertura],
    {listStyle: builder.ListStyle.button});
    },
    (session, result) => {

    if(result.response){
        switch(result.response.entity){
            case deposito:
            session.send('Tu turno para deposito es el 0122, Pasa a la ventanilla 4 cuando sea anunciado.');
            session.send('Tiempo estimado de espera: 47 min');
            session.reset();
            break;
            case retiro:
            session.send('Tu turno para Retiro es el 026, Pasa a la ventanilla 2 cuando sea anunciado.');
            session.send('Tiempo estimado de espera: 19 min');
            session.reset();
            break;
            case transaccion:
            session.send('Tu turno para Transaccion es el 042, Pasa a la ventanilla 6 cuando sea anunciado.');
            session.send('Tiempo estimado de espera: 37 min');
            session.reset();
            break;
            case inversion:
            session.send('Tu turno para inversion es el 02, Pasa a la oficina 2 cuando sea anunciado.');
            session.send('Tiempo estimado de espera: 60 min');
            session.reset();
            break;
            case apertura:
            session.send('Tu turno para Apertura es el 054 Pasa a al modulo 1 cuando sea anunciado.');
            session.send('Tiempo estimado de espera: 37 min');
            session.reset();
            break;
        }
    } else{
        session.send('Disculpa no entendi tu respuesta')
    }
},

(session, result)=>{
if(result.resume){
    session.send('No entendi tu solicitud para darte ticket, por favor acercate a un ejecutivo.');
    session.reset();
}
}

]).cancelAction('cancel', null, { matches: /^cancel/i });

module.exports = library;