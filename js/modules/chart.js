// type Data = [string, number][]

// Where the first element of each tuple is the name for that record and the second is the value for that record
const NAME = 0
const VALUE = 1

// sorts `Data` based on the values in ascending order
const sort = data => data.sort((a, b) => a[VALUE] - b[VALUE])

const median = sortedWeights => {
  const mid = sortedWeights.length / 2
  if (sortedWeights.length % 2 === 1) { // odd
    return sortedWeights[mid - 0.5]
  }
  // even
  return (sortedWeights[mid - 1] + sortedWeights[mid]) / 2
}

const getWeights = data => data.map(item => item[VALUE])

// analyze returns the min, median, and max values from the sorted number[]
const analyze = sortedWeights => [sortedWeights[0], median(sortedWeights), sortedWeights[sortedWeights.length - 1]]

// ratio is a helper curry-ed function to calculate ratios
const ratio = over => val => val / over

// cBar creates the bar in the bar chart
const cBar = (_name, letter, sizeInPercent, weight) => `
  <span id="${letter}" class="chart-letter">${letter}</span>
  <div class="bar" style="width: ${sizeInPercent}%;"></div>
  <span class="bar-value">${weight.toFixed(1)}</span>
`

// cMarkers creates the markers on the X axis for the chart.
// It places the min, median, and max in their accurate location.
// which of course is, 100% for max; and appropriately calculated for the median, and max by the caller
//
// FIXME: allow arbitrary number of markers by taking an array of markers as input and de-hardcoding the span ids
const cMarkers = (min, median, max) => `
  <span id="chart-stub"></span>
  <div id="marker">
    <span id="zero" style="left: 0%;">0</span>
    <span id="min" style="left: ${min.position}%;">${min.value}</span>
    <span id="median" style="left: ${median.position}%;">${median.value}</span>
    <span id="max" style="left: ${max.position}%;">${max.value}</span>
  </div>
`

// generateChart takes an html element container and some `Data` and generates the chart for it and places the chart in the container
const generateChart = (container, data) => {
  const sortedData = sort(data)
  const [min, median, max] = analyze(getWeights(sortedData))

  const ratioOverMax = ratio(max)

  const bars = (
    sortedData
    .reverse() // descending order
    // this map converts each [NAME, VALUE] to [NAME, index, the percentage of value relative to max, the value itself]
    .map((item, idx) => [item[NAME], idx, Math.min(Math.floor(ratioOverMax(item[VALUE]) * 100), 100), item[VALUE]])
    .map(item => cBar(...item)) // make bars for each computer value
    .join("")
  )

  // convert the absolute min, median, max to percentages relative to the max
  const [pmin, pmedian, pmax] = ([min, median, max]).map(item => ({
    value: Math.round(item), // round the value for readability
    position: Math.min(100, Math.floor(ratioOverMax(item) * 100)), // the percentage relative to the max
  }))

  const markers = cMarkers(pmin, pmedian, pmax)

  container.innerHTML = bars + markers;
}

export default generateChart
