const fs = require('fs')
const path = require('path')
const readline = require('readline')
const EventEmitter = require('events')
const os = require('os')

/*
 * This class provides function to convert CSV file to JSON
 * and provides event to notify when conversion is complete
 */
class Csv2Json extends EventEmitter {

  // Main function to to call to start conversion
  convert(input, output) {

    var that = this

    console.log(`Starting conversion from ${input} to ${output}`)

    var writer = fs.createWriteStream(output);
    var fields = [];
    var seq = 0
    //var prev = ''
    var reader = readline.createInterface({input: fs.createReadStream(input)})

    // Callback function to process next line
    reader.on('line', (line) => {

      // If first header line  in CSV file
      if(seq==0) {
        fields = line.split(',')
        writer.write('[' + os.EOL)
      }
      // Write previous line with ',' at the end
      else if(seq > 1) {
        writer.write(',' + os.EOL)
      }

      if(seq > 0) {
        // Convert using Object method
        //writer.write(JSON.stringify(that.formatToObject(fields, line), null, 4 ))
        // convert directly to JSON string
        writer.write(that.formatToJson(fields, line))
      }
      seq++
    })

    // Callback to process end of the input file
    reader.on('close', ()=>{
      // Complete writing output file
      writer.end(os.EOL + ']', 'utf8', ()=>{
        console.log(`Complete, processed ${seq} records`)
        // Emit complete event
        this.emit('complete')
      })
    })

  }

  // Method to convert comma separated line into Object
  formatToObject(fields, line) {
    var obj = {}
    var vals = line.split(',')
    for(var i = 0; i < fields.length; i++) {
      obj[fields[i]]=vals[i]
    }
    return obj
  }

  // Method to convert comma separated line directly into JSON string
  formatToJson(fields, line) {
    var str = '  {' + os.EOL
    var vals = line.split(',')
    for(var i = 0; i < fields.length; i++) {
      str += '    \"' + fields[i] + '\": \"' + vals[i] + '\"' + (i<fields.length-1?',':'') + os.EOL
    }
    str +='  }'
    return str
  }

}

module.exports = Csv2Json
