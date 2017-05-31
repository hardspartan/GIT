var builder2 = require("botbuilder");
module.exports = function(bot2) {
    bot2.dialog('/queja', [
        
        function (session, args) {
            session.send('Lamentamos el inconveniente, nuestro equipo hace su mejor esfuerzo para que nuestros clientes estén felices.');
            session.endDialog();
            //session.reset();
        }
    ]);
}; 