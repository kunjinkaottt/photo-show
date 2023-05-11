export class WaterFall{ //类
    constructor(options){  //构造函数
        this.$options = options  
        this.heightArr = []    //高度数组 长度为列数
        this.__init()
    }

    __init(){   //初始化
        this.items = document.querySelector(this.$options.el).children  //获取wf-item数组（每张图外面的div）
        this.column = this.$options.column  //获取在LocalImg.vue构造的列数column
        this.gap = this.$options.gap    //获取在LocalImg.vue构造的间隔 gap
        //获取单张图片的宽度（wf-content宽度减去列数倍间隔 除以总共的列数，得到1列的宽度）
        this.itemWidth = (document.querySelector(this.$options.el).offsetWidth - this.gap*(this.column-1))/this.column
        this.__render()
    }

    __render(){ //渲染
        [...this.items].forEach((value,index)=>{    //遍历每张图外面的div
            value.style.width = this.itemWidth +"px"
            if(index < this.column){    //第一行
                value.style.top ="0px"
                value.style.left = (this.itemWidth + this.gap)*index +"px"
                this.heightArr.push(value.offsetHeight)
            }else{  //第二行往后
                this.minIndex = this.__getMiniIndex()
                value.style.top = this.heightArr[this.minIndex] + this.gap+"px"   //第二排往后的 顶边距为最小高度加间隔
                value.style.left = (this.itemWidth + this.gap)*this.minIndex +"px"  //第二排往后的 左边距为左边多少张图片就加多少张图片的宽度和间隔
                this.heightArr[this.minIndex] += value.offsetHeight +this.gap  //更新一下高度数组，最小高度的那一项就加上了图片的高度
            }
        })
    }

    __getMiniIndex(){//获取高度数组中最小高度的下标
        return this.heightArr.indexOf(Math.min(...this.heightArr))
    }
}