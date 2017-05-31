var builder2 = require("botbuilder");
module.exports = function(bot2) {
    bot2.dialog('/despedida', [
        
        function (session, args) {
            session.send('Fue un placer atenderte, recurda que nos puedes buscar y en cualquier momento te responderemos');
            session.endDialog();
            //session.reset();
        }
    ]);
}; 