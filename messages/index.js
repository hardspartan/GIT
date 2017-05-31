/*-----------------------------------------------------------------------------
This template demonstrates how to use an IntentDialog with a LuisRecognizer to add 
natural language support to a bot. 
For a complete walkthrough of creating this type of bot see the article at
http://docs.botframework.com/builder/node/guides/understanding-natural-language/
-----------------------------------------------------------------------------*/
"use strict";
//luis library fdfddsdfd
const dialog = {
saludo: require('./dialogs/saludo'),
despedida: require('./dialogs/despedida'),
queja: require('./dialogs/queja'),
direccion: require('./dialogs/direccion'),
consulta: require('./dialogs/consulta'),
};

var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var path = require('path');

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

const luis='Iniciar Chat';
const operacion='Operacion';
const personalizada='Atencion Personalizada';
const logeo='Iniciar Sesion';

const LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/b5c609a1-f472-44d6-8e4f-6fd492e80b8c?subscription-key=0d5dbf9d32f342648caa7326d804c604';
//const name='';

var bot = new builder.UniversalBot(connector, [
(session)=>{
    builder.Prompts.choice(session,'¿En que te puedo ayudar hoy?',
    [logeo,operacion,luis,personalizada],
    {listStyle: builder.ListStyle.button});
},
(session,result)=>{

    if(result.response){
        switch(result.response.entity){
            case logeo:
            session.beginDialog('Logeo-Dialogo:/')
            session.reset();
            break;
            case operacion:
            session.beginDialog('operacion-Dialogo:/')
            break;
            case luis:
            session.send('Bienvenido a BBVAchat, mi nombre es ARTU, en que te puedo ayudar?')
            var bot2 = new builder.UniversalBot(connector);
            var recognizer = new builder.LuisRecognizer(LuisModelUrl);
            var intents = new builder.IntentDialog({ recognizers: [recognizer] })
            //sub-dialogos luis 
            .matches('consulta', '/consulta')
            .matches('despedida', '/despedida')
            .matches('direccion', '/direccion')
            .matches('queja', '/queja')
            .matches('saludo', '/saludo')
            .onDefault((session) => {
            session.send('Sorry, I did not understand \'%s\'.', session.message.text);});
            bot2.dialog('/', intents);
            //llamada a dialogos, estan en carpeta dialogos
            dialog.saludo(bot2);
            dialog.despedida(bot2);
            dialog.queja(bot2);
            dialog.direccion(bot2);
            dialog.consulta(bot2);
            break;
            case personalizada:
            session.beginDialog('personalizada-Dialogo:/')
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
]);

/*

 */ 

//Sub-Dialogos
bot.library(require('./dialogs/operacionDialogo'));
//bot.library(require('./dialogs/luisDialogo'));
bot.library(require('./dialogs/personalizadaDialogo'));
bot.library(require('./dialogs/Logeo'));


if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}

