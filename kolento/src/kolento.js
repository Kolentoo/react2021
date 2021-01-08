import React,{Component} from 'react'

class Kolento extends Component{
  render(){
    return(
      <div className="kolentoo">KolentoKolentoKolentoKolento
        <p className="get-id" onClick={this.getID}>获取来自test页面的id</p>
        <p className="back" onClick={this.back}>返回首页</p>
      </div>
    )
  }
  back=()=>{
    this.props.history.push('/')
  }
  getID=()=>{
    console.log('this.props.match',this.props.match)
    console.log('获取到的参数为',this.props.match.params.id)
  }
}

export default Kolento