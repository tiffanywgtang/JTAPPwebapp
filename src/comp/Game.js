import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import mySocket from 'socket.io-client';
import './css/Game.css';
import q1 from '../img/q1.svg';
import q2 from '../img/q2.svg';
import q3 from '../img/q3.svg';

var click = 0;
class Game extends Component {
    constructor(props){
        super(props);
        
        this.state={
            mode:0,
            avatar:[q1,q2,q3],
            score:0,
            quiz:[{
                Q:"",
                A:"",
                O1:"",
                O2:"",
                O3:"",
                O4:"",
            }],
            oppScore:[],
            
        }
    }
    componentDidMount(){
        this.socket = mySocket("http://localhost:10003");
    
        this.socket.on("quiz", (data)=>{
            this.setState({
                quiz:data
            })
            console.log(this.state.quiz);
        })
        
        
//       this.socket.on("oppScore", (data)=>{
//           this.setState({
//               oppScore:data
//           })
//           console.log(data);
//           console.log(this.state.oppScore);
//       })
//        
        
        this.socket.on("resultA", (data)=>{
            if(data === true){
                var newScore = this.state.score;
                this.setState({
                score:newScore + 10
                })  
            }
          
            console.log(this.state.score);
        })
        
        this.socket.on("resultB", (data)=>{
          if(data === true){
                var newScore = this.state.score;
                var myscore = newScore + 10;
                this.setState({
                score:myscore
                })
            }
            console.log(this.state.score);
        })
        
        this.socket.on("resultC", (data)=>{
         if(data === true){
                var newScore = this.state.score;
                this.setState({
                score:newScore + 10
                })
            }
            console.log(this.state.score);
        })
        
        this.socket.on("resultD", (data)=>{
          if(data === true){
                var newScore = this.state.score;
                
                this.setState({
                score:newScore + 10
                })
            }
            console.log(this.state.score);
        })
    
    
    }
    
    changeMode=(bool)=>{
        this.setState({
            mode:bool
        })
        
        var opp = {
            username:this.props.username,
            score:this.state.score
        }
        
         this.socket.emit("playerScore", opp);
    }

    handleA=(optionNum)=>{ 
        var clickLimit = 1; //Max number of clicks
          
        if(click>=clickLimit) {
              return false;
           }
        else
           {
            this.socket.emit("answerA", optionNum);
            click++;
            return true;
           }
      }
    
    handleB=(optionNum)=>{
        var clickLimit = 1; //Max number of clicks
          
        if(click>=clickLimit) {
              return false;
           }
        else
           {
           this.socket.emit("answerB", optionNum);
            click++;
            return true;
           }
      }
    handleC=(optionNum)=>{
        var clickLimit = 1; //Max number of clicks
          
        if(click>=clickLimit) {
              return false;
           }
        else
           {
            this.socket.emit("answerC", optionNum);
            click++;
            return true;
           }
      }
    handleD=(optionNum)=>{
        var clickLimit = 1; //Max number of clicks
          
        if(click>=clickLimit) {
              return false;
           }
        else
           {
            this.socket.emit("answerD", optionNum);
            click++;
            return true;
           }
      }
    handleE=(optionNum)=>{
         var clickLimit = 1; //Max number of clicks
          
        if(click>=clickLimit) {
              return false;
           }
        else
           {
            this.socket.emit("answerE", optionNum);
            click++;
            return true;
           }
      }
    
    
  render() {
      var allusers = this.props.allUsers.map((obj, i)=>{
          return (
          <div className="user" key={i}>
              
              <img src={this.state.avatar[obj.ava]} className="avatar1"
              height={50}
              alt="img"/> {obj.name}
              </div>
          )
      })
      
     
      var comp = null;
      
      if(this.state.mode === 0){
          comp = (
              <Row id="Q1">
              
               <Col sm="12" className="title2">
                <h3>{this.state.quiz[0].Q}</h3>
                </Col>

              <Col sm="6">
                <Button outline color="primary" onClick={this.handleA.bind(this,"1")}>{this.state.quiz[0].O1}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleA.bind(this,"2")}>{this.state.quiz[0].O2}</Button>  
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleA.bind(this,"3")}>{this.state.quiz[0].O3}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleA.bind(this,"4")}>{this.state.quiz[0].O4}</Button>  
              </Col>

