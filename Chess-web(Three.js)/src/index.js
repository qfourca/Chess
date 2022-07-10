import { WEBGL } from './webgl'
// 
import init from './init'
// import './test'

if (WEBGL.isWebGLAvailable()) {
  init()
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}

