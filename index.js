#! /usr/bin/env node

const { Tail } = require('tail')
const chalk = require('chalk')
const buildReport = require('./lib/reporting')
const checkThreshold = require('./lib/alerting')

// parse the cli arguments
const {
  path: logfilePath,
  interval: reportingInterval,
  limit: reportingLimit,
  thresholdInterval,
  thresholdCount
} = require('./lib/argv')

let logBuffer = [] // buffer to store logs for reporting

let requestTimestamps = [] // requests' timestamps

let isAlerting = false // alert flag

const logFileStream = new Tail(logfilePath) // tail the logfile

logFileStream.on('line', (logLine) => {
  requestTimestamps.push(Date.now()) // store timestamp to monitor threshold

  logBuffer.push(logLine) // store each logline in the buffer
})

// build and print a report every <reportingInterval> seconds
setInterval(() => {
  console.log(chalk.bold.underline(`\n\nR E P O R T | ${(new Date()).toUTCString()}`))

  Object.entries(buildReport(logBuffer)) // build a report based on the log buffer
    // Sort each metric on a descending order in terms of hits
    .map(([key, value]) => [ key, Object.entries(value).sort(([key1, value1], [key2, value2]) => value2 - value1) ])
    // print the results to the console
    .forEach(([key, values]) => {
      console.log(chalk.bold(`\n${key} statistics:`))

      values
        .slice(0, key === 'sections' ? reportingLimit : values.length) // truncate the section metrics
        .forEach(([key, value]) => console.log(`${key}: ${value}`))
    })

  logBuffer = [] // empty the buffer
}, reportingInterval * 1000)

setInterval(() => {
  const {
    shouldAlert,
    updatedRequestTimestamps
  } = checkThreshold({ requestTimestamps, logFileStream, thresholdInterval, thresholdCount })

  // if there's an update on the alerting status
  if (shouldAlert !== isAlerting) {
    const dateString = (new Date()).toUTCString()

    console.log(
      shouldAlert
        ? chalk.red(`Alert triggered - ${updatedRequestTimestamps.length} hits on ${dateString}`)
        : chalk.green(`Alert cleared on ${dateString}`)
    )

    // update the alert flag
    isAlerting = shouldAlert
  }

  // update the timestamps array
  requestTimestamps = updatedRequestTimestamps
}, 1000)
