[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# clf-analyzer
A simple Common Log Format analyzer

# Run application

- Run from source:

`node index.js --help`

- Run using **npx**:

`npx clf-analyzer --help`

# Usage

```
Options:
  --help                Show help                                      [boolean]
  --version             Show version number                            [boolean]
  --path                The path of the logfile to monitor   [string] [required]
  --interval            The interval (in seconds) to report statistics
                                                          [number] [default: 10]
  --limit               The maximum number of paths to be reported
                                                           [number] [default: 5]
  --threshold-interval  The window (in minutes) to watch for the request count
                        for alerting                       [number] [default: 2]
  --threshold-count     The number of requests that trigger the alerting
                                                         [number] [default: 200]
```

# Testing

Run `npm test`

# What could be improved?

- Error handling
- Output organization and design
- Compare the performance of building the report once every interval (the adopted solution) or build it incrementally when we process a log line
- More test coverage
- Better naming (variables, functions, files)
