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
  const calculatingYears = [];

  //Calculating all years
  for (let i in obj.topics) {
    for (let j in obj.topics[i].weights) {
      calculatingYears.push(obj.topics[i].weights[j].year);
    }
  }
  // Value for analyze Topics
  const devidingValue =
    Math.max(...calculatingYears) - Math.min(...calculatingYears) + 1;
  //Code for creating Result
  const result = [];
  let numberSum;
  for (let i in obj.topics) {
    var subResult = [];
    numberSum = 0;
    for (let j in obj.topics[i].weights) {
      numberSum += obj.topics[i].weights[j].weight;
    }
    subResult.push(obj.topics[i].name);
    subResult.push(numberSum / devidingValue);
    result.push(subResult);
  }
  return result;
};

export default analyzeTopics;
