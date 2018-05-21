# nodejs-lab1
NodeJS EDX course,  assignment 1

# Design
The code consists of two files

## csv2json.js
Converter module.
Provides asynchronous API to convert csv file into JSON file.
The main function is 'convert(input_file_name, output_file_name)'
The following code demonstrates how this module can be used.

```javascript
// Import module
const Csv2Json = require('./csv2json')

// Create converter instance
var converter = new Csv2Json()

// Register call back listener to be notified when conversion is completed
converter.on('complete', ()=>{
  // ...you code goes here
})

// Start conversion
converter.convert(input, output)
```

Internally, Converter class is implemented by extending EventEmitter to support events for notifying when conversion is completed.
Input CSV file is processed line by line, each line is:
* parsed
* converted into JSON
* JSON written to output file
This allows handling larger file without concerning about process memory requirements.

There are two alternative implementations to convert CSV line into JSON:
* creating an Object, populating its fields and then using 'JSON.stringify' to convert object into JSON string
* generating JSON string directly by appending fields and values to the string
The first method is simpler but it does not produces exact paddings 9white spaces at the beginning of JSON string)
The second method is  a bit more complex but it allows to produce exact output format including correct padding (white spaces at the beginning of the output strings)

## app.js
The main application file which can be executed to convert csv file to json.
it can be executed with two command line arguments as shown below:
```javascript
node app.js data\customer-data.csv output\customer-data.json
```
Arguments are:
* first argument is input CSV file name
* second argument is output JSON file name

If argumetns are not provided the following input and output files will be used by default:
* input file: data\test-data.csv
* output file: output\test-data.json
