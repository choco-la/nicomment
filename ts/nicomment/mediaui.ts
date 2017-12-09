import { ControlMedia } from '../common/ctrl_media'
import guards from '../common/typeguards'
import { controlBtn, createShowArea, mediaBarCent, menuBoxBottom } from '../common/uiparts'

export const mediaUI = (root: HTMLDocument): void => {
  // if isSeek is true, dont adjust
  let isSeek = false
  const ctrl = new ControlMedia(root)

  const dropArea = root.getElementsByClassName('CommentPanel is-active')[0]
  const screen = root.getElementsByClassName('CommentScreen')[0]
  const layersColl = root.getElementsByClassName('hc-layer')
  const layer = layersColl[layersColl.length - 1]
  if (!guards.isHTMLElem(dropArea)) return console.log('No dropArea found')
  if (!guards.isHTMLElem(screen)) return console.log('No screen found')
  if (!guards.isHTMLElem(layer)) return console.log('No layer found')

  const toggleBox = (): void => {
    const state = menuBoxNode.style.display
    if (state === 'table') {
      menuBoxNode.style.display = 'none'
    } else if (state === 'none') {
      menuBoxNode.style.display = 'table'
    }
  }

  const menu = menuBoxBottom('menubox')
  const menuBoxNode = screen.insertBefore(menu, layer)
  const showArea = createShowArea()
  showArea.onclick = toggleBox
  screen.insertBefore(showArea, layer)

  const playBtn = controlBtn()
  playBtn.className = 'toggle_play_stop'
  playBtn.addEventListener('click', () => ctrl.togglePlayStop(), false)
  playBtn.addEventListener('click', (event: Event) => ctrl.toggleIcon(event), false)
  playBtn.innerText = '||'
  menuBoxNode.appendChild(playBtn)

  const timeBar = mediaBarCent('mediabar')
  const timeBarNode = menuBoxNode.appendChild(timeBar)
  timeBarNode.onchange = (event: Event): void => {
    isSeek = true
    const media = root.getElementsByClassName('drop_playing')[0]
    if (!guards.isAudio(media) && !guards.isVideo(media)) return console.log('No media found.')
    if (!guards.isInput(event.target)) return
    const percent = parseFloat(event.target.value) / 100
    const medialength = media.duration
    const seektime = medialength * percent
    media.currentTime = seektime
  }

  const muteBtn = controlBtn()
  muteBtn.onclick = (event: Event) => ctrl.muteMedia(event)
  muteBtn.innerText = '🔊'
  menuBoxNode.appendChild(muteBtn)

  const clearBtn = controlBtn()
  clearBtn.innerText = 'ｘ'
  // this.root becomes undefined
  // clearBtn.addEventListener('click', ctrl.clearMedia, false)
  clearBtn.addEventListener('click', () => ctrl.clearMedia(), false)
  clearBtn.addEventListener('click', () => { timeBar.value = '0' }, false)
  menuBoxNode.appendChild(clearBtn)

  const adjustTime = () => {
    // avoid overwrite seeking value
    if (isSeek === true) {
      isSeek = false
      return
    }
    const media = root.getElementsByClassName('drop_playing')[0]
    if (!guards.isAudio(media) && !guards.isVideo(media)) return console.log('No media found.')
    const medialength = media.duration
    const current = media.currentTime
    timeBar.value = String(current / medialength * 100)
    isSeek = false
  }

  // adjust seekbar position to media currentTime
  // media.timeupdate is too severe to seek
  setInterval(adjustTime, 1000)
  menuBoxNode.style.display = 'none'

  dropArea.addEventListener('drop', () => ctrl.initBtn(), false)

}
