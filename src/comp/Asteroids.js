import React, { Component } from 'react';
import './css/Asteroids.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import mySocket from "socket.io-client";
import background from "./img/space-bg.svg";
import Player1 from "./Player1";
import Player2 from "./Player2";

class Asteroids extends Component {
    
  constructor(props){
      super(props);
      
     this.state ={
            asteroid:require("./img/asteroid.png"),
            screen:0,
            allplayers: [],
            myId:null,
            score1:0,
            score2:0,
        } 
    }
    
    componentDidMount(){
         this.socket = mySocket("https://jtappastroids.herokuapp.com/");
            //this.socket = mySocket("http://localhost:10004");

            this.socket.on("userjoined", (data)=>{
                this.setState({
                    allplayers:data
                })
            });

            this.socket.on("yourid", (data)=>{
            this.setState({
            myId:data
            })
        });
            
  }
    
  handlePlayer1=(playStr)=>{
      this.setState({
          screen:1
      });
      
      this.socket.emit("joingame", playStr);
  }
  
  handlePlayer2=(playStr)=>{
      this.setState({
          screen:2
      });
      
      this.socket.emit("joingame", playStr);
  }
    
  addToScore=()=>{
    if (this.state.clicked){
        return;
    }
    this.setState({ 
        score1: this.state.score1 + 1,
        score2: this.state.score2 + 1,
    });
      console.log(this.state.score1 + 1);
      this.socket.emit("p1score", this.state.score1); 
  }  

 render() {
        var comp = null;
        if(this.state.screen === 0){
            comp =(
                <div className="Asteroids">
                    <div>
                    <h1 className="title white shadow">Asteroids Game</h1>
                    <p className="white">Destroy 5 asteroids first to win!</p>
                    <br /><br />
                    <h4 className="white shadow">Choose your player:</h4>
                    <br />
                    </div>
                    <button className="pBtn" onClick={this.handlePlayer1.bind(this, "player1")}>Player 1</button>
                    <button className="pBtn" onClick={this.handlePlayer2.bind(this, "player2")}>Player 2</button>
                </div>
            )
        }else if (this.state.screen === 1){
             comp =(
                <Player1 />
        )
        }else if (this.state.screen === 2){
             comp =(
                 <Player2 />
        )
        }
    
     return (
          <div className="bg">
            {comp}
          </div>
        );
  }
}

export default Asteroids;