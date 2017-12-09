import guards from '../common/typeguards'
import { controlBtn, createColorPicker, createImgMenu, mediaBarOne, menuBoxTop } from '../common/uiparts'

export const bgImgUI = (root: HTMLDocument): void => {
  const screen = root.getElementsByClassName('CommentScreen')[0]
  const layersColl = root.getElementsByClassName('hc-layer')
  const layer = layersColl[layersColl.length - 1]
  const bgColor = root.getElementsByClassName('bg_color')[0]
  if (!guards.isHTMLElem(screen)) return console.log('No screen found')
  if (!guards.isHTMLElem(layer)) return console.log('No layer found')
  if (!guards.isHTMLElem(bgColor)) return console.log('No bgColor found.')

  const toggleBox = (): void => {
    if (!guards.isHTMLElem(menuBoxNode)) return
    const state = menuBoxNode.style.display
    if (state === 'table') {
      menuBoxNode.style.display = 'none'
    } else if (state === 'none') {
      menuBoxNode.style.display = 'table'
    }
  }

  // stop, delete media element if exists
  const clearMedia = (): void => {
    bgColor.style.backgroundColor = 'transparent'
  }

  const changeBGColor = (event: Event): void => {
    if (!guards.isInput(event.target)) return
    bgColor.style.backgroundColor = event.target.value
  }

  const menu = menuBoxTop('imgmenubox')
  const menuBoxNode = screen.insertBefore(menu, layer)
  const imgMenu = createImgMenu()
  imgMenu.onclick = toggleBox
  screen.appendChild(imgMenu)

  const transpBar = mediaBarOne('img_transparent_bar')
  const transpBarNode = menuBoxNode.appendChild(transpBar)
  transpBarNode.onchange = (event: Event): void => {
    const mediaBox = root.getElementsByClassName('drop_media_box')[0]
    if (!guards.isHTMLElem(mediaBox)) return console.log('No mediaBox found.')
    if (!guards.isInput(event.target)) return
    const percent = event.target.value
    mediaBox.style.opacity = percent
  }

  const colorAlphaBar = mediaBarOne('color_trans_bar')
  colorAlphaBar.style.width = '80%'
  colorAlphaBar.style.cssFloat = 'left'
  const alphaColorNode = menuBoxNode.appendChild(colorAlphaBar)
  alphaColorNode.onchange = (event: Event): void => {
    if (!guards.isInput(event.target)) return
    const percent = event.target.value
    bgColor.style.opacity = percent
  }

  const colorPicker = createColorPicker()
  colorPicker.onchange = changeBGColor
  menuBoxNode.appendChild(colorPicker)

  const clearBtn = controlBtn()
  clearBtn.innerText = 'ｘ'
  clearBtn.onclick = clearMedia
  menuBoxNode.appendChild(clearBtn)

  if (guards.isHTMLElem(menuBoxNode)) menuBoxNode.style.display = 'none'
}
