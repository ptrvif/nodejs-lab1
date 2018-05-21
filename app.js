const path = require('path')
const Csv2Json = require('./csv2json')

var converter = new Csv2Json()

console.log('Starting ...')

converter.on('complete', ()=>{
  console.log('Exiting ...')
  process.exit(0)
})

var input = process.argv[2]
if(!process.argv[2]) {
  input = path.join('data', 'test-data.csv')
}

var output = process.argv[3]
if(!process.argv[3]) {
  output = path.join('output', 'test-data.json')
}


converter.convert(input, output)
