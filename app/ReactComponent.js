import React,{Component} from 'React'
class ClockBtn extends Component{
    constructor(props){
        super(props);
        this.state = {
            isToggleOn:true
        };
        this.toggleClockClick = this.toggleClockClick.bind(this);
    }
    toggleClockClick(){
        this.setState(prestate => ({
            isToggleOn: !prestate.isToggleOn,
        }))
    }
    render(){
        return <button onClick={this.toggleClockClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
    }
}
class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            date:new Date(),
            color:"#000",
        }
    }
    componentDidMount(){
        this.timeID = setInterval(() => {this.setTick();this.setColor();},1000)
    }
    componentWillUnmount(){
        clearInterval(this.timeID);
    }
    computed(){
        const computedObj = {
            color:() =>{
                let result= "#"; 
                for(let i = 0;i<6;i++)
                {
                    result += Math.floor(Math.random()*16).toString(16)
                }
                return result;
            },
            date:new Date()
        }
        return computedObj;
    }
    setColor(){
        this.setState({
            color:this.computed().color()
        })
    }
    setTick(){
        this.setState((prestate,props) => {
            return {
                date:this.computed().date,
                // color:"#ccc"
            }
        })
    }
    render(){
        return <div style={{display:'inline-block'}}><span style={{color:this.state.color}}>{this.state.date.toLocaleTimeString()}</span><ClockBtn /></div>
    }
}
class Root extends Component {
    render() {
      return (
        <ul>
            <li>Say:{this.props.name}</li>
            <li>const data :静态数据</li>
            <li>lock:<Clock /></li>
        </ul>
      );
    }
  }

class ReactComponent extends Component {
    
   render(){
       return(
               <Root  name="Helloworld"/>
       )
   }
}

export default ReactComponent;