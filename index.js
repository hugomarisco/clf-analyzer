const argv = require('yargs')
  .option('path', {
    alias: 'p',
    demandOption: true,
    describe: 'The path of the logfile to monitor',
    type: 'string'
  })
  .option('treshold-interval', {
    alias: 'i',
    describe: 'The window (in minutes) to watch for the request count for alerting',
    type: 'number',
    default: 2
  })
  .option('treshold-count', {
    alias: 'c',
    describe: 'The number of requests that trigger the alerting',
    type: 'number',
    default: 200
  })
  .example(
    'clf-analyzer --treshold-interval 4 --treshold-count 10 common.log',
    'Monitor common.log file for changes and alert when the number of requests for the past 4 minutes is more than 10'
  ).argv
