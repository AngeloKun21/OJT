import { Sequelize } from "sequelize";

const dbName = "postgres";
const dbUserName = "postgres";
const dbPassword = "123";
const dbHost = "localhost";
const dbPort = 5432;
const dbDriver = "postgres";

const sequelizeConnection = new Sequelize(dbName, dbUserName, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    port: dbPort
})

export default sequelizeConnection