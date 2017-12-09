import guards from '../common/typeguards'
import { movieJS } from '../nicomment/movie'
const main = (): void => {
  try {
    removeUpload()
  } catch (err) {
    console.log(err)
  }

  // create control panel to append buttons
  const frameControlPanel = createBtnBox('frame_control_panel', '#EBEBEB')
  if (!guards.isHTMLElem(frameControlPanel)) return

  // append delete-iframe button, regist event listener
  const deleteIFrameBtn = controlButton('nicomment形式を削除', 'delete_iframe_btn')
  const deleteIframeBtnNode = frameControlPanel.appendChild(deleteIFrameBtn)
  deleteIframeBtnNode.addEventListener('click', (_: Event): void => {
    const delNode = document.getElementsByClassName('nicomment_inner_frame')[0]
    if (!guards.isHTMLElem(delNode) || !delNode.parentNode) return
    delNode.parentNode.removeChild(delNode)
    insertIframeBtnNode.disabled = false
    deleteIframeBtnNode.disabled = true
  }, false)

  // append insert-iframe button, regist event listener
  const insertIFrameBtn = controlButton('nicomment形式を表示', 'insert_iframe_btn')
  const insertIframeBtnNode = frameControlPanel.appendChild(insertIFrameBtn)
  insertIframeBtnNode.addEventListener('click', (_: Event): void => {
    const insNode = document.getElementsByClassName('nicomment_inner_frame')[0]
    if (insNode !== undefined || !guards.isHTMLElem(nicommentOuterFrame)) return
    insertNicommendIFrame(nicommentOuterFrame)
    insertIframeBtnNode.disabled = true
    deleteIframeBtnNode.disabled = false
  }, false)

  // append toggle-columns-display button, regist event listener
  const toggleColumnsBtn = controlButton('カラムの表示切替', 'toggle_columns_btn')
  const toggleColumnsBtnNode = frameControlPanel.appendChild(toggleColumnsBtn)
  toggleColumnsBtnNode.addEventListener('click', toggleColumnsDisplay, false)

  // append nicomment iframe to column-area at first
  const nicommentOuterFrame = document.getElementsByClassName('columns-area')[0]
  // insertNicommendIFrame(nicommentOuterFrame)
}

// not to upload when drop files
const removeUpload = (): void => {
  const upload = document.getElementsByClassName('upload-area')[0]
  if (!guards.isHTMLElem(upload) || !upload.parentNode) return
  upload.parentNode.removeChild(upload)
}

// control-button box
const createBtnBox = (classname: string, color: string): HTMLDivElement | void => {
  const box = document.createElement('div')
  box.style.display = 'block'
  box.style.position = 'relative'
  box.style.height = 'auto'
  box.style.width = '100%'
  box.style.bottom = '0.0em'
  box.style.textAlign = 'center'
  box.style.backgroundColor = color
  box.style.borderRadius = '1%'
  box.className = classname

  const drawer = document.getElementsByClassName('drawer__inner')[0]
  if (!guards.isHTMLElem(drawer)) return console.log('No drawer found')
  const newnode = drawer.appendChild(box)
  return newnode
}

const onFrameLoad = (): void => {
  const frame = document.getElementsByClassName('nicomment_inner_frame')[0]
  if (!guards.isIFrame(frame)) return
  const root = frame.contentWindow.document
  if (!guards.isHTMLDoc(root)) return console.log('root is not HTMLDocument')
  movieJS(root)
}

// append nicomment iframe to node
const insertNicommendIFrame = (node: HTMLElement): HTMLElement => {
  const frame = document.createElement('iframe')
  frame.src = '/nicomment'
  frame.style.display = 'block'
  frame.style.height = 'auto'
  frame.style.width = '100%'
  frame.style.marginTop = '10px'
  frame.style.marginBottom = '10px'
  frame.className = 'nicomment_inner_frame'

  const frameNode = node.appendChild(frame)
  frameNode.onload = onFrameLoad
  return frameNode
}

// control button constructor
const controlButton = (text: string, classname: string): HTMLButtonElement => {
  const elem = document.createElement('button')
  elem.style.display = 'block'
  elem.style.height = '3.0em'
  elem.style.lineHeight = elem.style.height
  elem.style.width = '94%'
  elem.style.color = '#FFFFFF'
  elem.style.border = 'none'
  elem.style.backgroundColor = '#747F9A'
  elem.style.margin = '3%'
  elem.className = classname
  elem.style.borderRadius = '0.4em'
  elem.innerText = text

  elem.onmouseover = (event: MouseEvent): void => {
    if (!guards.isHTMLElem(event.target)) return
    event.target.style.opacity = '0.8'
  }

  elem.onmouseout = (event: MouseEvent): void => {
    if (!guards.isHTMLElem(event.target)) return
    event.target.style.opacity = '1.0'
  }

  return elem
}

// toggle displaying columns
const toggleColumnsDisplay = (): void => {
  const columnList = document.getElementsByClassName('column')
  Array.prototype.forEach.call(columnList, (element: HTMLElement): void => {
    const state = element.style.display
    // state is blank at first
    if (state === 'none') {
      element.style.display = 'flex'
    } else {
      element.style.display = 'none'
    }
  })
}

setTimeout(main, 1000)
