const [rows, cols] = [100, 100]
const backdrop = document.querySelector("#backdrop")
const buttonGroup = document.querySelector("#button-group")

for (let i = 0; i < (rows * cols); i++) {
	backdrop.appendChild(
		document.createElement("div")
	)
}

const { width, height } = backdrop.getBoundingClientRect()
const { width: btnw, height: btnh } = buttonGroup.getBoundingClientRect()
const pos = {
	x: width / -2, y: height / -2
}

const percent = max => val => Math.max(0, Math.min(
	100, Math.floor(val * 100 / max)
))

const percent2D = (px, py) => (x, y) => [px(x), py(y)]
const btnp = percent2D(percent(btnw), percent(btnh))

const scaleAndClamp = (min, max) => val => Math.max(min, Math.min(
	max, ((val / 100) * (max - min)) + min
))
const sac = scaleAndClamp(25, 75)
console.log(scaleAndClamp(25, 75)(0))

const handler = (p) => async ev => {
	const { clientX: cx, clientY: cy } = ev
	const { x: ex, y: ey } = buttonGroup.getBoundingClientRect()
	const [ox, oy] = [cx - ex, cy - ey]
	const [px, py] = btnp(ox, oy)
	const [nx, ny] = [sac(px), sac(py)].map(a => a - 100)
	
	backdrop.style.setProperty("--tx", `${nx}%`)
	backdrop.style.setProperty("--ty", `${ny}%`)
}

buttonGroup.addEventListener("mousemove", handler(pos))
