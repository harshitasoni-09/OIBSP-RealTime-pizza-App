const Menu = require('../../models/menu');
function homeController() {
    return {
        index(req, res) {
            Menu.find()
                .then(function (pizzas) {
                    console.log(pizzas);
                    return res.render('home', { pizzas: pizzas });
                })
                .catch(function (error) {
                    console.error(error);
                    return res.status(500).send('Internal Server Error');
                });
        },
    };
}

module.exports = homeController;

