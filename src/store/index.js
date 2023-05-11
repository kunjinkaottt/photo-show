import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//用于响应组件中的动作
const actions={
    
}
//用于操作数据
const mutations={

    turnVisible:function () {
        state.visible = !state.visible
    }

}  // 在mutations里面不要写业务逻辑 Ajax请求
//用于存储数据
const state={
    visible:false,   //dialog可视化
    tabList:['推荐','人文艺术','视频','游戏','宠物','工业设计','汽车/摩托'],
    
    choose: 0,  //选中的tabList的下标 默认选第一个
}
// 创建store
export default new Vuex.Store({
    actions,
    mutations,
    state
})