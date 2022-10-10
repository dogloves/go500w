// rem 页面支持
;(function () {
  // 对手机端进行rem计算初始化
  let docEl = document.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = () => {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth >= 750) {
      docEl.style.fontSize = '100px'
    } else {
      docEl.style.fontSize = (100 * (clientWidth / 750)).toFixed(1) + 'px'
    }
  }
  if (!document.addEventListener) {
  } else {
    window.addEventListener(resizeEvt, recalc, false)
    document.addEventListener('DOMContentLoaded', recalc, false)
    recalc()
  }
})()
