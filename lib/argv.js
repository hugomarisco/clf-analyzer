module.exports = require('yargs')
  .option('path', {
    demandOption: true,
    describe: 'The path of the logfile to monitor',
    type: 'string'
  })
  .option('interval', {
    describe: 'The interval (in seconds) to report statistics',
    type: 'number',
    default: 10
  })
  .option('limit', {
    describe: 'The maximum number of paths to be reported',
    type: 'number',
    default: 5
  })
  .option('threshold-interval', {
    describe: 'The window (in minutes) to watch for the request count for alerting',
    type: 'number',
    default: 2
  })
  .option('threshold-count', {
    describe: 'The number of requests that trigger the alerting',
    type: 'number',
    default: 200
  })
  .example(
    'clf-analyzer --threshold-interval 4 --threshold-count 10 --path common.log',
    'Monitor common.log file for changes and alert when the number of requests for the past 4 minutes is more than 10'
  ).argv
