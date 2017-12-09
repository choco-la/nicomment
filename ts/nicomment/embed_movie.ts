import guards from '../common/typeguards'
export const embedMovie = (root: HTMLDocument): void => {
  // append nnd embed movie to node
  const insertEmbedMovie = (id: string, node: HTMLElement): HTMLIFrameElement => {
    const embed = document.createElement('iframe')
    embed.src = `https://embed.nicovideo.jp/watch/${id}?oldScript=1&from=0&allowProgrammaticFullScreen=1`
    embed.style.display = 'block'
    embed.style.height = '100%'
    embed.style.width = '100%'

    const frameNode = node.appendChild(embed)
    return frameNode
  }

  const clearMedia = (): void => {
    const media = root.getElementsByClassName('drop_playing')[0]
    if (!guards.isAudio(media) && !guards.isVideo(media)) return console.log('No media found.')
    console.log('rm media')
    media.removeAttribute('src')
    media.load()
    media.className = 'drop_' + media.tagName.toLowerCase()
    media.style.display = 'none'
  }

  const removeEmbedMovie = (parent: HTMLElement): void => {
    // Nodelist cannot for-of???(list says error)
    for (let indx = 0; indx < parent.childNodes.length; indx++) {
      const node = parent.childNodes[indx]
      if (!guards.isIFrame(node) || !node.parentNode) return
      node.parentNode.removeChild(node)
    }
  }

  const playEmbedMovie = (): void => {
    const input = window.prompt('Input ID (ex: sm9)')
    if (input === null || input.length === 0) return

    const trimmed = input.trim()
    if (trimmed.length === 0) return

    const videoID = input.match(/s[mo][0-9]{1,10}/)
    if (videoID === null) return

    const movieArea = document.getElementsByClassName('drop_media_box')[0]
    if (!guards.isHTMLElem(movieArea)) return console.log('No movieArea found')
    console.log('play embed')
    removeEmbedMovie(movieArea)
    clearMedia()
    insertEmbedMovie(videoID[0], movieArea)
  }

  const keyShortcut = (event: KeyboardEvent): void => {
    if (root.activeElement.tagName !== 'INPUT' && event.ctrlKey === true && event.keyCode === 86) {
      playEmbedMovie()
    }
  }

  window.addEventListener('keydown', keyShortcut, false)
}
