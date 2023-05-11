<template>
  <div class="">
    <el-container>
      <el-header>
        <div class="banner">
          <div class="topleft">首页 | 发现 | 其他</div>
          <div class="topmeddle">
            <el-input v-model="topInput" prefix-icon="el-icon-search" clearable placeholder="搜索"
              class="topinput"></el-input>
          </div>
          <div class="topright"> <el-button class="topbutton" type="primary" round>登陆/注册</el-button></div>
        </div>
      </el-header>

      <el-main>
        <div class="content">

          <div v-for="(item, index) in imgArr" :key="index">
            <img class="randomImg" :src="item" alt="图片api可能过期了" />
            <!-- <img src="../assets/logo.png" alt=""> -->
          </div>
          <!--懒加载图片 -->
          <!-- <div v-for="(number, index) in imgNum" :key="index">
            <img :src="number" alt="图片api可能过期了">
          </div>  -->

        </div>
      </el-main>

      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
// 导入axios 先提前访问随机图api获取图片的url，让图片在页面挂载时更快渲染
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      topInput: '',
      imgArr: [],
      imgApi: '',
      url: 'https://picsum.photos/',//另一个随即图api： https://source.unsplash.com/random
      imgNum: 10,
      randomWidth: 240,
      randomHeight: 300,
      arrHeight: [],//收集第一排的所有高度
      imgWidthArr: [],
      imgHeightArr: [],

    }
  },
  props: {
    msg: String
  },
  methods: {
    randomImage() { //通过api生成随机图片的url
      for (let i = 0; i < this.imgNum; i++) {
        this.randomWidth = Math.floor(Math.random() * 500) + 240  //随机宽度
        this.randomHeight = Math.floor(Math.random() * 500) + 240 //随机高度
        this.imgApi = this.url + this.randomWidth + '/' + this.randomHeight + '?random=' + i //随机图api
        // 把请求 随机图api得到的图片url放到数组里
        axios.get(this.imgApi).then(response => {
          this.imgArr.push(response.request.responseURL)
        })
        // 计算并保存图片在页面中的高度 ,用于下一排自动补充到上一排高度最小的图片下面
        this.imgHeightArr.push(Math.round(240 * this.randomHeight / this.randomWidth))
      }
      console.log(this.imgHeightArr);
    },
  },
  created() {
    this.randomImage()
  },
  mounted() {
    // 获取主容器的宽度
    var content = document.getElementsByClassName("content")[0]
    var contentWidth = content.offsetWidth
    // var imgs = []
    // imgs =  content.children
    // console.log(imgs[0].offsetWidth);


    var nums = Math.floor(contentWidth / 240) //得到一行有几张图
    console.log(nums);
    var firstRowHeightArr = []
    for (let i = 0; i < this.imgArr.length; i++) { //遍历图片数组
      if (i < nums) { //第一行的图片高度放到 firstRowHeightArr数组
        firstRowHeightArr.push(this.imgHeightArr[i])
      } else {  //第二行的图片从第一行最短的一个后面排列
        // Math.min.aplay(Math,arrHeight) 求最小值
        let obj = { 
          minHeight: firstRowHeightArr[0],//最小高度
           minIndex: 0 //最小高度对应数组下标
          }
        for (let j = 0; j < firstRowHeightArr.length; j++) {
          if (firstRowHeightArr[j] < obj.minHeight) {
            obj.minHeight = firstRowHeightArr[j];
            obj.minIndex = j
          }
        }
        console.log(obj);

      }
    }
  },
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.el-container {
  position: relative;
  height: 100%;
}

.el-header {
  text-align: center;
  line-height: 60px;
  background-color: #b3aeac;
}
 
.banner {
  display: flex;
}

.topleft {
  flex: 2;
}

.topmeddle {
  flex: 6;
  margin: 0 5px;
}

.topright {
  flex: 2;

  .topbutton {}
}


.el-main {
  padding-bottom: 100px;

}

.content {
  width: 85%;
  margin: 0 auto;

  div {
    float: left;
    padding: 11px;

    img {
      border-radius: 15px;
      // 图片在页面中的宽度写死为240px
      width: 240px;
    }
  }
}

.el-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #555;
}
</style>
