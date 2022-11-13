const average = arr => arr.reduce((a, b) => a + b) / arr.length

const extractTopics = obj => {
  const itemList = []
  for (let i in obj.topics) {
    const topic = obj.topics[i]
    const ws = []

    for (let j in topic.weights){
      const weight = topic.weights[j]
      ws.push(weight.weight);
    }

    const item = [topic.name, ws]
    itemList.push(item);
  }
  return itemList  
}

const createWeightedList = topicList => topicList.map(([name, weights]) => [name, average(weights)])

const sort = weightList => weightList.sort((a, b) => b[1] - a[1])

// analyzeTopics takes an object of the shape as described here: https://github.com/quasilevel/ccsu-opendata
// and returns an array of topics with a computed weightage with the following shape:
// ```js
// [
// 	["topic 1", 12.9],
//  ["topic 2", 8],
//   ...
// ]
// ```
// the return type of analyzeTopics must be `[string, number][]` (in typescript)
const analyzeTopics = obj => {
  const topicList = extractTopics(obj)
  const weightList = createWeightedList(topicList)
  sort(weightList)
  
  return weightList
}

export default analyzeTopics