// action
// 用于告诉store修改哪些数据
// import {INPUT_CHANGE_VALUE,INPUT_SUBMIT_VALUE,INPUT_DELETE_VALUE} from "./actionTypes.js"
export let changeValue=(value)=>{
    return {
        type:'changeValue',
        value,
    }
}
export let submitValue=(value)=>{
    return {
        type:'submitValue',
        value,
    }
}
export let delValue=(value)=>{
    return {
        type:'delValue',
        value,
    }
}