<template>
    <div id="waterfall">

        <div class="content">
            <!-- 遍历图片数组获取图片 -->
            <div v-for="(item, index) in imgArr" :key="index">
                <img :src="item" alt="图片api可能过期了" />
                <!-- <img src="../assets/logo.png" alt=""> -->
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

window.onload = function () {


}


export default {
    name: 'WaterFall',
    data() {
        return {
            imgArr: []
        }
    },
    created() {
        let randomWidth = ''
        let randomHeight = ''
        let imgApi = ''
        for (let i = 0; i < 15; i++) {
            randomWidth = Math.floor(Math.random() * 500) + 240  //随机宽度
            randomHeight = Math.floor(Math.random() * 500) + 240 //随机高度
            imgApi = 'https://picsum.photos/' + randomWidth + '/' + randomHeight + '?random=' + i //随机图api
            // 把请求 随机图api得到的图片url放到数组里
            axios.get(imgApi).then(response => {
                this.imgArr.push(response.request.responseURL)
            })
            // 计算并保存图片在页面中的高度 ,用于下一排自动补充到上一排高度最小的图片下面
            // this.imgHeightArr.push(Math.round(240 * this.randomHeight / this.randomWidth))
        }
        var content = document.getElementsByClassName("content")[0]
        var contentWidth = content.offsetWidth  //获取主容器的宽度
        console.log(contentWidth);  
        var imgs = []
        imgs =  content.children
        console.log(imgs[0]);   //多这个缓冲，可以得到imgs第一个元素的offsetWidth
        var imgWidth = imgs[0].offsetWidth
        console.log(imgWidth);
        
        var nums = Math.floor(contentWidth / imgWidth)
        console.log(nums);

        // 收集第一排所有高度
        var arrHeight = []
        for (let i = 0; i < imgs.length; i++) {
            if(i<nums){ //第一行
                arrHeight.push(imgs[i].offsetWidth) //问题可能在于图片获取太慢 ，也可能是错放在created中执行，应该在mounted中执行
            }
            console.log(arrHeight);
        }

        // 

    },
    mounted(){

    },
    methods: {

    }
}




</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}

.content {
    width: 100%;
    height: 2000px;

    div {
        float: left;
        border: 1px solid black;
        padding: 10px;

        img {
            width: 200px;

        }
    }

}
</style>