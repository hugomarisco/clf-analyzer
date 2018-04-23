[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# clf-analyzer
A simple Common Log Format analyzer

# Usage

```
Options:
  --help                   Show help                                   [boolean]
  --version                Show version number                         [boolean]
  --path, -p               The path of the logfile to monitor[string] [required]
  --treshold-interval, -i  The window (in minutes) to watch for the request
                           count for alerting              [number] [default: 2]
  --treshold-count, -c     The number of requests that trigger the alerting
                                                         [number] [default: 200]

Examples:
  clf-analyzer --treshold-interval 4        Monitor common.log file for changes
  --treshold-count 10 common.log            and alert when the number of
                                            requests for the past 4 minutes is
                                            more than 10
```
