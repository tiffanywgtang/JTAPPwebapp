import React, { Component } from 'react';
import './css/Asteroids.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import mySocket from "socket.io-client";
import background from "./img/space-bg.svg";

class Player1 extends Component {
    
  constructor(props){
      super(props);
      this.state ={
            asteroid:require("../img/asteroid.png"),
            score1:0,
            score2:0,  
        } 
    }
    
     componentDidMount(){
          this.socket = mySocket("https://jtappastroids.herokuapp.com/");   
         //this.socket = mySocket("http://localhost:10004");

            this.socket.on("p2Score", (data)=>{
                this.setState({
                    score2:data
                })
            });

            this.socket.on("yourid", (data)=>{
            this.setState({
            myId:data
            })
        });         
  }
    
     addToScore=()=>{
    if (this.state.clicked){return;}
    this.setState({ 
        score1: this.state.score1 + 1,
    });
      console.log(this.state.score1 + 1);
      this.socket.emit("p1score", this.state.score1); 
  }

  playAgain(e){
    window.location.reload()
  }

 render() {
    
      if(this.state.score1 == 5){
            return (
            <Alert color="success">
                You saved the World!
                <br/><br />
                <Button color="success">Play Again</Button>
            </Alert> 
            )
        }if(this.state.score2 == 4){
            return (
            <Alert color="success">
                Your oponent saved the World!
                <br/><br/>
                <Button color="success" onClick={(e) => {this.playAgain(e)}}>Play Again</Button>
            </Alert> 
            )
        }
     
    return (
           <Container className="Asteroids">
                    <Row>
                        <Col><h4 className="white">Player 1: {this.state.score1}</h4></Col>
                        <Col><h4 className="white">Player 2:  {this.state.score2}</h4></Col>
                    </Row>
                    <Row className="Row">
                        <img className="asteroid" src={this.state.asteroid} onClick={this.addToScore} height={100} />
                        <img className="asteroid2" src={this.state.asteroid} onClick={this.addToScore} height={100} />
                        <img className="asteroid3" src={this.state.asteroid} onClick={this.addToScore} height={100} />
                        <img className="asteroid4" src={this.state.asteroid} onClick={this.addToScore} height={100} />
                        <img className="asteroid" src={this.state.asteroid} onClick={this.addToScore} height={100} />
                        <img className="asteroid2" src={this.state.asteroid} onClick={this.addToScore} height={100} />
                        <img className="asteroid3" src={this.state.asteroid} onClick={this.addToScore} height={100} />
                        <img className="asteroid4" src={this.state.asteroid} onClick={this.addToScore} height={100} />
                    </Row>
                </Container>
        );
  }
}

export default Player1;