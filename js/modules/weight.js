/**
 * analyzeTopics takes an object of the shape as described here: https://github.com/quasilevel/ccsu-opendata
 * and returns a sorted list of topics with their corresponding importance factor
 *
 * FIXME: write some tests to ensure behavioral integrity
 * 
 * @typedef {string} TopicName  - Name of the topic
 * @typedef {number} Importance - Importance factor for the topic
 * @returns {Array.<[TopicName, Importance]>}
 */
const analyzeTopics = (obj) => {
  // create a list of all years present in data
  const years = obj.topics.flatMap(topic => topic.weights.map(weight => weight.year))

  // sorting the list will put the min year at the first position, and the max year at the last position
  years.sort()

  // unpack the min and max year
  const [minYear, maxYear] = [years[0], years[years.length - 1]]
  const totalYears = maxYear - minYear + 1 // plus 1 to division by zero later

  // since we intend on giving linearly increasing weights to the years (eg: 2018=>1, 2019=>2, 2020=>3, ...),
  // we can calculate the sum of weighted year as the totalYears' correspoding triangle number
  const weightedTotalYear = (totalYears * (totalYears + 1)) / 2

  return obj.topics.map(topic => [
    topic.name,
    // reduce the weights to the importance factor by calculating the weighted average, using the year to calculate the weight
    // also, for years that this topic did not appear in we are considering 0 marks,
    // which means we do not need any special treatment for them
    topic.weights.reduce((acc, { year, weight}) => acc + ((year - minYear + 1) * weight), 0) / weightedTotalYear
  ]).sort(([_nameA, a], [_nameB, b]) => b - a) // sort descendingly based on the importance factor
}

export default analyzeTopics