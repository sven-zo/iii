var useDOM = true
var windowSizeMessage = document.createElement('p')
windowSizeMessage.innerHTML = 'Checking window size...'
var webGlMessage = document.createElement('p')
windowSizeMessage.innerHTML = 'Checking WebGL support...'
var canvasMessage = document.createElement('p')
canvasMessage.innerHTML = 'Checking Canvas support...'
var domMessage = document.createElement('p')
domMessage.innerHTML = 'No support for other renderers found, will use DOM fallback.'

window.addEventListener('load', function (e) { 
  document.body.appendChild(windowSizeMessage)
  document.body.appendChild(webGlMessage)
  document.body.appendChild(canvasMessage)
  document.body.appendChild(domMessage)
  //Detect window size
  if (window.innerWidth < 1280 || window.innerHeight < 720) {
    windowSizeMessage.innerHTML = 'Your window size is too small to play the game.'
  } else {
    windowSizeMessage.innerHTML = 'Your window size is perfect.'
  }
  //Detect WebGL
  let canvas = document.createElement('canvas')
  let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  if (gl && gl instanceof WebGLRenderingContext) {
    webGlMessage.innerHTML = 'Congratulations! Your browser supports WebGL.'
    useDOM = false
  } else {
    webGlMessage.innerHTML = 'It seems like your browser does not support WebGl.'
  }
  //Detect Canvas
  if (!!document.createElement("canvas").getContext) {
    canvasMessage.innerHTML = 'Yay! Your browser supports Canvas!'
    useDOM = false
  } else {
    canvasMessage.innerHTML = 'It seems like your browser does not support Canvas.'
  }
  //Fallback message
  if (!useDOM) {
    domMessage.innerHTML = 'The fastest available renderer will be used.'
  }
  let button = document.createElement('button')
  button.innerHTML = 'Start game!'
  button.addEventListener('click', function (e) {
    new Game(useDOM)
    document.body.removeChild(button)
    document.body.removeChild(windowSizeMessage)
    document.body.removeChild(webGlMessage)
    document.body.removeChild(canvasMessage)
    document.body.removeChild(domMessage)
  })
  document.body.appendChild(button)
})