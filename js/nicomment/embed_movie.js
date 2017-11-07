(function(){
  'use strict'
  // append nnd embed movie to node
  const insert_embed_movie = (id, node) => {
    const host = 'https://embed.nicovideo.jp/watch/'
    const query = '?oldScript=1&from=0&allowProgrammaticFullScreen=1'
    const url = host + id + query

    const embed = document.createElement('iframe')
    embed.src = url
    embed.style.display = 'block'
    embed.style.height = '100%'
    embed.style.width = '100%'
    embed.style.marginTop = '10px'
    embed.style.marginBottom = '10px'
    embed.className = 'nicomment_inner_frame'

    const frameNode = node.appendChild(embed)
    return frameNode
  }


  const remove_embed_movie = (parent) => {
    for (let node of parent.childNodes) {
      if (node.tagName === 'IFRAME') {
        node.parentNode.removeChild(node)
      }
    }
  }

  const play_embed_movie = () => {
    const input = window.prompt("Input ID (ex: sm9)")
    if (input === null) {
      return
    }
    const videoid = input.match(/s[mo][0-9]{1,10}/)
    if (videoid !== null) {
      const movie_area = document.getElementsByClassName('drop_media_box')[0]
      console.log("play embed")
      remove_embed_movie(movie_area)
      insert_embed_movie(videoid, movie_area)
    }

  }

  const docRoot = document
  function key_shortcut(event) {
    return function(event) {
      if (docRoot.activeElement.tagName != 'INPUT' && event.keyCode == 86) {
        play_embed_movie()
      }
    }
  }


  window.addEventListener('keydown', key_shortcut(), false);
})()
