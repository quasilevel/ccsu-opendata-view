const backdrop = document.querySelector("#backdrop")
const buttonGroup = document.querySelector("#button-group")

// create a row * cols grid in the backdrop
const [rows, cols] = [100, 100]
for (let i = 0; i < (rows * cols); i++) {
	backdrop.appendChild(
		document.createElement("div")
	)
}

const { width , height } = buttonGroup.getBoundingClientRect()

// percent is a curry-ed helper to calculate the percentage of val over max, hard clamped between [0, 100]
const percent = max => val => Math.max(0, Math.min(
	100, Math.floor(val * 100 / max)
))

// percent2D zips together two percent calculators returned by `percent`
const percent2D = (px, py) => (x, y) => [px(x), py(y)]

const percentWithinButtonGroup = percent2D(percent(width), percent(height))

// scaleAndClamp linearly transforms and hard-clamps a range of [0, 100] to [min, max]
const scaleAndClamp = (min, max) => val => Math.max(min, Math.min(
	max, ((val / 100) * (max - min)) + min
))

const sac = scaleAndClamp(25, 75) // the range is chosen based on the size of backdrop relative to the button group

const handler = ev => {
	const { clientX: cx, clientY: cy } = ev
	const { x: ex, y: ey } = buttonGroup.getBoundingClientRect()
	const [ox, oy] = [cx - ex, cy - ey] // mouse position relative to the button group's origin
	const [px, py] = percentWithinButtonGroup(ox, oy) // turn absolute positions to percentanges
	const [nx, ny] = [sac(px), sac(py)].map(a => a - 100) // - 100 because we are setting the css-translate instead of top/left
	
	backdrop.style.setProperty("--tx", `${nx}%`)
	backdrop.style.setProperty("--ty", `${ny}%`)
}

buttonGroup.addEventListener("mousemove", handler)
