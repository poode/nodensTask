module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
