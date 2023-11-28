/* Full copyright to the author. No use allowed */
import App from './src/app.mjs';
import Clock from './src/components/clock.component.mjs'

window.document.addEventListener('alpine:init', () => {
  Alpine.data('main', App)
  Alpine.data('clock', Clock)
})