import './app.css'
import App from './App.svelte'
import './lib/version';

const app = new App({
  target: document.getElementById('app')!,
})

export default app
