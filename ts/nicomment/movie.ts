import guards from '../common/typeguards'
export const movieJS = (root: HTMLDocument): void => {
  //  /^video\/.*/ breaks syntax highlight
  const reVideoType = new RegExp('^video/.*')
  const reAudioType = new RegExp('^audio/.*')
  const reImageType = new RegExp('^image/.*')

  const reader = new FileReader()

  const screen = root.getElementsByClassName('CommentScreen')[0]
  const layersColl = root.getElementsByClassName('hc-layer')
  const layer = layersColl[layersColl.length - 1]
  if (!guards.isHTMLElem(screen)) return console.log('No screen found')
  if (!guards.isHTMLElem(layer)) return console.log('No layer found')

  const loadVideo = (file: File): () => void => {
    return () => {
      const blobUrl = window.URL.createObjectURL(file)
      const type = appendVideo.tagName.toLowerCase()
      appendVideo.setAttribute('src', blobUrl)
      appendVideo.className = `drop_${type} drop_playing`
      appendVideo.style.display = 'block'
      if (guards.isVideo(appendVideo)) appendVideo.play()
    }
  }

  const loadAudio = (file: File): () => void => {
    return () => {
      const blobUrl = window.URL.createObjectURL(file)
      const type = appendVideo.tagName.toLowerCase()
      appendAudio.setAttribute('src', blobUrl)
      appendAudio.className = `drop_${type} drop_playing`
      appendAudio.style.display = 'block'
      if (guards.isAudio(appendAudio)) appendAudio.play()
    }
  }

  // image
  const loadImg = (file: File): () => void => {
    return () => {
      const blobUrl = window.URL.createObjectURL(file)
      const img = `url(${blobUrl})`
      boxNode.style.backgroundImage = img
    }
  }

  const handleDragOver = (event: DragEvent): boolean => {
    event.stopPropagation()
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    return false
  }

  const handleDrop = (event: DragEvent): void => {
    event.stopPropagation()
    event.preventDefault()

    const files = event.dataTransfer.files
    const file = files[0]
    console.log('load')

    switch (true) {
      case reVideoType.test(file.type):
        if (!guards.isVideo(videoElement)) return
        if (videoElement.canPlayType(file.type) !== '') {
          console.log('load video')
          reader.onload = loadVideo(file)
          // Don't use image to background.
          boxNode.style.backgroundImage = 'none'
          reader.readAsDataURL(file)
        }
        break
      case reAudioType.test(file.type):
        if (!guards.isAudio(audioElement)) return
        if (audioElement.canPlayType(file.type) !== '') {
          console.log('load audio')
          reader.onload = loadAudio(file)
          reader.readAsDataURL(file)
        }
        break
      case reImageType.test(file.type):
        console.log('load img')
        reader.onload = loadImg(file)
        reader.readAsDataURL(file)
        break
    }
  }

  // stop, delete media element if exists
  const haltMedia = (): void => {
    const media = root.getElementsByClassName('drop_playing')[0]
    if (!guards.isAudio(media) && !guards.isVideo(media)) return console.log('No media found.')
    console.log('rm media')
    media.removeAttribute('src')
    media.load()
    media.className = 'drop_' + media.tagName.toLowerCase()
    media.style.display = 'none'
  }

  // media handling constructor
  const mediaBox = (): HTMLDivElement => {
    const divElem = root.createElement('div')

    divElem.style.position = 'relative'
    divElem.style.display = 'block'
    divElem.style.height = '100%'
    divElem.style.width = '100%'
    divElem.style.zIndex = '-1'
    divElem.setAttribute('class', 'drop_media_box')

    divElem.style.backgroundSize = 'cover'
    divElem.style.backgroundPosition = 'center center'
    return divElem
  }

  const mediaToAppend = (type: string): HTMLElement => {
    const mediaElem = root.createElement(type)

    mediaElem.style.position = 'relative'
    mediaElem.style.display = 'none'
    mediaElem.style.height = '100%'
    mediaElem.style.width = '100%'
    mediaElem.style.zIndex = '-1'

    if (guards.isAudio(mediaElem) || guards.isVideo(mediaElem)) mediaElem.loop = true
    return mediaElem
  }

  const createDropArea = (): void => {
    const dropArea = root.getElementsByClassName('CommentPanel is-active')[0]
    if (!guards.isHTMLElem(dropArea)) return console.log('No dropArea found')
    dropArea.setAttribute('draggable', 'true')
    dropArea.addEventListener('dragover', handleDragOver, false)
    dropArea.addEventListener('drop', haltMedia, false)
    dropArea.addEventListener('drop', handleDrop, false)
  }

  const appendBox = mediaBox()
  const boxNode = screen.insertBefore(appendBox, layer)

  const appendVideo = mediaToAppend('video')
  appendVideo.className = 'drop_video'
  const videoElement = boxNode.appendChild(appendVideo)

  const appendAudio = mediaToAppend('audio')
  appendAudio.className = 'drop_audio'
  const audioElement = boxNode.appendChild(appendAudio)

  const appendColor = mediaToAppend('div')
  appendColor.className = 'bg_color'
  appendColor.style.zIndex = '-3'
  appendColor.style.backgroundColor = 'transparent'
  appendColor.style.display = 'block'
  appendColor.style.position = 'absolute'
  appendColor.style.top = '0.0em'
  appendColor.style.left = '0.0em'
  screen.insertBefore(appendColor, layer)

  createDropArea()
}
