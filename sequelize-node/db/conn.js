const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize2', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// try {
//   sequelize.authenticate();
// } catch (err) {
//   console.log('Não fori possível conectar: ', err);
// }

module.exports = sequelize;