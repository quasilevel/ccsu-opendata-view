import anime from '/js/modules/anime.es.js'

const grey = getComputedStyle(document.body).getPropertyValue("--grey")

const states = [
  [true, true],
  [true, false],
  [false, true],
  [false, false],
]

const play = (forward=0, rand=0) => {
  const [color, scale] = states[forward]
  const next = () => play((forward + 1) % 4, (forward % 2 === 1) ? anime.random(0, 8 * 6) : rand)
  anime({
    targets: '#dots div',
    backgroundColor: color ? [grey, '#000'] : ['#000', grey],
    scale: scale ? [1, 0.5] : [0.5, 1],
    easing: 'linear',
    duration: 800,
    delay: anime.stagger(250, {grid: [8, 6], from: rand}),
    complete: async () => (forward % 2 === 0) ? next() : setTimeout(next, 4000)
  })
}

play()