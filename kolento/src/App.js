import logo from './logo.svg';
import React,{Component,Fragment} from 'react'
import './App.css';
import PT from "prop-types";
import life from '../src/images/life.jpg';
import store from '../src/store/index.js'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// 设置默认值

const ThemeContext = React.createContext('light');
class Study extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="study">
        <img src={life} alt=""/>
      </div>
    )
  }
}

class AddItem extends Component{
  constructor(props){
    super(props);
    this.state={
      value:''
    }
  }
  render(){
    return (
      <div className="add-box">
        <input type="text" placeholder="add item" value={this.state.value} onChange={this.changeValue} onKeyUp={this.enterAdd} />
        <button onClick={this.add}>add</button>
        <button onClick={this.clear}>clear</button>
      </div>
    )
  }
  componentDidMount(){
    this.props.onRef(this);
  }
  changeValue=(e)=>{
    console.log('输入的值',e.target.value)
    this.setState({
      value:e.target.value
    })
  }
  add=()=>{
    console.log('add item')
    let time = new Date().toLocaleDateString();
    this.props.addContent(this.state.value,time);
    this.setState({
      value:''
    })
  }
  enterAdd=(e)=>{
    if(e.keyCode==13){
      console.log('键盘回车添加')
      this.add();
    }
  }
  clear=()=>{
    console.log('clear')
    this.setState({
      value:''
    })
  }
}

class List extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="box">
        <div className="list-item">
          <input className="choose" checked={this.props.current.check} type="checkbox" onChange={this.changeCheck}/>
          <span className="index">{this.props.idx+1}</span>
          <span className="content">{this.props.current.content}</span>
          <span className="time">{this.props.current.time}</span>
          <span className={this.props.current.status=='working'?'blue':'orange'} onClick={this.changeStatus}>{this.props.current.status}</span>
          <span>是否选中 {this.props.current.check.toString()}</span>
          <span className="del" onClick={this.del} style={{'color':'red'}}>delete</span>
        </div>
      </div>


    )
  }
  changeStatus=()=>{
    
    this.props.changeType(this.props.current,this.props.idx);
  }
  del=()=>{
    console.log('当前的文本内容',this.props.current.content)
    this.props.deleteItem(this.props.current.content);
  }
  changeCheck=(e)=>{
    this.props.changeCheck(!this.props.current.check,this.props.idx);
    console.log('checkbox操作',!this.props.current);
    
  }
}

class Father extends Component{
  render(){
    return(
      <div className="father">
        父亲组件
        <Son></Son>
      </div>
    )
  }
}

class Son extends Component{
  static contextType = ThemeContext;
  render(){
    return(
      <div className="son">
        子孙组件:{this.context}
        <ThemeContext.Consumer>
          {value=>(
            <p>通过context的consumer渲染出来的{value}</p>
          )}
        </ThemeContext.Consumer>
      </div>
    )
  }
}

