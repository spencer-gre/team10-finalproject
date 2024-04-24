import '../css/hangman.css'
import App from '../Hangman.svelte'

const app = new App({
  target: document.getElementById('hangman'),
})

export default app