import fs from 'fs'
import path from 'path'

let historyData = []
let historyRedData = []
let historyBlueData = []
runStart()
async function runStart() {
  let data = await readData()
  dealData(data)
  check_3()
  // console.log(historyRedData)
  // console.log(historyBlueData)
  // console.log(check_1())
}

function readData() {
  const filename = path.resolve('./data.txt') // 输出文件位置
  return new Promise((r, j) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        j(err)
      } else {
        r(data)
      }
    })
  })
}
function dealData(data) {
  let arr = data.split(' \n')
  let result = []
  let resultReds = []
  let blueReds = []
  let l = arr.length
  for (let i = 0; i < l; i++) {
    let tem = arr[i].split(' ')
    result.push(tem)
    let redstem = tem.slice(2, 8)
    let redTem = []
    redstem.forEach((item, i) => {
      redTem[i] = Number(item)
    })
    resultReds.push(redTem)
    let bluestem = tem.slice(8)
    let blueTem = Number(bluestem[0])
    blueReds.push(blueTem)
  }
  historyData = result
  historyRedData = resultReds
  historyBlueData = blueReds
}

function check_1() {
  let l = historyRedData.length
  let result = {
    totla: 0,
    per: 0,
  }
  let resArr = []
  let arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33']
  arr.forEach((item) => {
    for (let i = 0; i < arr.length; i++) {
      result[item] = 0
    }
  })
  for (let i = l - 1; i > 0; i--) {
    if (historyRedData[i].indexOf('33') > -1) {
      result.totla++
      historyRedData[i - 1].forEach((item) => {
        result[item]++
      })
    }
  }
  result.per = (result.totla * 6) / 33
  Object.keys(result).forEach((key) => {
    let tem = {
      key: key,
      totla: result[key],
    }
    resArr.push(tem)
    resArr.sort((a, b) => {
      return b.totla - a.totla
    })
  })
  return resArr
}

//杀号验证
function check_2() {
  let l = historyRedData.length
  let result = []
  let average = ((6 / 33) * 100).toFixed(2) + '%'
  let firstLastChaObj = {
    desc: '首尾差，上期开奖号码中的红球第一位和第六位的差值',
    total: 0,
    per: 0,
    average,
    text: '',
  }
  let chaObj13 = {
    desc: '一三差+蓝+2，上期开奖号码中的红球第一位与第三位的差值，加上蓝球再加2的数值',
    total: 0,
    per: 0,
    average,
    text: '',
  }
  let chaObj25 = {
    desc: '二五差，上期开奖号码中的红球第二位和第五位的差值，',
    total: 0,
    per: 0,
    average,
    text: '',
  }

  for (let i = l - 1; i > 0; i--) {
    let firstLastCha = historyRedData[i][5] - historyRedData[i][0]
    if (historyRedData[i - 1].includes(firstLastCha)) {
      firstLastChaObj.total++
    }

    let cha13 = historyRedData[i][2] - historyRedData[i][0]
    if (historyRedData[i - 1].includes(cha13)) {
      chaObj13.total++
    }

    let cha25 = historyRedData[i][4] - historyRedData[i][1]
    if (historyRedData[i - 1].includes(cha25)) {
      chaObj25.total++
    }
  }
  firstLastChaObj.per = ((firstLastChaObj.total / (l - 1)) * 100).toFixed(2) + '%'
  firstLastChaObj.text = `平均出现概率值${firstLastChaObj.average}，实际出现值${firstLastChaObj.per}`
  result.push(firstLastChaObj)

  chaObj13.per = ((chaObj13.total / (l - 1)) * 100).toFixed(2) + '%'
  chaObj13.text = `平均出现概率值${chaObj13.average}，实际出现值${chaObj13.per}`
  result.push(chaObj13)

  chaObj25.per = ((chaObj25.total / (l - 1)) * 100).toFixed(2) + '%'
  chaObj25.text = `平均出现概率值${chaObj25.average}，实际出现值${chaObj25.per}`
  result.push(chaObj25)

  console.log(result)
}
//杀号热号冷号
function check_3() {
  let l = historyRedData.length
  let result = []
  let average = ((6 / 33) * 100).toFixed(2) + '%'
  let hotObj = {
    desc: '热号',
    allTotal: 0,
    hotTotal: 0,
    per: 0,
    average,
    text: '',
  }
  let codeObj = {
    desc: '冷号',
    total: 0,
    per: 0,
    average,
    text: '',
  }
  let hotRange = 50
  for (let i = 0; i < l - 1; i++) {
    let hotList = []
    let arr = []
    let tem = {}
    if (i < l - hotRange - 1) {
      for (let j = 1; j < hotRange + 1; j++) {
        arr.push(...historyRedData[i + j])
      }
    }
    arr.forEach((item) => {
      tem[item] = tem[item] ? tem[item] + 1 : 1
    })
    let per = Number((6 / 33) * hotRange)
    Object.keys(tem).forEach((key) => {
      if (tem[key] > per * 1.2) {
        // console.log(tem[key])
        hotList.push(Number(key))
        hotObj.allTotal++
      }
    })
    historyRedData[i].forEach((item) => {
      if (hotList.includes(item)) {
        hotObj.hotTotal++
      }
    })
  }

  hotObj.per = ((hotObj.hotTotal / hotObj.allTotal) * 100).toFixed(2) + '%'
  hotObj.text = `平均出现概率值${hotObj.average}，实际出现值${hotObj.per}`
  result.push(hotObj)

  console.log(result)
}

function numtoString(n) {
  let str = n.toString()
  if (str.length == 1) {
    str = '0' + str
  }
  return str
}
