import React,{Component} from 'react'

class Test extends Component{
  constructor(props){
    super(props);
    this.state={
      id:123
    }
  }
  render(){
    return(
      <div className="test">测试demo页面
        <p className="tok" onClick={this.toK}>跳转到kolento</p>
        <p className="get-id" onClick={this.getID}>获取当前url参数</p>
      </div>
    )
  }
  toK=()=>{
    this.props.history.push('/kolento/'+this.state.id);
  }
  getID=()=>{
    console.log('当前url参数',this.props.match.params.id);
  }
}

export default Test