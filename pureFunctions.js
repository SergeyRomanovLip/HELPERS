----функции для array.sort()
function textCompare(a, b) {
    if (sortedColumn.direction === 'old') {
      return a ? (b ? a.localeCompare(b) : -1) : 1
    } else {
      return b ? (a ? b.localeCompare(a) : -1) : 1
    }
  }
 function dateCompare(a, b) {
    if (sortedColumn.direction === 'old') {
      return a ? (b ? new Date(b).getTime() - new Date(a).getTime() : -1) : 1
    } else {
      return b ? (a ? new Date(a).getTime() - new Date(b).getTime() : -1) : 1
    }
  }
 

----функции массивов
 export function uniq(a) {
  var seen = {}
  return a.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true)
  })
}
export function randomKey() {
  return '_' + Math.random().toString(36).substring(2, 9)
}

---функции с датами
  export const getNumberOfDays = (start, end) => {
  const date1 = new Date(start)
  const date2 = new Date(end)
  const oneDay = 1000 * 60 * 60 * 24
  const diffInTime = date2.getTime() - date1.getTime()
  const diffInDays = Math.round(diffInTime / oneDay)

  return diffInDays
}


----функции random
export function randomKey() {
  return '_' + Math.random().toString(36).substring(2, 9)
}

