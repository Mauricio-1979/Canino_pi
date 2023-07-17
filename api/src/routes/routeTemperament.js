const express = require('express');
const { Temperament } = require('../db.js');
const axios = require('axios');

const route = express.Router();
route.use(express.json());
const API_KEY = process.env

const getApiList = async () => {
  var temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  temperamentApi = temperamentApi.data.map(item => item?.temperament)

  const datoPreparado = temperamentApi.map(elemento => elemento?.split(", "))
  const arrayUnico = datoPreparado.flat()
  const otro = arrayUnico.filter(en => en !== undefined)

  return otro;
}

route.get("/", async (req, res, next) => {
  try {
    // var traeApi = await getApiList();

    // traeApi.forEach(el => {
    //   Temperament.findOrCreate({
    //     where: { name: el }
    //   })
    // });
    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);
  } catch (error) {
    next(error)
  }
})

module.exports = route;