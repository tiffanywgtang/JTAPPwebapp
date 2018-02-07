import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './css/chatPage.css';
import mySocket from 'socket.io-client';
import ChoosePage from './ChoosePage';
import a1 from './img/a1.svg';
import a2 from './img/a2.svg';
import a3 from './img/a3.svg';
import a4 from './img/a4.svg';
import a5 from './img/a5.svg';
import exit from './img/arrow.svg';

class ChatPage extends Component {
     constructor(props){
        super(props);
        this.state={
            mode:0,
            username:"",
            allusers:[],
            allmsgs:[],
            msg:"",
            avatar:"",
            time:""
        }
        this.joinChat=this.joinChat.bind(this);
        this.saveName=this.saveName.bind(this);
        this.saveMsg=this.saveMsg.bind(this);
        this.sendMsg=this.sendMsg.bind(this);
        this.changePage=this.changePage.bind(this);
    }
    
    componentDidMount() {
 
    this.Clock = setInterval( () => this.GetTime(), 1000 );
 
  }
    
    changePage(bool){
        this.setState({
            mode:bool
        })
    }
    
    joinChat(){
        this.setState({
            mode:1
        })
        //socket is the user
        this.socket = mySocket("https://jtappsocket.herokuapp.com/");
        this.socket.emit("uName", this.state.username);
        this.socket.on("names", (data)=>{
            this.setState({
                allusers:data
            })
        });
        
        this.socket.on("allmsgs", (data)=>{
            this.setState({
                allmsgs:data
            })
        });
    }
    
    saveName(evt){
        this.setState({
            username:evt.target.value
        }) 
    }
    
    saveMsg(evt){
        this.setState({
            msg:evt.target.value
        }) 
    }
    
    
    
    
    GetTime() {
 
    var date, TimeType, hour, minutes, fullTime;
 
    date = new Date();
    hour = date.getHours(); 
 
        if(hour <= 11)
        {

          TimeType = 'AM';

        }
        else{

          TimeType = 'PM';

        }

    if( hour > 12 )
    {
      hour = hour - 12;
    } 
    if( hour == 0 )
    {
        hour = 12;
    } 
 
    minutes = date.getMinutes();
 
    if(minutes < 10)
    {
      minutes = '0' + minutes.toString();
    
    }
 
    fullTime = hour.toString() + ':' + minutes.toString() + ':' + ' ' + TimeType.toString();
 
    this.setState({
 
      time: fullTime
 
    })
  }
    
    
    sendMsg(){
        var msg = this.state.username+" "+"("+this.state.time+")"+": " +this.state.msg;
        this.socket.emit("msg", msg);         
    }
  render() {
      var comp=null;
      
      if(this.state.mode === 0){  
      comp = (
            <div>
            <Container>
            <Row>
                <Col>
                <div className="joinBox">
                    <input className="userLogin" type="text" placeholder="Type in username" onChange={this.saveName} />
                    <button className="joinBtn" onClick={this.joinChat}>Join</button>
                <div className="avatarBox">
                    <p className="aText">Choose your avatar:</p>
                    <img src={a1} alt="a1" className="avatar"/>
                    <img src={a2} alt="a2" className="avatar"/>
                    <img src={a3} alt="a3" className="avatar"/>
                    <img src={a4} alt="a4" className="avatar"/>
                    <img src={a5} alt="a5" className="avatar"/>
                </div>
                </div>
                </Col>
            </Row>
            </Container>
            </div>
            );
      }
      
     
      
      else if(this.state.mode === 1){
        
          var allUsers = this.state.allusers.map((obj, i)=>{
          return(
            <div key={i}>
              {obj}
              </div>
          )
      })
           var allmsgs = this.state.allmsgs.map((obj, i)=>{
                  return(
                  <div key={i} className="theMSG">
                      {obj}
                      </div>
                  )
              })
           
          comp = (
            <div className="chatBox">
              <div className="onlineusers">
                
                <img src={exit} alt="exitarrow" className="exit" onClick={this.changePage.bind(this,2)}/>
              
                Online: <hr/>
                {allUsers}
              

            </div>
              <div className="chatDisplay">{allmsgs}</div>
                 
                <div className="controls">  
                    <input type="text" placeholder="message" onChange={this.saveMsg} className="userMsg"/>
                    <button onClick={this.sendMsg} className="sendBtn">Send</button>
                  </div>
              
              </div>
          )
      }
      else if(this.state.mode === 2){
          comp = (
          <ChoosePage/>
          )
      }
      
      
      
     
    return (
       <div className="chatApp">
   
           {comp}
       
        </div>
        
    );
  }
}

export default ChatPage;
