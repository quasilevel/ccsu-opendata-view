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

const createWeightedList = topicList => topicList.map(([name, weights]) => [name, average(weights)])

const sort = weightList => weightList.sort((a, b) => b[1] - a[1])

const cListItem = ([name, weight], idx) => `
<li title="${name} has ${weight.toLocaleString("en-IN", {maximumFractionDigits: 2})} weightage on average">
  <label for="q${idx}">${name}</label><input type="checkbox" id="q${idx}">
</li>
`

const codeList = new Map([
  ["Semester 1", new Set(["101", "102", "103", "104", "105", "008"])],
  ["Semester 2", new Set(["201", "202", "203", "204", "205"])],
  ["Semester 3", new Set(["301", "302", "303", "304", "305"])],
  ["Semester 4", new Set(["401", "402", "403", "404", "405", "406"])],
  ["Semester 5", new Set(["501", "502", "503", "504"])],
  ["Semester 6", new Set(["601", "602", "603", "604"])],
])

const getRelated = _code => {
  const code = String(_code)
  for (const [_sem, codes] of codeList) {
    if (!codes.has(code)) continue
    return [...codes].filter(it => it != code)
  }
}

const genRef = code => {
  const url = new URL(location)
  url.searchParams.set("code", code)
  return url
}

const cLink = code => `
<a href="${genRef(code)}">${code}</a>
`

const handleData = async subject => {
  const topicList = extractTopics(subject)
  const weightList = createWeightedList(topicList)
  sort(weightList)

  document.querySelector("#intro h1").innerText = subject.title

  const lis = weightList.map(cListItem).join("")
  document.querySelector("ul").innerHTML = lis

  const { default: generateChart } = await import("/js/modules/chart.js")
  generateChart(document.querySelector("#chart-container"), weightList)
}

const code = new URLSearchParams(location.search).get("code")

// fetch data and generate the task list and the charts
fetch(`https://raw.githubusercontent.com/quasilevel/ccsu-opendata/main/BCA/${code}.json`)
.then(response => {
    return response.json();
}).then(handleData).catch(error => {
    console.error('Something went wrong ');
    console.error(error);
});


const links = getRelated(code).map(cLink).join("")

document.querySelector("#button-group").innerHTML = links
