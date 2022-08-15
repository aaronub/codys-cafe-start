const Sequelize = require('sequelize')
const db = require('./database')
const {DataTypes, Op} = require('sequelize')


const Coffee = db.define('coffee', {
  // your code here
  name:{
    type:Sequelize.STRING,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
})

Coffee.prototype.getIngredients = function (){
  return this.ingredients.join(', ');
}
Coffee.findByIngredient = function(ingredient){
  return Coffee.findAll({
    where:{
      ingredients:{
        [Op.contains]:[ingredient]
      }
    }
  })
}
// ?????
Coffee.beforeValidate((instance, options) => {
  if(!instance.ingredients){
    instance.ingredients = ['love'];
  }else if(!instance.ingredients.includes('love')) {
    instance.ingredients.push('love');
    // console.log(instance.ingredients)
  }
})
module.exports = Coffee
