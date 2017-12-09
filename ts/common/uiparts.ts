export const menuBoxTop = (name: string): HTMLDivElement => {
  const menuBoxElem = document.createElement('div')
  menuBoxElem.style.position = 'absolute'
  menuBoxElem.style.top = '0.2em'
  menuBoxElem.style.width = '100%'
  menuBoxElem.style.display = 'table'
  menuBoxElem.style.opacity = '1.0'
  menuBoxElem.style.margin = 'auto'

  menuBoxElem.style.zIndex = '95'
  menuBoxElem.style.backgroundColor = '#FFD0E5'
  menuBoxElem.style.border = '0.1em solid'
  menuBoxElem.style.borderBottom = '0.0em'

  menuBoxElem.setAttribute('class', name)
  return menuBoxElem
}

export const menuBoxBottom = (name: string): HTMLDivElement => {
  const menuBoxElem = document.createElement('div')
  menuBoxElem.style.position = 'absolute'
  menuBoxElem.style.bottom = '0.2em'
  menuBoxElem.style.width = '100%'
  menuBoxElem.style.display = 'table'
  menuBoxElem.style.opacity = '1.0'
  menuBoxElem.style.margin = 'auto'

  menuBoxElem.style.zIndex = '95'
  menuBoxElem.style.backgroundColor = '#FFD0E5'
  menuBoxElem.style.border = '0.1em solid'
  menuBoxElem.style.borderBottom = '0.0em'

  menuBoxElem.setAttribute('class', name)
  return menuBoxElem
}

export const mediaBarOne = (name: string): HTMLInputElement => {
  const barElem = document.createElement('input')
  barElem.style.display = 'table-cell'
  barElem.type = 'range'
  barElem.min = '0.0'
  barElem.max = '1.0'
  barElem.step = '0.1'
  barElem.value = '1.0'
  barElem.setAttribute('class', name)

  barElem.style.margin = 'auto'
  barElem.style.height = '100%'
  barElem.style.width = '100%'
  return barElem
}

export const mediaBarCent = (name: string): HTMLInputElement => {
  const barElem = document.createElement('input')
  barElem.style.display = 'table-cell'
  barElem.type = 'range'
  barElem.min = '0'
  barElem.max = '100'
  barElem.step = '1'
  barElem.value = '0'
  barElem.setAttribute('class', name)

  barElem.style.margin = 'auto'
  barElem.style.height = '100%'
  barElem.style.width = '100%'
  return barElem
}

export const controlBtn = (): HTMLDivElement => {
  const btnFrame = document.createElement('div')
  btnFrame.style.display = 'table-cell'
  btnFrame.style.width = '6%'
  btnFrame.style.paddingLeft = '1%'
  btnFrame.style.verticalAlign = 'middle'
  btnFrame.style.fontSize = '0.6em'
  return btnFrame
}

export const createImgMenu = (): HTMLElement => {
  const area = document.createElement('div')
  area.style.display = 'block'
  area.style.position = 'absolute'
  area.style.top = '0.0em'
  area.style.height = '0.2em'
  area.style.width = '100%'
  area.style.zIndex = '99'
  area.style.backgroundColor = '#6B6B6B'
  area.className = 'show_imgmenu_area'
  return area
}

export const createColorPicker = (): HTMLElement => {
  const picker = document.createElement('input')
  picker.type = 'color'
  picker.style.display = 'table-cell'
  picker.style.cssFloat = 'none'
  picker.style.marginLeft = '4%'
  picker.style.width = '8%'
  return picker
}

export const createShowArea = (): HTMLElement => {
  const area = document.createElement('div')
  area.style.display = 'block'
  area.style.position = 'absolute'
  area.style.bottom = '0.0em'
  area.style.height = '0.2em'
  area.style.width = '100%'
  area.style.zIndex = '99'
  area.style.backgroundColor = '#6B6B6B'
  area.className = 'show_control_area'
  return area
}
