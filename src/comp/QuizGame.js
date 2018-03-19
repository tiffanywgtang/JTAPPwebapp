import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChoosePage from './ChoosePage';


class QuizGame extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
        
    }
    
    changePage(bool){
        this.setState({
            currentPage:bool
        })
    }
    
   
    
    
  render() {
      
      
      
    return (
       <div>
              
    
              
        </div>  
    );
  }
}

export default QuizGame;