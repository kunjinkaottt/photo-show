<template>
  <div class="header">
    <video class="homevideo" src="../assets/headerVideo.mp4" muted autoplay loop></video>

    <div class="topleft">
      <a href="">
        <img class="logo" src="../assets/icons/商标.png" alt="">
      </a>
      <img class="title" src="../assets/icons/自由的碎片.png" alt="">
    </div>

    <div class="topmeddle">
      <h1 ref="h1">来自全球才华横溢的创作者，随时随地分享图片和视频。</h1>
      <div class="input">
        <img src="../assets/icons/搜索.png" alt="">
        <input type="text" placeholder="搜索高分辨率图片">
      </div>
    </div>

    <div class="topright">
      <a class="text" href="javascript:;" @click="loginRegist()">探索</a>
      <a class="text" href="javascript:;" @click="loginRegist()">上传</a>
      <button @click="loginRegist()" class="loginRegist" type="primary" round>登陆/注册</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      topInput: '',

    }
  },
  methods: {
    loginRegist() {
      this.$store.commit('turnVisible')
    },
    changeWidth() {
      var title = document.getElementsByClassName('title')
      var text = document.getElementsByClassName('text')
      window.innerWidth < 650 ?
        text[0].style.visibility = text[1].style.visibility = title[0].style.visibility = 'hidden' :
        text[0].style.visibility = text[1].style.visibility = title[0].style.visibility = 'visible'
      window.innerWidth < 950 ? this.$refs.h1.style.fontSize = '25px' : this.$refs.h1.style.fontSize = '35px'
    }
  },
  created() {
  },
  mounted() {
    this.changeWidth()  //检查是否需要隐藏左右上角文字
    window.addEventListener('resize', this.changeWidth);
  }
}
</script>
  
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 540px;
  overflow: hidden;
  text-align: center;
  background-color: #e7e7e7;

  .topleft {
    z-index: 1;
    position: absolute;
    top: 2%;
    left: 5%;
    // width: auto;
    // height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      .logo {
        margin: 5px;
        width: 60px;
      }
    }

    .title {
      margin: 5px;
      width: 125px;
    }
  }


  .homevideo {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    min-width: 100%; //拉伸收缩页面 改变分辨率，视频都铺满父级div
  }

  .topmeddle {
    z-index: 1;
    flex: 1;
    max-width: 900px;
    padding: 0 15px;

    h1 {
      pointer-events: none;
      color: white;
      font-weight: bold;
      font-size: 35px;
      margin-bottom: 20px;
      text-align: center;
    }

    .input {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60px;
      line-height: 60px;
      background-color: #fff;
      border-radius: 30px;
      border: 0;
      padding: 0 50px;
      box-sizing: border-box;
      text-align: center;

      img {
        //搜索图标
        float: left;
        width: 15px;
        margin-left: -30px;
      }

      img:hover {
        cursor: pointer;
        transform: scale(1.1);
      }

      input {
        //真输入框input标签
        margin-left: 10px;
        width: 100%;
        height: 100%;
        border: none;
        /*清除边框*/
        background: none;
        /*清除背景*/
        outline: none;
        /*清除input点击之后的黑色边框*/
        font-size: medium;
      }

      input:focus::placeholder {
        //输入框聚焦时 placeholder透明度为0
        opacity: 0;
      }
    }
  }

  .topright {
    position: absolute;
    top: 3%;
    right: 5%;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      flex: 1;
      font-size: larger;
      font-weight: bolder;
      color: white;
      text-decoration: none;
      margin: 10px 32px 10px 0px;
    }

    .loginRegist {
      // flex: 1 ;
      width: 140px;
      height: 54px;
      border-radius: 27px;
      font-size: medium;
      font-weight: bold;
      color: white;
      background-color: #fc9345;
      border: 0;
      margin-left: 10px;
    }

    .loginRegist:hover {
      cursor: pointer;
      opacity: 0.9;
    }
  }
}</style>