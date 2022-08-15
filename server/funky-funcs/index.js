const intersection = (...args) => {
  //why??????
  // let arg = [...arguments];
  function func(arrA, arrB) {
    return arrA.filter(elem => arrB.includes(elem))
  }
  return args.reduce((accu, current) => {
    return func(accu, current)
  })
}

const flattenDeep = (arr) => {
  let result = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      result = result.concat(flattenDeep(elem))
    } else {
      result.push(elem)      
    }
  })
  return result;
}
// ?????????????????
const flipArguments = (func) => {
  let argsArr = func.arguments.reverse()
  func(...argsArr)

}

const invert = (obj) => {
  let result = {}
  for (let key in obj) {
    let value = obj[key];
    result[value] = key
  }
  return result 
}

const camelCase = (str) => {
 let letters = 'abcdefghijklmnopqrstuvwxyz'
 let str2 = str.toLowerCase()
 let startIdx = 0
 let result = ''
 for (let i = 0; i < str.length; i++) {
  if(letters.includes(str2[i])){
    result = str2[i]
    startIdx = i+1;
    break;
  }
 }
 for (let i = startIdx; i < str.length; i++) {
    let char = str2[i]
    let previousChar = str2[i-1]
    if(letters.includes(char)){
      if (letters.includes(previousChar)){
        result += char
      } else {
        result += char.toUpperCase()
      }
    }
 }
 return result;
}

module.exports = {
  intersection,
  flattenDeep,
  flipArguments,
  invert,
  camelCase
}
