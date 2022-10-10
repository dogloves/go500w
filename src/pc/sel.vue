<template>
  <div class="container">
    <el-form :model="form" label-width="120px" class="form-box">
      <el-form-item label="红球">
        <el-checkbox-group v-model="form.redSels">
          <el-checkbox v-for="item in 33" :key="item" :label="item" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="蓝球">
        <el-checkbox-group v-model="form.blueSels">
          <el-checkbox v-for="item in 16" :key="item" :label="item" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="红球和值">
        <div class="flex">
          <el-input class="w-100 mrg-l-20" v-model="form.redTotalStart" type="number" />
          <el-input class="w-100 mrg-l-20" v-model="form.redTotalEnd" type="number" />
        </div>
      </el-form-item>
      <el-form-item label="红球奇偶比">
        <el-checkbox-group v-model="form.oddvsEven">
          <el-checkbox v-for="item in oddvsEvenOptions" :key="item.value" :label="item.label" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="红球3区比">
        <div class="flex">
          <el-input class="w-100" v-model="form.redSection[0]" type="number" />
          <el-input class="w-100 mrg-l-20" v-model="form.redSection[1]" type="number" />
          <el-input class="w-100 mrg-l-20" v-model="form.redSection[2]" type="number" />
        </div>
      </el-form-item>
      <el-form-item label="必定包含的红球">
        <div class="flex">
          <el-select class="mrg-l-20 w-100" v-model="form.redMustList[0]" placeholder="Select">
            <el-option v-for="item in mustRedOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select class="mrg-l-20 w-100" v-model="form.redMustList[1]" placeholder="Select">
            <el-option v-for="item in mustRedOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
    <div class="result-info">{{ selResultInfo }}</div>
  </div>
  <div class="rusult-box">
    <div class="rusult-item" @click="selThisResult(item)" v-for="item in resultList" :key="item">{{ item }}</div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
const oddvsEvenOptions = [
  { label: '0:6', value: 0 },
  { label: '1:5', value: 1 },
  { label: '2:4', value: 2 },
  { label: '3:3', value: 3 },
  { label: '4:2', value: 4 },
  { label: '5:1', value: 5 },
  { label: '6:0', value: 6 },
]

const totalOptions = computed(() => {
  let arr = []
  for (let i = 60; i <= 140; i++) {
    arr.push(i)
  }
  return arr
})

const mustRedOptions = computed(() => {
  let arr = [{ value: 0, label: '不选' }]
  for (let i = 1; i < 33; i++) {
    arr.push({ value: i, label: i })
  }
  return arr
})
//选数据
const choose = (arr, size) => {
  var allResult = []

  let fn = function (arr, size, result) {
    var arrLen = arr.length
    if (size > arrLen) {
      return
    }
    if (size == arrLen) {
      allResult.push([].concat(result, arr))
    } else {
      for (var i = 0; i < arrLen; i++) {
        var newResult = [].concat(result)
        newResult.push(arr[i])

        if (size == 1) {
          allResult.push(newResult)
        } else {
          var newArr = [].concat(arr)
          newArr.splice(0, i + 1)
          fn(newArr, size - 1, newResult)
        }
      }
    }
  }
  fn(arr, size, [])

  return allResult
}
const form = reactive({
  redSels: [],
  blueSels: [],
  oddvsEven: [],
  redSection: [2, 2, 2],
  redMustList: [0, 0],
  redTotalStart: 80,
  redTotalEnd: 120,
})
const resultList = ref([])
const getRedTotal = (arr) => {
  let total = 0
  arr.forEach((item) => {
    total += item
  })
  return total
}
const selResultInfo = ref('')
const selThisResult = (item) => {
  let textInfo = ''
  let arr = item.split('-')
  let reds = arr[0].split(',').map((item) => {
    return parseInt(item)
  })
  let blue = arr[1]
}
const onSubmit = () => {
  let result = []
  if (form.redSels.length < 6) {
    ElMessage.error('选择红球太少')
    return
  }
  let redSelsSort = form.redSels.sort((a, b) => a - b)
  let redResult = choose(redSelsSort, 6)
  for (let i = 0; i < redResult.length; i++) {
    let redTotal = getRedTotal(redResult[i])
    if (redTotal < form.redTotalStart || redTotal > form.redTotalEnd) {
      continue
    }
    //奇偶比
    let odd = 0
    let even = 0
    redResult[i].forEach((item) => {
      if (item % 2 == 0) {
        even++
      } else {
        odd++
      }
    })
    if (form.oddvsEven.length > 0 && !form.oddvsEven.includes(odd + ':' + even)) {
      continue
    }
    //3区比
    let redSection = [0, 0, 0]
    redResult[i].forEach((item) => {
      if (item <= 11) {
        redSection[0]++
      } else if (item <= 22) {
        redSection[1]++
      } else {
        redSection[2]++
      }
    })
    if (redSection[0] != form.redSection[0] || redSection[1] != form.redSection[1] || redSection[2] != form.redSection[2]) {
      continue
    }
    //必定包含的红球
    if (form.redMustList[0] != 0 && !redResult[i].includes(form.redMustList[0])) {
      continue
    }
    if (form.redMustList[1] != 0 && !redResult[i].includes(form.redMustList[1])) {
      continue
    }
    for (let j = 0; j < form.blueSels.length; j++) {
      result.push(redResult[i].join(',') + '-' + form.blueSels[j])
    }
    //result.push(redResult[i])
  }
  resultList.value = result
}
</script>
<style scoped>
.container {
  width: 100%;
  position: relative;
  color: var(--el-text-color-regular);
}
.form-box {
  width: 1200px;
  margin: auto;
  margin-top: 15px;
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
.rusult-box {
  width: 90%;
  min-height: 350px;
  margin: 0 auto;
  border: 1px solid #718096;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.rusult-item {
  margin: 5px 20px;
  font-size: 16px;
  line-height: 25px;
  cursor: pointer;
  width: 160px;
  text-align: center;
  color: var(--el-text-color-regular);
}
.rusult-item:hover {
  color: #409eff;
}
.result-info{
  position: absolute;
  left: 600px;
  bottom: 0px;
  font-size: 16px;
}
</style>
