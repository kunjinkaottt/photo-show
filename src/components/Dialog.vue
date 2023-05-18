<template>
  <div>
    <div class="back" @click="closeDialog()">
      <div class="dialog" @click.stop="" v-if="$store.state.visible"> <!-- stop阻止向上冒泡，在dialog里的点击事件不会冒泡到back -->
        <img src="../assets/icons/登录注册.png" alt="" class="logo">

        <div class="LoginRegist">
          <span @click="Login($event)" id="login" class="Active">登录</span>
          <span @click="Register($event)" class="NoActive">注册</span>
          <div class="underline"></div>
        </div>

        <div v-if="isLogin" class="LoginForm"> <!--登录表单-->
          <div class="placeHolderDiv">
            <input type="text" required="required">
            <span>用户名</span>
          </div>
          <div class="placeHolderDiv">
            <input type="text" required="required">
            <span>密码</span>
          </div>
          <button type="submit">登录</button>
        </div>

        <div v-else class="RegistForm"> <!--注册表单-->
          <div class="placeHolderDiv">
            <input type="text" placeholder="例@xxx.com" required="required"><!--@focus="focusInput($event)"-->
            <span>电子邮件</span>
          </div>
          <div class="placeHolderDiv">
            <input type="text" placeholder="仅限字母、数字和下划线" required="required">
            <span>用户名</span>
          </div>
          <div class="placeHolderDiv">
            <input type="text" placeholder="最少8个字符" required="required">
            <span>密码</span>
          </div>
          <button type="submit">注册</button>
        </div>

        <div class="footer">注册登录即代表同意《用户协议》《隐私政策》</div>
      </div> <!-- dialog end-->
    </div> <!-- back end-->
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

export default {
  name: "Dialog",
  data() {
    return {
      isLogin: true
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
      this.isLogin = true
      event.target.className = "Active"
      document.querySelector('.LoginRegist').childNodes[1].className = "NoActive"//注册键改成未选中样式
      document.querySelector('.LoginRegist').childNodes[2].style.marginLeft = "27px"//在登录键下面

    },

    Register(event) {  //点击注册键   
      this.isLogin = false
      event.target.className = "Active"
      document.querySelector('.LoginRegist').childNodes[0].className = "NoActive" //登录键改为未选中样式
      document.querySelector('.LoginRegist').childNodes[2].style.marginLeft = "144px"//在注册键下面
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
    },
  },
  mounted() {
    this.DialogVisibility(this.$store.state.visible)  //页面加载完 先控制弹窗的显示
  }
};
</script>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.back {
  z-index: 2;
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);

  @keyframes dialog {
    0% {
      width: 0;
      height: 0;
      position: fixed;
      top: 0%;
      right: 0%;
    }

    100% {
      position: fixed; //固定定位，弹窗永远弹出在可视窗口的中间
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }
  }

  .dialog {
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    width: 420px;
    height: 470px;
    border-radius: 20px;
    animation: dialog .2s ease-in-out forwards; // 动画名 持续时间 运动曲线 播放完状态停留在动画的100%样式

    .logo {
      width: 40%;
      margin: 30px auto;
    }

    .LoginRegist {
      //登录注册tab
      flex: 1;

      .Active {
        //选中
        margin: 30px 30px;
        font-size: 28px;
        font-weight: bold;
        color: black;
        // border-bottom: 5px solid black;
      }

      .NoActive {
        //未选中
        margin: 30px 30px;
        font-size: 28px;
        font-weight: bold;
        color: gray;
        // border-bottom: 0 solid black;
      }

      .underline {
        margin-left: 26px; //默认在登录键下面
        width: 60px;
        height: 5px;
        background-color: rgb(0, 0, 0);
        border-radius: 3px;
        transition: .5s; //在改变位置时有过渡效果
      }

      span:hover {
        cursor: pointer;
      }
    }

    .LoginForm {
      //登录表单
      flex: 7;
      width: 70%;
      text-align: center;
      margin: 30px auto 10px;
    }

    .RegistForm {
      //注册表单
      flex: 7;
      text-align: center;
      width: 70%;
      margin: 30px auto 10px;
    }

    .placeHolderDiv {
      //包围输入框的父级div
      position: relative; //父相

      input {
        width: 85%;
        height: 36px;
        // line-height: 18px;
        padding: 10px;
        border: 1px solid gray;
        margin: 12px;
        border-radius: 18px;
        /*清除input点击之后的黑色边框*/
        outline: none;
        transition: .5s;

      }

      input:focus::placeholder {
        //输入框聚焦时 显示出placeholder文字
        opacity: 1;
        transition: 1s; //1秒内逐渐显示提示的文字
      }

      input::placeholder {
        //输入框没有聚焦时 隐藏placeholder文字
        opacity: 0;
      }

      span {
        //提示字
        display: block;
        position: absolute; //子绝
        top: 29px;
        left: 30px;
        padding: 0 4px;
        pointer-events: none;
        font-size: 13px;
        color: gray;
        line-height: 2px;
        transition: all .2s ease-in-out;
        z-index: 1;
      }
    }

    .placeHolderDiv input:valid,
    //当输入合法时
    .placeHolderDiv input:focus {
      //当输入框聚焦时
      height: 36px;
      line-height: 18px;
      border: 1px solid #fc9345;
      border-radius: 18px;
      position: relative;
      transition: .5s;
    }

    .placeHolderDiv input:valid~span,
    .placeHolderDiv input:focus~span {
      color: #fc9345;
      transform: translateY(-19px) scale(0.9);
      font-size: 12px;
      padding: 4px;
      background-color: #fff;
    }



    button {
      width: 85%;
      height: 37px;
      font-size: medium;
      font-weight: bold;
      background-color: #fc9345;
      border-radius: 17px;
      border: 0px solid;
      color: #fff;
      margin: 10px auto 0;
    }

    button:hover {
      cursor: pointer;
      opacity: 0.9;
    }

    .footer {
      font-size: x-small;
      font-weight: bold;
      color: gray;
      margin-bottom: 30px;
    }
  }


}

#gotoTop {
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

  img {
    transform: rotate(180deg);
  }
}</style>