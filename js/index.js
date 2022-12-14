import anime from '/js/modules/anime.es.js'

const grey = getComputedStyle(document.body).getPropertyValue("--grey")

// states describes the color and size animation states described below
const states = [
  [true, true],
  [true, false],
  [false, true],
  [false, false],
]

/**
 * play runs the staggered grid animation on the home page.
 * 
 * The animation changes color of the dots and the size of the dots in an alternating pattern.
 * The animation loops through the states encoded in the states variable.
 * Every other iteration, a new random dot's index is choosen as the center of the staggered effect.
 */
const play = (state=0, dotIdx=0) => {
  const [color, scale] = states[state] // retrieve the color direction, and the scale direction

  // next runs the next iteration of the animation, moving the state forward by a step (looping back to the first after last state).
  // it chooses a random dot every other iteration, or simply uses the previous dot
  const next = () => play((state + 1) % states.length, (state % 2 === 1) ? anime.random(0, 8 * 6) : dotIdx)
  anime({
    targets: '#dots div',
    backgroundColor: color ? [grey, '#000'] : ['#000', grey], // alternates between going from grey to black and from black to grey based on state
    scale: scale ? [1, 0.5] : [0.5, 1], // similarly for the size
    easing: 'linear',
    duration: 800,
    delay: anime.stagger(250, {grid: [8, 6], from: dotIdx}), // set the selected dot as the center for the stagger
    complete: async () => (state % 2 === 0) ? next() : setTimeout(next, 4000) // wait 4seconds before moving to the next iteration on every other iteration
  })
}

play()