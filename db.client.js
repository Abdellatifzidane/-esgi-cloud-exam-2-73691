const { Sequelize } = require('sequelize');

// Database Connection
const sequelize = new Sequelize(
  process.env.DATABASE_URL, // Connection string from environment variable
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Necessary for many cloud-hosted databases
      },
    },
    define: {
      createdAt: 'added', // Custom field names
      updatedAt: 'updated',
    },
  }
);

// authentication and synchronization
sequelize.authenticate()
  .then(() => {
    sequelize.sync().catch(() => console.log("Cannot sync the database"));
  })
  .catch(() => console.log("Cannot connect to database, please check environment credentials"));

module.exports = sequelize;