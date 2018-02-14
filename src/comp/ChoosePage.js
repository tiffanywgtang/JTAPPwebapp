import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChatPage from './ChatPage';
import StickerPage from './StickerPage';
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
        <Row className="row1">
             
              <div class="col-sm-6"> 
                <button id="chatBtn" className="btn btn-outline-info bLaunch" onClick={this.changePage.bind(this,1)}>Start Chat!</button>
              </div>
      
      
            <div class="col-sm-6"> 
              <button id="stickerBtn" className="btn btn-outline-info bLaunch" onClick={this.changePage.bind(this,2)}>Sticker Page</button>
            </div>
              
        </Row>
              
            
       </Container>
          </div>
          )
      }
      else if(this.state.currentPage === 1){
          comp=(
              <ChatPage />
          );
      }else if(this.state.currentPage === 2){
          comp=(
              <StickerPage />
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