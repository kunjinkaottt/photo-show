<template>
    <div class="tab">
        <!-- $el 是这里的整个dom -->
        <li class="tab-item li" @click="chooseTab($el, index)" v-for="(item, index) in $store.state.tabList">
            {{ item }}
        </li>
    </div>
</template>

<script>
export default {
    name: "Tab",
    components: {},
    props: {},
    data() {
        return {

        };
    },
    watch: {},
    computed: {},
    methods: {
        chooseTab(tabDom, index) { //选择类型
            for (let i = 0; i < tabDom.childNodes.length; i++) {
                i === index ? tabDom.childNodes[index].className = 'tab-item-active li' : tabDom.childNodes[i].className = 'tab-item li'
                this.$store.state.choose = index
            }
        },
        changeLiSize() {
            var tabDom = document.getElementsByClassName('li')
            for (let i = 0; i < tabDom.length; i++) {
                window.innerWidth < 650 ?   //屏幕宽度小于650px 时 切换小字体 否则放大
                    tabDom[i].style.fontSize = '14px' :
                    tabDom[i].style.fontSize = '20px'
            }
        }
    },
    created() {

    },
    mounted() {
        var tabDom = document.getElementsByClassName('li')
        tabDom[this.$store.state.choose].className = 'tab-item-active li'//默认选中第一个
        this.changeLiSize()
        window.addEventListener('resize', this.changeLiSize);
    }
};
</script>
<style lang="less" scoped>
.tab { //选择栏
    width: 100%;
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-wrap: wrap;
    // margin: 10px;

    .li {
        list-style: none;
        font-weight: bold;
        font-size: large;
        cursor: pointer;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 25px;
    }

    .tab-item {
        color: black;
        background-color: white;
    }

    .tab-item-active {
        color: white;
        background-color: black;
    }
}
</style>