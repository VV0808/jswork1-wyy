function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)//min,max之间的随机数（包含min,max）
}

export function shuffle(arr) {
  let _arr = arr.slice()//新建一个arr的副本,保留arr数据不变
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
