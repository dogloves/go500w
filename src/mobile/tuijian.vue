<template>
  <div class="container">
    <p>红球推荐胆码</p>
    <div class="result-box">
      <div class="rusult-item" v-for="item in resultList" :key="item">{{ item }}</div>
    </div>
    <p>红球推荐杀号</p>
    <div class="result-box">
      <div class="rusult-item" v-for="item in redList" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const resultList = ref({
  dan: [],
  kill: [],
})
const likeObj = {
  1: [20, 30, 22],
  2: [14, 17],
  3: [14, 22],
  4: [14, 18],
  5: [14],
  6: [6, 22, 27],
  7: [26, 14],
  8: [5, 6],
  9: [6, 32],
  10: [1, 6],
  11: [10, 8],
  12: [26, 6],
  13: [19, 31],
  14: [22, 26],
  15: [14, 1, 7],
  16: [3],
  17: [23, 26],
  18: [1],
  19: [1],
  20: [32, 1],
  21: [18],
  22: [11, 20],
  23: [17, 26],
  24: [14, 26],
  25: [18, 7],
  26: [1, 26, 22, 23],
  27: [26],
  28: [8, 32],
  29: [18, 22],
  30: [26, 1],
  31: [20],
  32: [14, 25, 1],
  33: [14],
}
const unlikeObj = {
  1: [21, 28],
  2: [20, 28],
  3: [21, 15],
  4: [16, 31],
  5: [16, 24],
  6: [33, 10],
  7: [33, 21],
  8: [10, 28],
  9: [23, 33],
  10: [12],
  11: [15, 26],
  12: [23, 28],
  13: [24, 33],
  14: [15],
  15: [5],
  16: [13, 27],
  17: [28, 33],
  18: [19, 30],
  19: [33],
  20: [33],
  21: [27],
  22: [28, 24],
  23: [23, 33],
  24: [33],
  25: [13, 33],
  26: [33],
  27: [11, 28],
  28: [13, 3],
  29: [31],
  30: [7, 28, 25],
  31: [33, 12],
  32: [33, 28],
  33: [18, 23],
}
const lastList = [6, 7, 18, 20, 27, 29]
const getResult = () => {
  let tuijianList = []
  let shaList = []
  let tem = {}
  lastList.forEach((item) => {
    likeObj[item].forEach((i) => (tem[i] = tem[i] ? tem[i] + 1 : 1))
    unlikeObj[item].forEach((i) => (tem[i] = tem[i] ? tem[i] - 1 : 1))
  })
  let arr = Object.keys(tem).sort((a, b) => tem[b] - tem[a])
  arr.forEach((item) => {
    if (tem[item] > 0) {
      let obj = {
        num: item,
        count: tem[item],
      }
      tuijianList.push(obj)
    }
    if (tem[item] < 0) {
      let obj = {
        num: item,
        count: -tem[item],
      }
      shaList.push(obj)
    }
  })
}
onMounted(() => {
  getResult()
})
</script>
<style scoped lang="scss">
.container {
  font-size: 14px;
  width: 100%;
  position: relative;
  padding: 15px;
  color: var(--el-text-color-regular);
  .checkbox-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .check-item {
      width: 50px;
      margin: 8px 5px;
    }
  }
  .btn {
    width: 4rem;
    margin: 0 auto;
  }
  .result-box {
    width: 100%;
    min-height: 200px;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .rusult-item {
    margin: 2px 5px;
    font-size: 14px;
    line-height: 22px;
    min-width: 150px;
    height: 22px;
    text-align: center;
    color: var(--el-text-color-regular);
  }
}
.mrg-l-20 {
  margin-left: 20px;
}
.text-gray-500 {
  color: #718096;
  font-size: 14px;
  margin: 0 15px;
}
.w-100 {
  width: 100px;
}
</style>
