import guards from './typeguards'
export class ControlMedia {
  private root: HTMLDocument
  constructor (root: HTMLDocument) {
    this.root = root
  }
    // stop, delete media element if exists
  public muteMedia (event: Event): void {
    const media = this.root.getElementsByClassName('drop_playing')[0]
    if (!guards.isAudio(media) && !guards.isVideo(media)) return console.log('No media found.')
    if (media.muted) {
      console.log('unmute media')
      media.muted = false
      if (guards.canInnertext(event.target)) event.target.innerText = '🔊'
    } else {
      console.log('mute media')
      media.muted = true
      if (guards.canInnertext(event.target)) event.target.innerText = 'Ｍ'
    }
  }

  // stop, delete media element if exists
  public clearMedia (): void {
    const media = this.root.getElementsByClassName('drop_playing')[0]
    if (!guards.isAudio(media) && !guards.isVideo(media)) return console.log('No media found.')
    console.log('rm media')
    media.removeAttribute('src')
    media.load()
    media.className = 'drop_' + media.tagName.toLowerCase()
    media.style.display = 'none'
  }

  public togglePlayStop (): void {
    const media = this.root.getElementsByClassName('drop_playing')[0]
    if (!guards.isAudio(media) && !guards.isVideo(media)) return console.log('No media found.')
    if (media.paused) {
      media.play()
    } else {
      media.pause()
    }
  }

  public toggleIcon (event: Event): void {
    const media = this.root.getElementsByClassName('drop_playing')[0]
    if (!guards.isAudio(media) && !guards.isVideo(media)) return console.log('No media found.')
    if (!guards.canInnertext(event.target)) return
    console.log(`toggle icon from ${event.target.innerText}`)
    if (event.target.innerText === '▶') event.target.innerText = '||'
    else if (event.target.innerText === '||') event.target.innerText = '▶'
  }

  public initBtn (): void {
    const btn = this.root.getElementsByClassName('toggle_play_stop')[0]
    if (!guards.canInnertext(btn)) return console.log('No btn found.')
    btn.innerText = '||'
  }
}
