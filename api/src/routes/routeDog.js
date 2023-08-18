const express = require('express');
const { Dog, Temperament } = require('../db.js');
const axios = require('axios');

const route = express.Router();
route.use(express.json());
const API_KEY = process.env

// **********  FUNCIONES ******************
const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  const apiInfo = apiUrl.data.map(item => {
    return {
      id: item.id,
      name: item.name,
      height: item.height.metric,
      weight: item.weight.metric,
      life_span: item.life_span,
      image: `https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`,
      temperament: item.temperament ? item.temperament :
        "no temperament",
      weightFiltro: item.weight.metric !== "NaN" ?
        item.weight.metric.split(" - ")[0] : 6
    }
  })
  return apiInfo;
  
}


const getDDBB = async () => {
  return Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      }
    }
  })
}

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDDBB();
  const infoAll = apiInfo.concat(dbInfo);
  return infoAll;
}

//************ RUTAS*************************** */

route.get("/dogs", async (req, res, next) => {
  try {
    const name = req.query.name;
    var allDogs = await getAllDogs();
    if (name) {
      let dogName = await allDogs.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
      dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send("No existe el nombre");
    } else {
      res.status(200).send(allDogs);
    }
  } catch (error) {
    next(error);
  }
})

route.post("/dogs", async (req, res, next) => {
  try {
    let { name, image, height, maxWeight, minWeight, life_span, createdInDb, temperament } = req.body
    if (!minWeight) {
      minWeight = maxWeight;
    }
    let weight = minWeight + " - " + maxWeight;
    if (!image) {
      image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8N9r7S3MIS80qf-GPGJl-PyvDDnyaqHezyw&usqp=CAU'
    }

    if (!name || !height || !maxWeight) {
      return res.json({ msg: "The name, height and maxWeight are required!" })
    }

    let dogCreated = await Dog.create({
      name, image, height, weight, life_span, createdInDb
    })

    let temperamentDDBB = await Temperament.findAll({
      where: {
        name: temperament
      }
    })

    dogCreated.addTemperament(temperamentDDBB)
    res.send("A new Dog was created")
  } catch (error) {
    next(error);
  }
})

route.get("/dogs/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const allDogs = await getAllDogs();
    if (id) {
      let dogId = await allDogs.filter(item => item.id == id);
      dogId.length ?
        res.status(200).json(dogId) :
        res.status(404).send("Dog not found")
    }
  } catch (error) {
    next(error);
  }
})

module.exports = route;