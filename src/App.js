import React from 'react';
import logo from './logo.svg';
import './App.css';

class WorldClock extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      hour: this.props.time,
      minute: 0,
      stop: false,
    }
    // this.setState
    // this.state.minute += 1; 이거 절대 안됨
    // this.setState({minute:1})
    console.log("Child) constructor!!")
  }

  handlingClick = (event) =>{
    console.log(event.target)
    this.setState({stop: event.target.value});
    clearInterval(this.timer);
  }

  componentDidMount(){
    console.log("Child) componentDidMount()!")
    this.timer = setInterval(()=>{
      this.setState((state)=>(
        (state.minute === 59) ?
        {hour: state.hour + 1, minute: 0} : {minute: state.minute+1}
      ))
    }, 5000)
  }

  componentDidUpdate(){
    console.log("Child) componentDidUpdate()!");
  }
  
  componentWillUnmount(){
    console.log("child) 언마운트!!")
    clearInterval(this.setState)
  }

// 미리 약속된 함수
  render(){
    console.log("Child) render")
      return(
        <div>
          <div className={"WorldClock"}>
            <h2>도시 {this.props.city} </h2>
            <p>시간 {this.state.hour}시 {this.state.minute}분</p>
            <button onClick={this.handlingClick}>멈춰라!</button>
          </div>
        </div>
      )
    }
}

class App extends React.PureComponent{
  // State 구조 설정
  // 컴포넌트가 Mount 하기 전에 할 설정
  // setState X
  constructor(props){
    super(props)
    this.cityTimeData = [
      ['서울', 10],
      ['베이징', 9],
      ['시드니', 12],
      ['LA', 17],
      ['부산', 10]
    ];

    this.state = {
      content:'',
      show: true
    }
    console.log("parent)constructor!")
  };

  componentDidMount(){
    // 필요한 데이터 요청
    // 각종 비동기 요청
    console.log("parent)ComponentDidMount()");
  }

  componentDidUpdate(){
    // 업데이트 이 후 수정할 때
    // if(){setState()} 잘못하면 무한루프!
    console.log("parent)componentDidUpdate()!");
  }
// 데이터 요청, 비동기 함수, 타이머 종료
// setState X
  componentWillUnmount(){
    
  }

  handlingChange = (event) =>{
    // console.log(event.target.value);
    this.setState({content: event.target.value});
  }


  handlingClick = (event) =>{
    this.setState((prevState)=>({show: !(prevState.show)}))
  }

  render() {
    console.log("parent)redneer()!")
    return(
    <div className="App">
      <h1 className={'myStyle'}>안녕히가세요</h1>
      <div className ={"post"}>
        첫 게시글입니다.
        </div>
        <textarea value ={this.state.content} onChange={this.handlingChange}></textarea>
        <button onClick={this.handlingClick}>손가락 튕기기</button>
      { this.state.show &&
      this.cityTimeData.map((citytime, index) =>{
        // console.log("index is " + index);
        return <WorldClock city={citytime[0]} time ={citytime[1]} key = {index} />})
      }
    </div>
    );
  }
}
export default App;