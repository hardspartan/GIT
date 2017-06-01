var builder2 = require("botbuilder");
module.exports = function(bot2) {
    bot2.dialog('/consulta', [
        
        function (session, args) {
            session.send('Ok, vamos a hablar de celulares');
            session.endDialog();
        }
    ]);
}; 