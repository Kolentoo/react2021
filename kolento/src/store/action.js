// action
// 用于告诉store修改哪些数据
import {INPUT_CHANGE_VALUE,INPUT_SUBMIT_VALUE,INPUT_DELETE_VALUE} from "./actionTypes.js"
export let getChangeValueAction=(value)=>{
    return {
        type:INPUT_CHANGE_VALUE,
        value,
    }
}
export let getSubmitValueAction=(value)=>{
    return {
        type:INPUT_SUBMIT_VALUE,
        value,
    }
}
export let getDeleteValueAction=(value)=>{
    return {
        type:INPUT_DELETE_VALUE,
        value,
    }
}