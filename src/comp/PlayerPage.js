import React, { Component } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import mySocket from 'socket.io-client';
import './css/Player.css';
import Game from './Game';
import q1 from '../img/q1.svg';
import q2 from '../img/q2.svg';
import q3 from '../img/q3.svg';

class PlayerPage extends Component {
    constructor(props){
        super(props);
        
        this.state={
            mode:0,
            username:"",
            avatar:[q1,q2,q3],
            avatarIndex:0,
            allusers:[],
        }
    }
    
    
    changeMode=(bool)=>{
        this.setState({
            mode:bool
        })
    }
    
    saveName=(evt)=>{
        this.setState({
            username:evt.target.value
        }) 
    }
    
    changeava=(i)=>{
        this.setState({
            avatarIndex:i
        })
        
    }
    
    joinGame=()=>{
        this.setState({
            mode:1
        })
        
        this.socket = mySocket("https://jtappquiz.herokuapp.com/");
        //this.socket = mySocket("http://localhost:10003");
             var usrinfo = {
                name: this.state.username,
                ava: this.state.avatarIndex
            }
            
            this.socket.emit("uName", usrinfo);
        
            this.socket.on("names", (data)=>{
                this.setState({
                    allusers:data
            })
        });
    }
    
  render() {
      var comp = null;
      
      var allava = this.state.avatar.map((obj,i)=>{
         return(
             <img ref="avaImg" src={obj} alt="img" className="avatar" key={i} onClick={this.changeava.bind(this, i)}/>
        )
      });
     
     if(this.state.mode === 0){  
      comp = (
          
            <Container fluid className="playerchoose">
            <Row>
                <Col sm="12" className="title3">
                    <h1 className="title6">Space Quiz!</h1>  <hr/>
                </Col>
          
                <Col sm="7" >
                    <Input id="userLogin" type="text" placeholder="Type in username" onChange={this.saveName}/>
                </Col>
          
                <Col sm="5" >
                    <Button id="joinBtn" onClick={this.joinGame}>Join</Button>
                </Col>
            
                <Col sm="12" className="avatarBox">
                    <p className="white aText">Choose your avatar:</p>
                    {allava}
                </Col>
                
            </Row>        
            </Container>
        
            );
      }
        else if(this.state.mode === 1){
            comp =(
                <Game 
                allUsers = {this.state.allusers}
                username = {this.state.username}
                />
            )        
        }

    return (
    <div className="playerPage">
       {comp}

    </div>
    );
  }
}

export default PlayerPage;
