import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import mySocket from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.css';


var num=0;
var clickLimit = 5;

class HostPage extends Component {
    constructor(props){
        super(props);
        
        this.state={
            page:0,
            host:0,
            Q:"",
            O1:"",
            O2:"",
            O3:"",
            O4:"",
            A:1 ,
            MSG:0,
        }
    }
    
    changePage=(bool)=>{
        this.setState({
            page:bool
        })
    }
    
    componentDidUpdate(){

        this.state.MSG;
    }
    
    componentDidMount(){
        
        this.socket = mySocket("https://jtappquiz.herokuapp.com/");
        //this.socket = mySocket("http://localhost:10003");
    
//        this.socket.on("numQ", (data)=>{
//            console.log(data);
//            this.setState({
//                MSG:data + " questions asked"
//            })
//        });
//        console.log(this.state.MSG);
        
    }
    changeQ=(evt)=>{
        var text = evt.target.value;
        this.setState({
            Q:text
        })
    }
    change1=(evt)=>{
        var text = evt.target.value;
        this.setState({
            O1:text
        })
    }
    change2=(evt)=>{
        var text = evt.target.value;
        this.setState({
            O2:text
        })
    }
    change3=(evt)=>{
        var text = evt.target.value;
        this.setState({
            O3:text
        })
    }
    change4=(evt)=>{
        var text = evt.target.value;
        this.setState({
            O4:text
        })
    }
    changeA=(evt)=>{
        var text = evt.target.value;
        this.setState({
            A:text
        })
    }
    
    handleQ=()=>{
        var clickLimit = 5;
       
         if(num === clickLimit) {
            return false;
           }
        else
           {
            num++;
            this.setState({
            MSG:num
           })
            var Qobj={
                  Q:this.state.Q,
                  O1:this.state.O1,
                  O2:this.state.O2,
                  O3:this.state.O3,
                  O4:this.state.O4,
                  A:this.state.A 
            }
            this.socket.emit("qSubmit", Qobj);
               
            return true;
        }
  }
    
  render() { 
      if(num === clickLimit) {
             return(
                  <Alert color="success">
                    <p>Questions sent! Thanks!</p>
                  </Alert>
                )
             
           }
      
     var comp = (
        <Container>
        <Row className="HostRow white shadow">
        
            <Col sm="12">
                <p>Ask 5 Questions about Space:</p> <hr/>
            </Col>
        
        
            <Col sm="6">
                <Input ref="Q" type='text' placeholder='Question' onChange={this.changeQ}/>
            </Col>
        
        
            <Col sm="6">
                <Input ref="O1" type="text" placeholder="Option 1" onChange={this.change1}/>
                <Input ref="O2" type="text" placeholder="Option 2" onChange={this.change2}/>
                <Input ref="O3" type="text" placeholder="Option 3" onChange={this.change3}/>
                <Input ref="O4" type="text" placeholder="Option 4" onChange={this.change4}/>
            </Col>
           <br/>
      
        
            <Col sm="12">
                <FormGroup>
                  <Label>Which one is the correct answer?</Label>
                  <Input ref="A" type="select" onChange={this.changeA}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </Input>
                </FormGroup>
            </Col>
        
        
            <Col sm="6">
                <p>{this.state.MSG} questions asked</p>
            </Col>
            
            <Col sm="6">
                <Button onClick={this.handleQ} outline color="info">Submit</Button>
            </Col>
        </Row>
      </Container>
     )
    return (
        <div>
        {comp}
        </div>
    );
  }
}

export default HostPage;
