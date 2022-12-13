import analyzeTopics from "./modules/weight.js"

const average = (vals) => vals.reduce((a, b) => a + b) / vals.length

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
const getProgress = inputs => () => average(inputs.map(el => el.checked ? 1 : 0)) * 100
const scaleInRage = ((min, max) => percentile => ((max - min) * (percentile / 100)) + min)(30, 68)
const setProgress = gp => () => {
  const progress = Math.round(gp())
  const progressStr = progress.toString().padStart(3, "0")
  const progressClass = progress === 0 ? "hidden" : "visible"
  document.querySelector("#progress-value").innerText = `${progressStr}%`
  document.querySelector("#progress-circle").style.strokeDashoffset = `${scaleInRage(100 - progressStr)}px`
  document.querySelector("#progress").dataset.state = progressClass
}
  
const handleData = async subject => {
  const weightList = analyzeTopics(subject)

  document.querySelector("#intro h1").innerText = subject.title

  const lis = weightList.map(cListItem).join("")
  document.querySelector("ul").innerHTML = lis

  const inputs = document.querySelectorAll("ul input")
  const gp = getProgress(Array.from(inputs))
  inputs.forEach(el => el.addEventListener("change", setProgress(gp)))

  const { default: generateChart } = await import("./modules/chart.js")
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
