const average = arr => arr.reduce((a, b) => a + b) / arr.length

const extractTopics = obj => {
   
    const itemList = []
    for (let i in obj.topic) {
        const topic = obj.topic[i]

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
const testExtractTopics = topicList => {
    topicList.map(([name, weights]) => {
        console.assert(typeof name === "string", "the first element of topicList should be a string")
        console.assert(weights instanceof Array, "the second element should be an array of weights")
        weights.map(el => {
            console.assert(!Number.isNaN(el), "all the weights should be a number")
        })
    })
}

const createWeightedList = topicList => {
    
    for  (let i in average){
        const avg = average[i]
        const result =[ topic.name , average]
        topicList.push(result);
    }
    return topicList

}

const handleData = obj => {
    const topicList = extractTopics(obj)
    console.log(topicList)
    testExtractTopics(topicList)
    const weightList = createWeightedList(topicList)
    console.log(weightList)
}

// fetch data and generate the task list and the charts
fetch('https://raw.githubusercontent.com/quasilevel/ccsu-opendata/main/BCA/302.json')
.then(response => {
    return response.json();
}).then(handleData).catch(error => {
    console.error('Something went wrong ');
    console.error(error);
});
