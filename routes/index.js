var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Use the following routes: \n- \'/bus\': Bus Data\n- \'/dad-joke\': Dad joke \n- \'/fixtures\': Upcoming sports fixtures \n- \'/key-dates\': Upcoming important dates and events \n- \'/lunch-menu\': Currently under construction \n- \'/news\': News headlines \n- \'/quotes\': Various quotes \n- \'/scores\': Recent sports results \n- \'/weather2\': Weather data'});
});

module.exports = router;

