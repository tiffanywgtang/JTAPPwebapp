import React, { Component } from 'react';
import './css/Quiz.css';
import { Container, Row, Col, Button } from 'reactstrap';
import mySocket from 'socket.io-client';
import HostPage from './HostPage';
import PlayerPage from './PlayerPage';


class Quiz extends Component {
    constructor(props){
        super(props);
        
        this.state={
            page:0,
            
        }
    }
    
    changePage=(bool)=>{
        this.setState({
            page:bool
        })
    }
    
    
    
  render() {
      var comp = null;
      
      if(this.state.page === 0){
          comp = (   
          <Row>
            
              <Col sm="12"><h1 className="title5 white shadow">Welcome to the Space Quiz!</h1> </Col>
            
              <Col sm="12"><h3 className="white shadow">Choose one:</h3> <hr/></Col>
            
              <Col sm="6" className="host" ><Button onClick={this.changePage.bind(this,1)} color="info">Host</Button></Col> 
            
              <Col sm="6" className="player"><Button onClick={this.changePage.bind(this,2)} color="info">Player</Button></Col>
        </Row> 
        
        )
      }else if(this.state.page === 1){
          comp = (
          <HostPage 
              backButton = {this.props.backButton}
              />
          )
      }else if(this.state.page === 2){
          comp = (
          <PlayerPage />
          )
      }
      
    return (
      <Container fluid className="Quiz">
       {comp}
      </Container>
    );
  }
}

export default Quiz;
