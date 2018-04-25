module.exports = ({ requestTimestamps, isAlerting, thresholdInterval, thresholdCount }) => {
  let i = 0

  // incrment the index until the timestamp >= thresholdInterval
  while (requestTimestamps[i] < Date.now() - thresholdInterval * 60 * 1000) i++

  // remove old timestamps
  const updatedRequestTimestamps = requestTimestamps.slice(i)

  // Return the updated timestamps array and if an alert should be in place
  return { updatedRequestTimestamps, shouldAlert: updatedRequestTimestamps.length > thresholdCount }
}
