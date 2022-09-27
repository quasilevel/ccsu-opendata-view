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

const cBar = (name, letter, weightPercent, weight) => `
  <span id="${letter}" class="chart-letter">${letter}</span>
  <div class="bar" style="width: ${weightPercent}%;"></div>
  <span class="bar-value">${weight.toFixed(1)}</span>
`

const cMarkers = (min, median, max) => `
  <span id="chart-stub"></span>
  <div id="marker">
    <span id="zero" style="left: 0%;">0</span>
    <span id="min" style="left: ${min.position}%;">${min.value}</span>
    <span id="median" style="left: ${median.position}%;">${median.value}</span>
    <span id="max" style="left: ${max.position}%;">${max.value}</span>
  </div>
`

const generateChart = (container, data) => {
  const sortedData = sort(data)
  const [min, median, max] = analyze(getWeights(sortedData))

  const ratioOverMax = ratio(max)

  const bars = (
    sortedData
    .reverse()
    .map((item, idx) => [item[NAME], idx, Math.min(Math.floor(ratioOverMax(item[WEIGHT]) * 100), 100), item[WEIGHT]])
    .map(item => cBar(...item))
    .join("")
  )

  const [pmin, pmedian, pmax] = ([min, median, max]).map(item => ({
    value: Math.round(item),
    position: Math.min(100, Math.floor(ratioOverMax(item) * 100)),
  }))

  const markers = cMarkers(pmin, pmedian, pmax)

  container.innerHTML = bars + markers;
}

export default generateChart
