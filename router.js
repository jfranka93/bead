var express = require('express');
var passport = require('passport');
var router = new express.Router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    req.flash('error', 'A kért tartalom megtekintéséhez be kell jelentekzni!');
    res.redirect('/login/login');
}

router.route('/login/login')
    .get(function (req, res) {
        res.render('login/index', {
            uzenetek: req.flash()
        });
    })
    .post(passport.authenticate('local-login', {
        successRedirect: '/list',
        failureRedirect: '/login/login',
        failureFlash: true,
        badRequestMessage: 'Hibás felhasználó vagy jelszó!'
    }));
    
router.route('/login/signup')
    .get(function (req, res) {
        res.render('login/signup', {
            uzenetek: req.flash()
        });
    })
    .post(passport.authenticate('local-signup', {
        successRedirect:    '/login/login',
        failureRedirect:    '/login/signup',
        failureFlash:       true,
        badRequestMessage:  'Hiányzó adatok'
    }));

router.use('/login/logout', function (req, res) {
    req.logout();
    res.redirect('/login/login');
});

router.route('/')
    .get(function (req, res) {
        res.render('info');
    });
router.route('/add')
    .get(ensureAuthenticated, function (req, res) { 
        res.render('add', {
            uzenetek: req.flash()
        }); 
    })
    .post(ensureAuthenticated, function (req, res) {
        if (req.validationErrors()) {
            req.validationErrors().forEach(function (error) {
                req.flash('error', error.msg);
            });
            res.redirect('/add');
        } else {
            req.app.models.nevjegy.create({
                vezeteknev: req.body.vezeteknev,
                keresztnev: req.body.keresztnev,
                lakcim: req.body.lakcim,
                telefon: req.body.telefon,
                user: req.user
            })
            .then(function () {
                req.flash('success', 'Névjegy elmentve');
                res.redirect('/add'); 
            });
        }
    });
router.route('/list')
    .get(ensureAuthenticated, function (req, res) {
        if (req.query.kereses) {
            req.app.models.user.findOne()
            .where({ id: req.user.id })
            .populate('nevjegyek')
            .exec(function(err, users) {
                var filtered = users.nevjegyek.filter(function (value) {
                    return value['vezeteknev'].indexOf(req.query.kereses) > -1;
                });
                res.render('list', {
                    uzenetek: req.flash(),
                    nevjegyek: filtered
                });
            });
        } else {
            req.app.models.user.findOne()
            .where({ id: req.user.id })
            .populate('nevjegyek')
            .exec(function(err, users) {
                res.render('list', {
                    uzenetek: req.flash(),
                    nevjegyek: users.nevjegyek
                });
            });
        }
    });
router.route('/delete/:id')
    .get(ensureAuthenticated,function (req, res) {
        req.app.models.nevjegy.destroy({
            id: req.params.id
        }).then(function () {
            req.flash('success', 'Névjegy törölve');
            res.redirect('/list');  
        });
    });
    
router.route('/edit/:id')
    .get(ensureAuthenticated, function (req, res) {
        req.app.models.nevjegy.findOne({
            id: req.params.id
        }).then(function (nevjegy) {
            res.render('edit', {
                nevjegy: nevjegy
            })
        });
    })
    .post(ensureAuthenticated, function (req, res) {
        req.app.models.nevjegy.update({
            id: req.params.id
        }, {
            foglalkozas: req.body.foglalkozas,
            cegnev: req.body.cegnev,
            telefon: req.body.telefon
        }).then(function () {
            res.redirect('/list');  
        });
    });
router.route('/nevjegy/:id')
    .get(ensureAuthenticated, function (req, res) {
        req.app.models.nevjegy.findOne({
            id: req.params.id
        }).then(function (nevjegy) {
            res.render('nevjegy', {
                nevjegy: nevjegy
            })
        });
    });
module.exports = router;