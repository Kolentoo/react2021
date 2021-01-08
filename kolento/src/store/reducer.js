// recuder
// 可以获取到store里面的数据，但是不能直接对数据进行修改
// 只能对拷贝后的数据进行修改，最后返回给store
// 原始信息
let defaultState={
  inputVal:'',
  list:["塞尔达传说-旷野之息","马里奥奥德赛","精灵宝可梦剑盾","异度之刃"]
}

export default(state=defaultState,action)=>{
  // state是返回提交上去的信息，提交告知修改哪里的数据
  if(action.type==="input_change_value"){
      let newState=JSON.parse(JSON.stringify(state));
      newState.inputVal=action.value;
      return newState;
  }else if(action.type==="input_submit_value"){
      let newState=JSON.parse(JSON.stringify(state));
      newState.inputVal="";
      newState.list.push(action.value);
      return newState;        
  }else if(action.type==="input_delete_value"){
      let newState=JSON.parse(JSON.stringify(state));
      newState.list.splice(action.value,1);
      return newState;        
  }
  return state;
}