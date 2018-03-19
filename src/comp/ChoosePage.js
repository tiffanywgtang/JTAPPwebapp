import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChatPage from './ChatPage';
import StickerPage from './StickerPage';
import Asteroids from './Asteroids';
import './css/choosePage.css'; 
import pinkPlanet from '../img/pinkPlanet.svg';
import greyPlanet from '../img/greyPlanet.svg';
import earth from '../img/earth.svg';

class ChoosePage extends Component {
    constructor(props){
        super(props);
        this.state={
            currentPage:0
        }
        this.changePage=this.changePage.bind(this);
        this.planetClick1=this.planetClick1.bind(this);
    }
    
    changePage(bool){
        this.setState({
            currentPage:bool
        })
    }
    
    planetClick1(){
        this.setState({
            currentPage:1
        })
    }
    
    
  render() {
      var comp=null;
      
      if(this.state.currentPage === 0){
          comp = (
              <div>
              
        <Container>
              <h2 className="headertitle">Choose A Planet To Explore!</h2>
        <Row className="row1">
              
              <div class="col-sm-4"> 
                <h4 className="headerfont">Chat with Earthlings!</h4>
                <img src={earth} alt="Earth" className="earth" onClick={this.changePage.bind(this,1)}/>
                
              </div>
      
      
            <div class="col-sm-4"> 
                 <h4 className="headerfont">Sticker Page!</h4>
                <img src={pinkPlanet} alt="Pink Planet" className="pinkPlanet" onClick={this.changePage.bind(this,2)}/>
                
            </div>
      
            <div class="col-sm-4"> 
                 <h4 className="headerfont">Asteroid Game!</h4>
                <img src={greyPlanet} alt="Grey Planet" className="greyPlanet" onClick={this.changePage.bind(this,3)}/>
                
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
      }else if(this.state.currentPage === 3){
          comp=(
              <Asteroids />
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