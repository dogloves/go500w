<template>
  <div class="container">
    <p>选择多个号码，进行拆分</p>
    <van-checkbox-group v-model="form.redSels" class="checkbox-box">
      <van-checkbox class="check-item" v-for="item in 35" :name="item" :key="item" shape="shape">{{ item }}</van-checkbox>
    </van-checkbox-group>
    <van-field name="stepper" label="一组几个">
      <template #input>
        <van-stepper v-model="form.chaiNum" />
      </template>
    </van-field>
    <van-button class="btn" round block type="primary" @click="onSubmit">拆 分</van-button>
    <div class="result-box">
      <div class="rusult-item" @click="selThisResult(item)" v-for="item in resultList" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script setup>
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
  chaiNum: 6,
})
const resultList = ref()
const onSubmit = () => {
  const result = []
  const redSels = form.redSels
  const chaiNum = form.chaiNum
  const arr = choose(redSels, chaiNum)
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i].join(','))
  }
  resultList.value = result
}
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
