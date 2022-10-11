import * as tf from '@tensorflow/tfjs'
import fs from 'fs'
import path from 'path'
let items = [
  [1, 7, 13, 17, 18, 31, 15],
  [3, 9, 11, 15, 19, 28, 16],
  [17, 20, 22, 23, 24, 31, 1],
  [6, 12, 13, 15, 21, 23, 15],
]
let redResults = []
let blowResults = []
//formatData()
//readData()
start()

function readData() {
  const filename = path.resolve('./data.txt') // 输出文件位置
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })
}
function handler() {
  // 创建模型
  let model = tf.sequential()
  model.add(tf.layers.dense({ units: 7, inputShape: [7] }))
  model.compile({ loss: 'meanSquaredError', optimizer: 'SGD' })
  // 格式化数据
  let r = formatData()
  // 输入数据
  let x = tf.tensor(r.input)
  // 输出数据
  let y = tf.tensor(r.output)
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
  // 训练模型
  model.fit(x, y,{epochs:10})
  let u = tf.tensor(r.use)
  // 预测
  model
    .predict(u)
    .data()
    .then((res) => {
      res.map((r, index) => {
        if (index < 6) {
          let re = Math.abs(parseInt(r))
          // 红球 数据二次检测
          if (re === 0) {
            re = 1
          }
          if (re > 33) {
            re = 33
          }
          redResults[index] = re
        } else {
          // 蓝球 数据二次检测
          let re = Math.abs(parseInt(r))
          if (re === 0) {
            re = 1
          }
          if (re > 16) {
            re = 16
          }
          blowResults[0] = re
        }
      })
      // 计算结果排序
      redResults.sort((a, b) => {
        return a > b
      })
    })
  //model.summary()
}

function formatData() {
  let handedXs = []
  let handedYs = []
  let use = []
  items.map((res, index) => {
    if (index !== 0) {
      let m = [...res]
      handedYs.push(m)
    }
    if (index !== items.length - 1) {
      let m = [...res]
      handedXs.push(m)
    } else {
      let m = [...res]
      use.push(m)
    }
  })
  return {
    input: handedXs,
    output: handedYs,
    use: use,
  }
}

function start() {
  handler()
  setTimeout(() => {
    console.log('红球：', redResults)
    console.log('蓝球：', blowResults)
  }, 3000)
}
