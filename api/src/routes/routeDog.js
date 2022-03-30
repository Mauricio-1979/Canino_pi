const express = require('express');
const { Dog, Temperament } = require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = express.Router();
const API_KEY = process.env

// **********  FUNCIONES ******************
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = apiUrl.data.map(item => {
        return {
            id: item.id,
            image: item.image.url,
            name: item.name,
            temperament: item.temperament,
            weight: item.weight.imperial
        }
    })
    return apiInfo;
}

const getDDBB = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
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

route.get("/dogs", async(req, res) => {
    const name = req.query.name;
    var allDogs = await getAllDogs();
    if(name){
        let dogName = await allDogs.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send("No existe el perro");
    } else {
        res.status(200).send(allDogs);
    }
})

const getApiList = async () => {
    var temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    temperamentApi = temperamentApi.data;
    temperamentList = temperamentApi.map(item => item.temperament)
    return temperamentList;
}

route.get("/temperaments", async (req, res) => {
    var temperamentEach = []
    var traeApi 
     traeApi = await getApiList();
   
    var datoIntermedio = traeApi.filter(function(e){return e})

    var datoPreparado = datoIntermedio.map(elemento => elemento.split(","))
    temperamentEach = datoPreparado.map(elemento => {
        for(e of elemento) return e
    })
    temperamentEach.forEach(element => {
            Temperament.findOrCreate({
                    where: {name: element}
                })
            });
            const allTemperaments = await Temperament.findAll();
            res.send(allTemperaments);
            
})

route.post("/dogs", async (req, res) => {
    let {name, image, height, weight, life_span, createdInDb, temperament} = req.body
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
})

route.get("/dogs/:id", async (req, res) => {
    const id = req.params.id;
    const allDogs = await getAllDogs();
    if(id){
        let dogId = await allDogs.filter(item => item.id == id);
        dogId.length ?
        res.status(200).json(dogId) :
        res.status(404).send("Dog not found")
    }
})
module.exports = route;

/**

Imagen
Nombre
Temperamento
Peso */