import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import logo from './img/grouplogo.png';
import jImg from './img/ju.svg';
import tImg from './img/tiff.svg';
import ChoosePage from './comp/ChoosePage';

class App extends Component {
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
              <br/><br/>
                <img className="logo" src={logo} alt="logo" />
                <h1 className="title">Juliana and Tiffany's App</h1>
                <h2 className="blue">We design and develop applications</h2>
        <Container>
        <Row>
          <Col>
             <img src={jImg} alt="jImg" clasName="lanImg"/>
          </Col>
        
          <Col>
              <p className="parag">
                Currently Juliana and Tiffany are finishing up their diploma at BCIT for Digital Design and Development. They learned many necessary and great skills surrounding development, and that involves HTML, CSS, JavaScript, React, and many more. Also specializing in adobe softwares like Photoshop, Illustrator, InDesign, After Effects and Premiere Pro. Even learning 
                many web development tools, Tiffany's heart still lies in Digital Marketing, and Juliana is more passionate about Graphic Design.
              </p>
          </Col>
          
          <Col>
                <img src={tImg} alt="tImg" clasName="lanImg" />
          </Col>
              
        </Row>
              
            <button className="btn btn-outline-info bLaunch" onClick={this.changePage.bind(this,1)}>Enter Space!</button>
       </Container>
          </div>
          )
      }
      else if(this.state.currentPage === 1){
          comp=(
              <ChoosePage />
          );
      }
      
      
    return (
       <div className="App">
              
        {comp}
              
  </div>  
    );
  }
}

export default App;