class App extends Component{
  constructor(props){
    console.log('----Mounting阶段开始----')
    console.log('首先执行构造函数，作用：获取props参数和初始化组件内的state状态值')
    super(props);
    this.state={
      itemBox:[
        {check:false,content:'codeing',status:'finished',time:'2020/01/07'},
        {check:true,content:'writing',status:'finished',time:'2020/01/07'},
        {check:false,content:'learning',status:'finished',time:'2020/01/07'},
        {check:true,content:'playing',status:'finished',time:'2020/01/07'},
      ],
      choosen:0,
      reduxBox:store.getState(),
      reduxValue:''
    },
    store.subscribe(this.changeStore);
  }
  componentWillMount(){
    console.log('componentWillMount：在页面被渲染前、组件被挂载到页面之前调用，在render之前被调用，因此在这里更改状态state将不会触发重新渲染,componentWillMount只执行一次');
    console.log('注意：1.此时不能获取页面中的dom对象。2.可以调用setState来改变状态值。3.可以发送异步请求')
  }
  render(){
    console.log('render钩子 作用：渲染组件到页面中，不能在render方法中setState，会导致递归渲染，此时获取不到dom');
    console.log('this.state.reduxBox',this.state.reduxBox)
    return(
      <>
        <div className="app">
          <ThemeContext.Provider value="dark">
            <Father></Father>
          </ThemeContext.Provider>
          <button onClick={this.useChild}>父调用子方法</button>
          <AddItem addContent={this.addContent} onRef={this.onRef}></AddItem>
          {this.state.itemBox.map((current,idx)=>{
            return <List key={idx} idx={idx} current={current} changeType={this.changeType} 
            deleteItem={this.deleteItem} changeCheck={this.changeCheck}></List>
          })}
          <div className="total-box">
            <span className="num" style={{'margin':'0 15px'}}>总共有{this.state.itemBox.length}条数据</span>
            <span className="choosen">当前选中{this.state.choosen}条</span>
          </div>
          <div className="redux-demo">
            <div className="input-box">
              <input type="text" placeholder="测试redux" value={this.state.reduxBox.inputVal} onChange={this.changeRedux}/>
              <button onClick={this.addRedux}>加入到redux中</button>
            </div>
            <ul className="content">
              {this.state.reduxBox.list.length>0?this.state.reduxBox.list.map((cur,idx)=>{
                return <li className="redux-list" key={idx} onClick={this.delRedux}>{cur}</li>
              }):''}
            </ul>
            
          </div>
          <Study></Study>
        </div>
      </>
    )
  }
  componentDidMount(){
    console.log('在页面第一次被渲染后调用,componentDidMount只执行一次')
    console.log(
      `
      此时组件已经挂载到页面中，可以进行dom操作获取dom对象,可以发送请求获取数据
      可以setState修改状态值。此时修改state会重新渲染页面
      ----Mounting阶段结束----
      `
    )
    this.chooseLength();
  }
  componentWillReciveProps(){
    console.log('----Updating阶段开始----')
    console.log(
      `
      componentWillReciveProps：
      在组件接收到一个新的 prop (更新后)时被调用,每当组件的porps或state改变时会调用。这个方法在初始化render时不会被调用。
      组件在接收到新的props时会调用，参数：当前组件的props值，可以通过this.props获取上一次的值，修改state不会触发这个方法。
      `
    )
  }
  shouldComponentUpdate(){
    console.log(`
    shouldComponentUpdate:
    在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用
    这个方法最终必须要返回一个布尔值，返回true页面重新渲染执行render。false则不渲染，render不执行。
    优势：可以通过条件决定是否渲染组件，降低渲染频率
    `)
    return true
  }
  componentWillUpdate(nextProps,nextState){
    console.log(`
    componentWillUpdate:
    在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
    参数：最新的属性和状态，不能修改state会导致递归渲染。
    `)
    console.log('componentWillUpdate结束后执行render渲染视图')
  }
  componentDidUpdate(prevProps,prevState){
    console.log(`
    在组件完成更新后立即调用。在初始化时不会被调用
    此时组件已经更新
    参数:旧的属性和状态`
    )
  }
  componentWillUnmount(){
    console.log('----Unmounting进入写在阶段----')
    console.log(`在组件从 DOM 中移除之前立刻被调用、组件写在前可以用做一些清理操作，清楚定时器、创建的dom`)
  }
  onRef = (ref) => {
    console.log('ref',ref);
    console.log('次此处获取的ref为addItem组件，这个组件复制给另一个Additem，然后可以调用里面的方法')
    this.AddItem = ref
  }
  changeRedux=(e)=>{
    // this.setState({
    //   reduxValue:e.target.value
    // })
    let action={
      type:"input_change_value",
      value:e.target.value
    }
    store.dispatch(action);
  }
  addRedux=()=>{
    console.log('加入redux');
    let value=this.state.reduxBox.inputVal;
    let action={
        type:"input_submit_value",
        value
    }
    store.dispatch(action); 
  }
  delRedux=(index)=>{
    let value=index;
    let action={
        type:"input_delete_value",
        value
    }
    store.dispatch(action); 
  }
  changeStore(){
    this.setState(store.getState());
  }
  useChild=()=>{
    this.AddItem.clear();
  }

  addContent=(item,time)=>{
    console.log('item,time',item,time)
    this.setState({
      itemBox:[...this.state.itemBox,{content:item,time:time,status:'working',check:false,}]
    },()=>{
      console.log('itemBox',this.state.itemBox);
    })
  }
  changeType=(currentItem,index)=>{
    const itemBox = [...this.state.itemBox];
    this.setState({
      itemBox:itemBox.map((current,key)=>{
        if(key==index){
          if(current.status=='working'){
            return {...current,status:'finished'}
          }else{
            return {...current,status:'working'}
          } 
        }else{
          return current;
        }
        
      })
    })
    
  }
  deleteItem=(content)=>{
    this.setState(state=>{
      return{
        itemBox:state.itemBox.filter(current=>{
          return current.content!==content
        })
      }
    })

  }
  changeCheck=(result,idx)=>{
    console.log('传过来的check值',result)
    const itemBox = [...this.state.itemBox];
    this.setState({
      itemBox:itemBox.map((current,key)=>{
        if(key==idx){
          return {...current,check:result} 
        }else{
          return current;
        }
      })
    },()=>{
      this.chooseLength();
    })
  }
  chooseLength=()=>{
    let choosen = this.state.itemBox.filter(current=>{
      return current.check
    })
    this.setState({
      choosen:choosen.length
    })
  }
}

export default App;
