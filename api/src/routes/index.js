const { Router } = require('express');

const Dog = require('./routeDog');
const Temperament = require('./routeTemperament')

const router = Router();

router.use("/", Dog);
router.use("/temperaments", Temperament);

module.exports = router;
