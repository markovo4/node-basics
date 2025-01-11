const path = require('path')

const pathName = './fs/../txt/result.txt';
const normalizedPath = path.normalize(pathName)
const fileExt = path.extname(normalizedPath)

console.log(normalizedPath)
console.log('Extent name: ' + fileExt)