                <Col sm="12">
                <Button color="success" onClick={this.changeMode.bind(this,1)}>Next</Button>
              </Col>
            </Row>
          )
      }
        else if(this.state.mode === 1){
          comp = (
              <Row id="Q1">
               <Col sm="12" className="title2">
                <h3>{this.state.quiz[1].Q}</h3>
                </Col>

              <Col sm="6">
                <Button outline color="primary" onClick={this.handleB.bind(this,"1")}>{this.state.quiz[1].O1}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleB.bind(this,"2")}>{this.state.quiz[1].O2}</Button>  
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleB.bind(this,"3")}>{this.state.quiz[1].O3}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleB.bind(this,"4")}>{this.state.quiz[1].O4}</Button>  
              </Col>

                <Col sm="12">
                <Button color="success" onClick={this.changeMode.bind(this,2)}>Next</Button>
              </Col>
            </Row>
          )
      }
      else if(this.state.mode === 2){
          comp = (
              <Row id="Q1">
               <Col sm="12" className="title2">
                <h3>{this.state.quiz[2].Q}</h3>
                </Col>

              <Col sm="6">
                <Button outline color="primary" onClick={this.handleC.bind(this,"1")}>{this.state.quiz[2].O1}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleC.bind(this,"2")}>{this.state.quiz[2].O2}</Button>  
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleC.bind(this,"3")}>{this.state.quiz[2].O3}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleC.bind(this,"4")}>{this.state.quiz[2].O4}</Button>  
              </Col>

                <Col sm="12">
                <Button color="success" onClick={this.changeMode.bind(this,3)}>Next</Button>
              </Col>
            </Row>
          )
      }
      else if(this.state.mode === 3){
          comp = (
              <Row id="Q1">
               <Col sm="12" className="title2">
                <h3>{this.state.quiz[3].Q}</h3>
                </Col>

              <Col sm="6">
                <Button outline color="primary" onClick={this.handleD.bind(this,"1")}>{this.state.quiz[3].O1}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleD.bind(this,"2")}>{this.state.quiz[3].O2}</Button>  
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleD.bind(this,"3")}>{this.state.quiz[3].O3}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleD.bind(this,"4")}>{this.state.quiz[3].O4}</Button>  
              </Col>

                <Col sm="12">
                <Button color="success" onClick={this.changeMode.bind(this,4)}>Next</Button>
              </Col>
            </Row>
          )
      }
      else if(this.state.mode === 4){
          comp = (
              <Row id="Q1">
               <Col sm="12" className="title2">
                <h3>{this.state.quiz[4].Q}</h3>
                </Col>

              <Col sm="6">
                <Button outline color="primary" onClick={this.handleE.bind(this,"1")}>{this.state.quiz[4].O1}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleE.bind(this,"2")}>{this.state.quiz[4].O2}</Button>  
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleE.bind(this,"3")}>{this.state.quiz[4].O3}</Button> 
                </Col>

                <Col sm="6">
                <Button outline color="primary" onClick={this.handleE.bind(this,"4")}>{this.state.quiz[4].O4}</Button>  
              </Col>

                <Col sm="12">
                <Button color="success" onClick={this.changeMode.bind(this,5)}>Next</Button>
              </Col>
            </Row>
          )
      }
       else if(this.state.mode === 5){
          comp = (
            <Row id="Q1">
               <Col sm="12" className="title2">
                <h2>The Winner is:</h2>
                </Col>
              
                
            </Row>
          )
      }
      
    return (
      <Container fluid className="Game">
        <Row>
        <Col sm="6" className="score">Score: <h2> {this.state.score} </h2></Col>
        <Col sm="6" className="playerList"><h3>Players</h3> <hr/> {allusers}</Col>
        </Row>
        
        {comp}
       
        
      </Container>
    );
  }
}

export default Game;
