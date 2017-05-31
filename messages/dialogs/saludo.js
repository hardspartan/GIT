var builder2 = require("botbuilder");
module.exports = function(bot2) {
    bot2.dialog('/saludo', [
        
        function (session, args, next) {
            var lastVisit = session.userData.lastVisit;
            session.send(['¡Hola!', 'Buen día!', 'Es un gusto Saludarte!']);
            
            if (!lastVisit) {
                session.send('Por favor inicia secion antes de continuar');
                session.userData = Object.assign({}, session.userData, {
                    lastVisit: new Date()
                });
                builder2.Prompts.text(session, '¿Cual es tu usuario?');
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