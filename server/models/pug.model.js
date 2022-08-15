const Sequelize = require('sequelize')
const db = require('./database')
const Coffee = require('./coffee.model')

const Pug = db.define('pugs', {
  // your code here
  name: {
    type:Sequelize.STRING,
    allowNull: false
  },
  age: {
    // ?
    type:Sequelize.INTEGER,
    defaultValue: 0
  },
  biography: {
    type:Sequelize.TEXT,
  }
})

Pug.prototype.isPuppy = function () {
  return !this.age
}

Pug.prototype.shortBio = function() {
  const punc = /[.,?,!]/g
  const idx = this.biography.search(punc)
  return this.biography.slice(0, idx)
}

Pug.findByCoffee = async function(coffeeName){
  const pugs = await this.findAll({
    include: {
      model: Coffee,
      as: 'favoriteCoffee',
      where: {
        name: coffeeName
      }
    }
  })
  // console.log(pugs)
  return pugs
}

Pug.beforeValidate(instance => {
  instance.name =  instance.name[0].toUpperCase() + instance.name.slice(1)
}) 


// Pug.findByCoffee = async function(name){
//   const coffee = await Coffee.findAll({
//     where:{
//       name: name
//     }
//   })
//   let id = coffee[0].id;
//   const pugs = await Pug.findAll({
//     where:{
//       favoriteCoffeeId: id
//     }
//   }) 
//   return pugs
// }

module.exports = Pug
