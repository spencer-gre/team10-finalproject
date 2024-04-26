import '../css/crossword.css'
import App from '../Crossword.svelte'

const app = new App({
  target: document.getElementById('crossword'),
})

export default app