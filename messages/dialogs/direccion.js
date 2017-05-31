var builder2 = require("botbuilder");
module.exports = function(bot2) {
    bot2.dialog('/direccion', [
        
        function (session, args) {
            session.send('La sucursal más cercana a tu localidad es la sucursal de Polanco: Masaryk 235');
            session.endDialog();
        }
    ]);
}; 