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

const getWeights = data => data.map(item => item[WEIGHT])

const analyze = sortedWeights => [sortedWeights[0], median(sortedWeights), sortedWeights[sortedWeights.length - 1]]

const letterAt = pos => String.fromCharCode(65 + pos)

const ratio = over => val => val / over

const generateChart = (container, data) => {
  const sortedData = sort(data)
  const [min, median, max] = analyze(getWeights(sortedData))

  const ratioOverMax = ratio(max)

  const processedData = (
    sortedData
    .map((item, idx) => [item[NAME], letterAt(idx), Math.min(Math.floor(ratioOverMax(item[WEIGHT]) * 100), 100)])
  )
}

export default generateChart
