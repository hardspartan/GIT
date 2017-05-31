var builder2 = require("botbuilder");
module.exports = function(bot2) {
    bot2.dialog('/consulta', [
        
        function (session, args) {
            session.send('Puedes hacer transferencias por medio de banca en línea, o en sucursales.');
            session.endDialog();
        }
    ]);
}; 