var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'nevjegy',
    connection: 'disk',
    attributes: {
        datum: {
            type: 'date',
            defaultsTo: function () { return new Date(); }
        },
        vezeteknev: 'string',
        keresztnev: 'string',
        telefon: 'string',
        lakcim: 'string',
        user: {
            model: 'user'
        }
    }
});