const clfParser = require('clf-parser')

module.exports = (log) => {
  return log.reduce((stats, logLine) => {
    try {
      const { request, status: code } = clfParser(logLine) // parse the logline

      const [ verb, path, version ] = request.split(' ') // parse the request string

      const section = path.split('/')[1] // parse the section part of the path

      // merge the logline's stats with our current state
      return {
        sections: {
          ...stats.sections,
          [section]: (stats.sections[section] || 0) + 1
        },
        codes: {
          ...stats.codes,
          [code]: (stats.codes[code] || 0) + 1
        },
        versions: {
          ...stats.versions,
          [version]: (stats.versions[version] || 0) + 1
        },
        verbs: {
          ...stats.verbs,
          [verb]: (stats.verbs[verb] || 0) + 1
        }
      }
    } catch (err) {
      return stats // ignore logline in case of error (we can improve by printing a debug line)
    }
  }, { sections: {}, versions: {}, codes: {}, verbs: {} })
}
