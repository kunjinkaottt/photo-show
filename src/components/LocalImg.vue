<template>
    <div class="Waterfall wf-content"> <!-- 如果不用wf-content？ -->
        <!-- 遍历图片数组获取图片 -->
        <div class="wf-item mask" v-for="(item, index) in imgList" :key="index">
            <video id="videoList" v-if="$store.state.choose === 2" :src="item" 
                onmouseover="this.play()"
                onmouseout="this.pause()"
                @loadeddata="imageOnload()"><!--  @loadeddata 视频加载时调用-->
            </video>
            <!-- onmouseover="alert('asfasf')" onmouseout="alert('435')" -->
            <img v-if="$store.state.choose !== 2" v-lazy="item" alt="xxx" ref="image" @load="imageOnload()"  />
            <a class="collect icons" @click="loginRegist()"><img title="收藏" src="../assets/icons/收藏.png" alt=""></a>
            <a class="like icons" @click="loginRegist()"><img title="点赞" src="../assets/icons/赞.png" alt=""></a>
            <a class="download icons" @click="loginRegist()"><img title="下载" src="../assets/icons/下载.png" alt=""></a>
        </div>
    </div> 
</template>

<script>
// import axios from 'axios'
import { WaterFall } from "@/waterfall/waterfall";    //js那边不是export default默认导出,所以这里要用花括号，不然获取不到

function importAll(r) {//导入多个模块
    return r.keys().map(function (key) {
        return r(key);//webpack提供的r方法,返回上下文(context)接口的函数。将每个模块都通过r(key)导入进来,将获取的相对路径作为参数传递给 r 函数，并返回导入的模块对象
    });
}

// 杜震
export default {
    name: 'LocalImg',
    data() {
        return {
            imgList: [],
            type: 'recommend', //tab中选择的图片分类
            firstRowNums: 0,
            firstRowImgsHeight: [],
            columns: 4,
            timmer: null,
        }
    },
    created() { //默认选第一个tab
        this.photoShow(0)
    },
    mounted() {
        // 监听窗口大小变化事件，并实时更新数据属性中的宽度和高度值
        // window.addEventListener('resize', this.imageOnload);
        window.onresize = () => {
            clearTimeout(this.timmer)
            setTimeout(() => {
                this.imageOnload()
            }, 600)
        };
    },
    methods: {
        handleImageLoad(index) {
            // //获取主容器宽度
            // var content = this.$refs.content
            // var contentWidth = content.offsetWidth

            // // img标签的dom数组
            // var imgs = this.$refs.image
            // var imgWidth = imgs[0].offsetWidth

            // // 获取第一行的图片整数 
            // this.firstRowNums = Math.floor(contentWidth / imgWidth)

            //     const image = this.$refs.image
            //     if (index < this.firstRowNums) { //第一行
            //         // 获取第一行全部图片的高度 存到数组
            //         var imgHeight = image[index].offsetHeight
            //         this.firstRowImgsHeight.push(imgHeight)
            //     }
            //     else if(index > this.firstRowNums){  //第二行往后
            //         var obj = {
            //             minHeight: this.firstRowImgsHeight[0],   //第一行最短的高度
            //             minIndex: 0  // 第一行高度最矮的那一项的下标
            //         }
            //         console.log(this.firstRowImgsHeight);
            //         for (let j = 0; j < this.firstRowImgsHeight.length; j++) {
            //             if (this.firstRowImgsHeight[j] < obj.minHeight) {  //找到第一行高度最小那一项
            //                 obj.minHeight = this.firstRowImgsHeight[j]
            //                 obj.minIndex = j
            //             }
            //         }
            //         image[index].style.position = "absolute"
            //         image[index].style.top = obj.minHeight + "px"
            //         image[index].style.left = image[obj.minIndex].offsetLeft + "px"
            //         this.firstRowImgsHeight[obj.minIndex] = this.firstRowImgsHeight[obj.minIndex] + image[index].height
            //     }
        },
        imageOnload() { //加载图片 根据浏览器宽度决定列数
            if (window.innerWidth <=500) {
                this.columns = 1
            } else if (window.innerWidth < 1000) {
                this.columns = 2
            } else if (window.innerWidth <1500) {
                this.columns = 3
            } else if (window.innerWidth < 2000) {
                this.columns = 4
            }
            new WaterFall({ //执行waterfall.js文件中的构造函数
                el: ".wf-content",
                column: this.columns,
                gap: 23 //间距  单位px
            })
        },
        loginRegist() {//改变弹窗可视化，触发登陆注册弹窗
            this.$store.commit('turnVisible')
        },
        photoShow(choose){    //根据选择的tab 切换图片类型
            switch (choose) {
                case 0:
                    this.imgList = null
                    this.imgList = importAll(require.context('@/assets/imgs/recommend', false, /\.(png|jpe?g|svg)$/));
                    break;
                case 1:
                    this.imgList = null
                    this.imgList = importAll(require.context('@/assets/imgs/art', false, /\.(png|jpe?g|svg)$/));
                    break;
                case 2:
                    this.imgList = null
                    this.imgList = importAll(require.context('@/assets/video', false, /\.(mp4)$/));
                    break;
                case 3:
                    this.imgList = null
                    this.imgList = importAll(require.context('@/assets/imgs/game', false, /\.(png|jpe?g|svg)$/));
                    break;
                case 4:
                    this.imgList = null
                    this.imgList = importAll(require.context('@/assets/imgs/pet', false, /\.(png|jpe?g|svg)$/));
                    break;
                case 5:
                    this.imgList = null
                    this.imgList = importAll(require.context('@/assets/imgs/industryDesign', false, /\.(png|jpe?g|svg)$/));
                    break;
                case 6:
                    this.imgList = null
                    this.imgList = importAll(require.context('@/assets/imgs/car', false, /\.(png|jpe?g|svg)$/));
                default:
                    break;
            }
        }
    },
    watch: {
        '$store.state.choose'(newVal) { //切换tab的新值
            this.photoShow(newVal)
        }
    },
}
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}

.Waterfall {
    position: relative;
    margin: 30px auto 0px;
    width: 85%;

    .wf-item {
        position: absolute;

        .icons {
            display: none;
            position: absolute;
            width: 30px;
            height: 30px;
        }

        .collect {
            //收藏
            top: 10px;
            right: 50px;
        }

        .like {
            //点赞
            top: 10px;
            right: 10px;
        }

        .download {
            //下载
            bottom: 15px;
            right: 10px;
        }

        .icons:hover {
            transform: scale(1.1);
        }

        img {
            width: 100%;
            // border-radius: 10px;
            vertical-align: bottom;
            /*去除图片下方的空隙*/
        }

        #videoList {
            width: 100%;
            vertical-align: bottom;
        }

    }

    .wf-item:hover {
        transform: scale(1.015);
        cursor: pointer;
    }

    .wf-item:hover .icons {
        display: block;
    }

    //鼠标悬停时显示上下内阴影  用before伪元素选择器
    .wf-item:hover::before {
        content: '';
        position: absolute;
        // border-radius: 10px;
        width: 100%;
        height: 100%;
        //用逗号间隔，可以设置多个边的内部阴影
        box-shadow: 0px 90px 60px -50px rgba(0, 0, 0, 0.3) inset, //上内阴影
                    0px -90px 60px -50px rgba(0, 0, 0, 0.3) inset;//下内阴影
    }
}
</style>