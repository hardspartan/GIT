/*var builder = require('botbuilder');
//var botbuilder_azure = require("botbuilder-azure");
const uuid = require('uuid');
const library = new builder.Library('luisDialogo');

//var bot = new builder.UniversalBot(connector);

// Make sure you add code to validate these fields
//var luisAppId = process.env.LuisAppId;
//var luisAPIKey = process.env.LuisAPIKey;
//var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/b5c609a1-f472-44d6-8e4f-6fd492e80b8c?subscription-key=0d5dbf9d32f342648caa7326d804c604';

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })

.matches('consulta', (session, args) => {
    session.send('Para hacer un deposito debes hacer fila' + JSON.stringify(args));
})
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('/', intents);

//library.dialog('/', intents).cancelAction('cancel', null, { matches: /^cancel/i });
//library.dialog('/', intents);

module.exports = library;

*/

var builder2 = require("botbuilder");
module.exports = function(bot2) {
    bot2.dialog('/luisDialogo', [
        
        function (session, args, next) {
            var lastVisit = session.userData.lastVisit;
            session.send(['¡Hola!', 'Buen día!', 'Es un gusto Saludarte!']);
            
            if (!lastVisit) {
                session.send('Mi nombre es ARTU');
                session.userData = Object.assign({}, session.userData, {
                    lastVisit: new Date()
                });
                builder2.Prompts.text(session, ['¿Cómo te llamas?','¿Cuál es tu nombre?','¿Me puedes indicar tu nombre?']);
                session.save();
            } 
            else{
                next();
            }
        },
        function (session, results, next) {
            session.userData.nombre = results.response;
            var nombre = session.userData.nombre;
            session.userData = Object.assign({}, session.userData, {
                nombre: new String()
            });
            session.save();
            if (nombre) { session.endDialog(["Bienvenido %s, ¡Que gusto tenerte de regreso!", "Bienvenido %s, ¿En qué te puedo ayudar?"], nombre);}
            else {
                session.endDialog('¿Que necesitas %s?', session.userData.nombre);
            }
        }
    ]);
}; 

