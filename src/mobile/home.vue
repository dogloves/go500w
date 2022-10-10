<template>
  <div class="home-box">
    <div class="wrap flex">
      <router-link :to="{ name: 'mobile_split' }" tag="div" class="item">
        <div class="icon"><img src="@/assets/img/chai.png" alt="" /></div>
        <div class="info">拆号</div>
      </router-link>
      <router-link :to="{ name: 'mobile_tuijian' }" tag="div" class="item">
        <div class="icon"><img src="@/assets/img/zan.png" alt="" /></div>
        <div class="info">推荐号码</div>
      </router-link>
      <router-link to="/" tag="div" class="item">
        <div class="icon"><img src="@/assets/img/ai.png" alt="" /></div>
        <div class="info">Ai推荐</div>
      </router-link>
      <router-link to="/" tag="div" class="item">
        <div class="icon"><img src="@/assets/img/gl.png" alt="" /></div>
        <div class="info">号码筛选</div>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
<style scoped lang="scss">
.home-box {
  width: 100%;
  height: 100%;
  padding: 15px 20px;
  background: url('@/assets/img/bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .item {
    width: 2.2rem;
    height: 2rem;
    margin: 20px 20px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    .icon {
      width: 1rem;
      height: 1rem;
    }
    .info {
      font-size: 18px;
      line-height: 2;
      color: #333;
    }
  }
}
</style>
