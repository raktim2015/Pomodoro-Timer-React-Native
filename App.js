import React from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';
import Constants from 'expo-constants';
//import vibrate from './utils';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  }

});

const Title = ()=>(
  <Text>Pomodoro Counter</Text>
)

const ButtonPanel = (props) => (
  <View>
    <Button title = "Start" onPress={props.startHandler} />
    <Button title = "Stop"  onPress={props.stopHandler}/>
    <Button title = "Reset" onPress={props.resetHandler}/>
  </View>
)

const DisplayCounter = props => (
  <Text>
    {props.convert(props.time)}
  </Text>
)

const SelectTimer = () => (
<Text>SelectTimer</Text>
)

class App extends React.Component{
    constructor(){
      super()
      this.state = {
        work:10,
        break:5,
        defwork:10,
        defbreak:5,
        curr:1,       //1 for work and 0 for break
        timerState:0  //0 for stop, 1 for start
      }
    }
    

    componentDidMount(){
      
      this.intervalState = setInterval(()=>{
        this.setState((this.state.curr===1)?{work:this.state.work-1}:{break:this.state.break-1})
      },1000)
      clearInterval(this.intervalState)
    }
    

    convertTimetoText = (time) =>{
      const minutes = Math.floor(time/60);
      const seconds = time - minutes*60;
      let disp = minutes + " minutes and " + seconds + " seconds left."
      return disp
    }
    shouldComponentUpdate(nextProps,nextState){
      if(this.state.timerState===0 && nextState.timerState===1){
        this.intervalState = setInterval(()=>{
          this.setState((this.state.curr===1)?{work:this.state.work-1}:{break:this.state.break-1})
        },1000);
        
      } 
      else if((this.state.timerState===1 && nextState.timerState===0)){
        clearInterval(this.intervalState)
      }
      return true
    }
    
    componentDidUpdate(){
      if(this.state.curr===1 && this.state.work===-1){
        Vibration.vibrate([500, 500, 500])
        this.setState({curr:this.state.curr-1,work:this.state.defwork})
      }
      else if(this.state.curr===0 && this.state.break===-1){
        Vibration.vibrate([500, 500, 500])
        this.setState({curr:this.state.curr+1,break:this.state.defbreak})
      }
    }
    startHandler = () =>{
      this.setState({timerState:1})
    }

    stopHandler = () =>{
      this.setState({timerState:0})
    }
    resetHandler = () =>{
      this.setState({work:this.state.defwork,break:this.state.defbreak,timerState:0,curr:1})
    }

    render(){
      return(
        <View style={styles.container}>
          <Title />
          <ButtonPanel 
              startHandler={this.startHandler.bind(this)}
              stopHandler={this.stopHandler.bind(this)}
              resetHandler={this.resetHandler.bind(this)}    
          />
          <DisplayCounter convert = {this.convertTimetoText.bind(this)} time={(this.state.curr===1)?this.state.work:this.state.break} />
          <SelectTimer />
        </View>        
      );
    }
}
export default App;
