// @ts-check

const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;

const extractTopics = (obj) => {
  const itemList = [];
  for (let i in obj.topics) {
    const topic = obj.topics[i];
    const ws = [];

    for (let j in topic.weights) {
      const weight = topic.weights[j];
      ws.push(weight.weight);
    }

    const item = [topic.name, ws];
    itemList.push(item);
  }
  return itemList;
};

const createWeightedList = (topicList) =>
  topicList.map(([name, weights]) => [name, average(weights)]);

const sort = (weightList) => weightList.sort((a, b) => b[1] - a[1]);

/**
 * analyzeTopics takes an object of the shape as described here: https://github.com/quasilevel/ccsu-opendata
 * and returns a sorted list of topics with their corresponding importance factor
 *
 * @typedef {string} TopicName  - Name of the topic
 * @typedef {number} Importance - Importance factor for the topic
 * @returns {Array.<[TopicName, Importance]>}
 */
const analyzeTopics = (obj) => {
  const topicslist = [];
  const numsum = [];
  const yearlist = [];
  var sampleNum=0
  var analyzeNum;
  //loop for year difference
  for (let i = 0; i < obj.topics.length; i++) {
    for (let j = 0; j < obj.topics[i].weights.length; j++) {
      yearlist.push(obj.topics[i].weights[j].year);
    }
  }
  // here is our total year of difference
  analyzeNum = Math.max(...yearlist) - Math.min(...yearlist) + 1;
  //loop for making array of all topics
  for (let i = 0; i < obj.topics.length; i++) {
    topicslist.push(obj.topics[i].name);
  }
  // loop for getting sum of weights and dividing by analyzeNum
  console.log(obj.topics[0].weights[0].weight);
  for (let i = 0; i < obj.topics.length; i++) {
    for (let j = 0; j < obj.topics[i].weights.length; j++) {
      sampleNum=sampleNum+obj.topics[i].weights[j].weight
    }
    numsum.push(sampleNum/analyzeNum)
    sampleNum=0
  }
  console.log(numsum);
  // Tushar Bhaiya your task is to concatinate topicslist and numsum

  return obj;
};

export default analyzeTopics;
