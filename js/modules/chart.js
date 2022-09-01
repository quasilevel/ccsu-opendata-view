const NAME = 0
const WEIGHT = 1

const sort = data => data.sort((a, b) => a[WEIGHT] - b[WEIGHT])

const median = sortedWeights => {
  const mid = sortedWeights.length / 2
  if (sortedWeights.length % 2 === 1) { // odd
    return sortedWeights[mid - 0.5]
  }
  // even
  return (sortedWeights[mid - 1] + sortedWeights[mid]) / 2
}

const getWeights = data => data.map(item[WEIGHT])

const analyze = sortedWeights => [sortedWeights[0], median(sortedWeights), sortedWeights[sortedWeights.length - 1]]

const generateChart = (container, data) => {
  const sortedData = sort(data)
  const [min, median, max] = analyze(getWeights(sortedData))
}

export default generateChart
