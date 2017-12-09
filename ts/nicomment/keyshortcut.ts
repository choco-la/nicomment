import { ControlMedia } from '../common/ctrl_media'
import guards from '../common/typeguards'

export const spaceShortcut = (root: HTMLDocument): void => {
  const ctrl = new ControlMedia(root)
  const keyShortcut = (event: KeyboardEvent): void => {
    if (root.activeElement.tagName !== 'INPUT' && event.keyCode === 32) {
      ctrl.togglePlayStop()
      toggleIcon()
    }
  }

  const toggleIcon = () => {
    const media = root.getElementsByClassName('drop_playing')[0]
    const btn = root.getElementsByClassName('toggle_play_stop')[0]
    if (!guards.isAudio(media) && !guards.isVideo(media)) return console.log('No media found.')
    if (media.paused) {
      if (guards.canInnertext(btn)) btn.innerText = '▶'
    } else {
      if (guards.canInnertext(btn)) btn.innerText = '||'
    }
  }
  window.addEventListener('keydown', keyShortcut, false)
}
