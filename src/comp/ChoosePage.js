import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChatPage from './ChatPage';
import App from '../App';
import './css/choosePage.css'; 

class ChoosePage extends Component {
    constructor(props){
        super(props);
        this.state={
            currentPage:0
        }
        this.changePage=this.changePage.bind(this);
    }
    
    changePage(bool){
        this.setState({
            currentPage:bool
        })
    }
    
  render() {
      var comp=null;
      
      if(this.state.currentPage === 0){
          comp = (
              <div>
              
        <Container>
        <Row>
          
            <button id="chatBtn"className="btn btn-outline-info bLaunch" onClick={this.changePage.bind(this,1)}>Start Chat!</button>
          
              
        </Row>
              
            
       </Container>
          </div>
          )
      }
      else if(this.state.currentPage === 1){
          comp=(
              <ChatPage />
          );
      }
      
      
    return (
       <div className="chooseApp">
              
        {comp}
              
  </div>  
    );
  }
}

export default ChoosePage;