const { Tail } = require('tail')
const logParser = require('./lib/log-parser')

// parse the cli arguments
const { path: logfilePath, interval: reportingInterval, limit: reportingLimit } = require('./lib/argv')

let logBuffer = [] // initialize an array so we can store the loglines for reporting

const logfileStream = new Tail(logfilePath) // tail the logfile

logfileStream.on('line', (logLine) => logBuffer.push(logLine)) // store each logline in the buffer

setInterval(() => {
  const lastLogBuffer = logBuffer // store a reference to the current buffer

  logBuffer = [] // assign an empty array so new loglines don't end up in the old array

  const report = logParser(lastLogBuffer) // parse the log and build an object with the counters

  Object.entries(report)
    // Sort each metric on a descending order in terms of hits
    .map(([key, value]) => [ key, Object.entries(value).sort(([key1, value1], [key2, value2]) => value2 - value1) ])
    // print the results to the console
    .forEach(([key, values]) => {
      console.log(`\n${key} stats:`)

      values
        .slice(0, key === 'sections' ? reportingLimit : values.length) // truncate the section metrics
        .forEach(([key, value]) => console.log(`${key}: ${value}`))
    })
}, reportingInterval * 1000) // build and print a report every <reportingInterval> seconds
