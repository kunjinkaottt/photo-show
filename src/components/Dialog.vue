<template>
  <div>
    <div class="back" @click="closeDialog()">
      <div class="dialog" @click.stop=""> <!-- stop阻止向上冒泡，在dialog里的点击事件不会冒泡到back -->
        <img src="../assets/icons/登录注册.png" alt="" class="logo">

        <div class="LoginRegist">
          <p @click="Login($event)" id="login">登录</p>
          <p @click="Register($event)">注册</p>
        </div>

        <div v-if="isLogin" class="LoginForm"> <!--登录表单-->
          <div class="username">
            <input type="text" placeholder="用户名">
          </div>
          <div class="password">
            <input type="text" placeholder="密码">
          </div>
          <button type="submit">登录</button>
        </div>

        <div v-else class="RegistForm"> <!--注册表单-->
          <div class="email">
            <input type="text" placeholder="电子邮件">
          </div>
          <div class="username">
            <input type="text" placeholder="用户名（仅限字母、数字和下划线）">
          </div>
          <div class="password">
            <input type="text" placeholder="密码（最少8个字符）">
          </div>
          <button type="submit">注册</button>
        </div>

        <div class="footer">注册登录即代表同意《用户协议》《隐私政策》</div>
      </div>  <!-- dialog end-->
    </div>  <!-- back end-->
    <!-- 回到顶部 图标按钮-->
    <a href="#" id="gotoTop"><img src="../assets/icons/热门.png" alt=""></a>
  </div>
</template>

<script>
// 滚动条不隐藏的情况实现不可滚动
var winX = null;
var winY = null;

window.addEventListener('scroll', function () {
  if (winX !== null && winY !== null) {
    window.scrollTo(winX, winY);
  }
  // 判断当前浏览器视口高度 显示与隐藏 "回到顶部" 按钮
  window.scrollY > 500 ?  
    this.document.getElementById('gotoTop').style.visibility = 'visible' :
    this.document.getElementById('gotoTop').style.visibility = 'hidden' 
});

function disableWindowScroll() {
  winX = window.scrollX;
  winY = window.scrollY;
}

function enableWindowScroll() {
  winX = null;
  winY = null;
}

window.onload = function () { //页面加载时 在弹窗中默认先选中登录按钮
  document.getElementById('login').click();
}
export default {
  name: "Dialog",
  data() {
    return {
      isLogin: false
    };
  },
  created() {

  },
  watch: {
    '$store.state.visible'(newVal) {    //监听弹窗的可视属性
      this.DialogVisibility(newVal)
    }
  },
  computed: {},
  methods: {
    closeDialog() {//关闭弹窗
      this.$store.commit('turnVisible')
    },

    Login(event) {   //点击登录键   
      document.querySelector('.LoginRegist').childNodes[1].style.color = 'gray'//注册键改成灰色
      document.querySelector('.LoginRegist').childNodes[1].style.borderBottom = '0 solid black'
      this.isLogin = true
      event.target.style.color = 'black'  //登录键改成黑色
      event.target.style.borderBottom = '5px solid black'// 登录键出现下划线
    },

    Register(event) {  //点击注册键   
      document.querySelector('.LoginRegist').childNodes[0].style.color = 'gray'//登录键改成灰色
      document.querySelector('.LoginRegist').childNodes[0].style.borderBottom = '0 solid black'
      this.isLogin = false
      event.target.style.color = 'black'  //注册键改成黑色
      event.target.style.borderBottom = '5px solid black'//注册键出现下划线
    },

    DialogVisibility(visibility) {  //改变 弹窗可视属性
      var back = document.getElementsByClassName('back')
      if (visibility) {
        back[0].style.visibility = 'visible'  //vuex的state.visible为真，显示背景蒙版和弹窗
        // document.documentElement.style.overflow = 'hidden'; //隐藏滚动条
        disableWindowScroll() //不可滚动界面
      } else {
        back[0].style.visibility = 'hidden'//vuex的state.visible为假，隐藏背景蒙版和弹窗
        // document.documentElement.style.overflow = 'auto'; //自动显示滚动条。
        enableWindowScroll()  //可滚动界面
      }
    }
  },
  mounted() {
    this.DialogVisibility(this.$store.state.visible)  //页面加载完 先控制弹窗的显示
  }
};
</script>
<style lang="less" scoped>
.back {
  z-index: 2;
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);

  .dialog {
    z-index: 3;
    visibility: inherit; //跟随父级可视化
    position: fixed; //固定定位，弹窗永远弹出在可视窗口的中间
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    width: 450px; //浏览器拉到最小的时候
    height: 470px;
    border-radius: 20px;

    .logo {
      width: 40%;
      margin: 30px auto 10px;
      // position: absolute;
      // left: 50%;
      // margin-left: -50%;
    }

    .LoginRegist {
      flex: 1;
      display: flex;

      p {
        margin: 20px 30px;
        font-size: 28px;
        font-weight: bold;
        color: gray;
        border-bottom: 0 solid black;
      }

      p:hover {
        cursor: pointer;
      }
    }

    .LoginForm {
      flex: 7;
      width: 75%;
      text-align: center;
      margin: 5px auto;

      div {
        height: 30px;
        line-height: 30px;
        border: 1px solid gray;
        // border: #fc9345 1px solid;
        margin: 15px;
        border-radius: 3px;
        position: relative;
      }

      .username {}

      .password {}

    }

    .RegistForm {
      flex: 7;
      text-align: center;
      width: 75%;
      margin: 5px auto;

      div {
        height: 30px;
        line-height: 30px;
        border: 1px solid gray;
        // border: #fc9345 1px solid;
        margin: 15px;
        border-radius: 3px;
        position: relative;
      }

      .email {}

      .username {}

      .password {}
    }




    input {
      width: 100%;
      height: 100%;
      padding: 5px;
      box-sizing: border-box;
      border: none;
      /*清除边框*/
      background: none;
      /*清除背景*/
      outline: none;
      /*清除input点击之后的黑色边框*/
    }

    input:focus::placeholder {
      //输入框聚焦时 placeholder文字透明度为0
      opacity: 0;
    }

    input:focus {
      div::before {
        content: '电子邮件';
        position: absolute;
        left: 10px;
        top: -10px;
        width: 60px;
        height: 18px;
        line-height: 18px;
        background: #fff;
        font-size: xx-small;
        border: 1px solid #fc9345;
        box-sizing: border-box;
        text-align: center;
      }
    }

    button {
      width: 90%;
      height: 35px;
      font-size: medium;
      font-weight: bold;
      background-color: #fc9345;
      border-radius: 3px;
      border: 0px solid;
      color: #fff;
      margin: 25px auto;
    }

    button:hover {
      cursor: pointer;
    }

    .footer {
      flex: 2;
      font-size: x-small;
      font-weight: bold;
      color: gray;
    }
  }

}

#gotoTop{
    visibility: hidden;
    z-index: 1;
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, .4);
      img{
        transform:rotate(180deg);
      }
  }
</style>