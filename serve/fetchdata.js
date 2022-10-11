import cheerio from 'cheerio'
import request from 'request'
import fs from 'fs'

let flag = true // 爬虫终止条件
const filename = './data2.txt' // 输出文件位置

function getHTML(url, callback) {
  const options = {
    url: url,
    // 设置一个浏览器头
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        console.log(err)
        flag = false
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}

function writeFileSync(filename, data) {
  fs.writeFileSync(filename, data, { flag: 'a+' })
}

function handle(html) {
  try {
    const $ = cheerio.load(html)
    const tr = $('tr')
    if (tr.find('td').length === 0) {
      // 爬取结束
      console.log(html)
      flag = false
      return
    }
    tr.each(function (i) {
      if (i > 1) {
        // 从第二行开始才是有效数据
        const td = $(this).find('td')
        const date = td.eq(0).text() // 日期
        const id = td.eq(1).text() // 期号
        if (!id) return // 末行，退出循环
        let str = date + ' ' + id + ' ' // 用于写入文件的每期字符串
        const td2 = td.eq(2) // 本期所有号码的td
        const em = td2.find('em')
        em.each(function (j) {
          str = str + em.eq(j).text() + ' '
        })
        str += '\n' // 加个换行
        writeFileSync(filename, str)
      }
    })
  } catch (e) {
    console.log(e)
    flag = false
  }
}
let timer = (val) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), val || 0)
  })
}
let page = 1
async function start() {
  // while (flag) {
  console.log('开始爬取第' + page + '页')
  let html = await getHTML(`http://kaijiang.zhcw.com/zhcw/html/ssq/list_${page}.html`)
  handle(html)
  console.log('完成第' + page + '页')
  // page++
  // }
  console.log('爬取结束')
}
start()
