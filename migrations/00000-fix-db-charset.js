require('dotenv').config();

module.exports = {
    up: (queryInterface, Sequelize) => {
      console.log(queryInterface)
      return queryInterface.sequelize.query(
          `ALTER DATABASE ${queryInterface.sequelize.config.database}
          CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
        )
    },
    down: (queryInterface, Sequelize) => Promise.resolve()
  }
