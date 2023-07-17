require('dotenv').config();
const { Sequelize  } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DATABASE_URL
} = process.env;
//const t = await sequelize.transaction();
const sequelize = new Sequelize(DATABASE_URL,{
  dialect: 'postgres',  
  pool: {
    max: 10, 
    min: 0, 
    acquire: 30000, 
    idle: 10000, 
  },
  retry: {
    match: [/Deadlock/i],
    max: 3, 
    backoffBase: 1000, 
    backoffExponent: 1.5, 
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Dog, Temperament } = sequelize.models;


Dog.belongsToMany(Temperament, {through: 'DogTemperament'});
Temperament.belongsToMany(Dog, {through: 'DogTemperament'});

module.exports = {
  ...sequelize.models, 
  conn: sequelize,   
};
