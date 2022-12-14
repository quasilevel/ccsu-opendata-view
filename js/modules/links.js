const $ = document

// FIXME: this map is duplicated in /js/view.js
const codeList = new Map([
  ["Semester 1", new Set(["101", "102", "103", "104", "105", "008"])],
  ["Semester 2", new Set(["201", "202", "203", "204", "205"])],
  ["Semester 3", new Set(["301", "302", "303", "304", "305"])],
  ["Semester 4", new Set(["401", "402", "403", "404", "405", "406"])],
  ["Semester 5", new Set(["501", "502", "503", "504"])],
  ["Semester 6", new Set(["601", "602", "603", "604"])],
])

// the number of links required to show all possible subject codes + one link to show the back button
const reqLinks = ((codeList) => [...codeList].map(el => el[1].size).reduce((a, b) => Math.max(a, b)) + 1)(codeList)

// adding more links to the dom if the available links are less than the required number of links
{
  const cLink = () => {
    const el = $.createElement("a")
    el.classList.add("hide")
    el.dataset.semester = "\u00A0" // the unicode non-block space character. without this, css wont properly render the link
    return el
  }
  const diff = reqLinks - $.querySelectorAll("#buttons > a").length
  for (let i = 0; i < diff; i++) {
    $.querySelector("#buttons").appendChild(cLink())
  }
}

const buttons = $.querySelectorAll("#buttons > a")

const back = (opener) => ev => { // opener is just a refrence to the openSemester function below
  ev.preventDefault()
  document.querySelector('#action-hint').innerText = 'Choose Semester:'
  buttons[0].removeEventListener("click", back)

  // clean up the classlist
  buttons.forEach(el => (el.classList.remove("show"), el.classList.remove("hide"), el.href = "#"))

  // hide the links which are not needed
  Array.from(buttons).slice(codeList.size).map(el => el.classList.add("hide"))

  buttons.forEach(el => el.addEventListener("click", opener))
}

const openSemester = ev => {
  ev.preventDefault()
  document.querySelector('#action-hint').innerText = 'Choose Subject Code:'
  buttons.forEach(el => (el.classList.add("show"), el.removeEventListener("click", openSemester)))

  // set the first element as the back button
  buttons[0].dataset.code = "<-"
  buttons[0].addEventListener("click", back(openSemester))

  // show the codes for the selected semester
  const codes = [...codeList.get(ev.target.dataset.semester)]
  Array.from(buttons).slice(codes.length + 1).map(el => el.classList.add("hide"))
  codes.map((code, idx) => {
    const button = buttons[idx + 1]
    button.dataset.code = code
    button.classList.add("show")
    button.classList.remove("hide")
    button.href = `./view.html?code=${code}`
  })
}

buttons.forEach(el => {
  el.addEventListener("click", openSemester)
})
