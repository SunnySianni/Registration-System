import { Sequelize } from 'sequelize';
import 'dotenv/config'


// creates sequelize object
const sequelize = new Sequelize(
  
  //grab the values from the env file
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD,
  
  {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Check database connection
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
  } catch (err) {
      console.error('Unable to connect to the database:', err);
}


export default sequelize;
