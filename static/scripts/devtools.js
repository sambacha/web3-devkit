let created = false
let checkCount = 0

chrome.devtools.network.onNavigated.addListener(detectAndCreate)
const checkInterval = setInterval(detectAndCreate, 1000)
detectAndCreate()

function detectAndCreate() {
  if (created || checkCount++ > 10) {
    clearInterval(checkInterval)
    return
  }
  // @note we support useWeb3 and useDapp
  const code = '!!(window.__WEB3_DEVTOOLS_HOOK__.useWeb3 || window.__USEDAPP_DEVTOOLS_HOOK__.useDApp )'
  chrome.devtools.inspectedWindow.eval(code, function (detected) {
    if (!detected || created) {
      return
    }
    clearInterval(checkInterval)
    created = true
    chrome.devtools.panels.create('useWeb3', 'useDApp', 'icons/icon.svg', 'index.html')
  })
}
