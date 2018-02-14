import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChoosePage from './ChoosePage';
import App from '../App';
import './css/stickerPage.css'; 
import mySocket from 'socket.io-client';
import exit from './img/arrow.svg';


class StickerPage extends Component {
    constructor(props){
        super(props);
        this.state={
            currentPage:0,
            myImg: require("../img/astronaut.svg"),
            myImg2: require("../img/bluealien.svg"),
            myImg3: require("../img/greenalien.svg"),
            myImg4: require("../img/rocket.svg"),
            myImg5: require("../img/star.svg"),
            allUsers:[],
            myid:null,
            showDisplay:false,
            
        }
        this.changePage=this.changePage.bind(this);
        this.leaveChat=this.leaveChat.bind(this);
        this.handleImg=this.handleImg.bind(this);
        
    }
    
    changePage(bool){
        this.setState({
            currentPage:bool
        })
    }
          componentDidMount(){
        this.socket = mySocket("https://jtappsticker.herokuapp.com/");
        this.socket.on("userJoined",(data)=>{
           this.setState({
               allUsers:data
           }) 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myid:data
            })
        })
        
        this.socket.on("newmove", (data)=>{
            
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        })
        
        this.refs.theDisplay.addEventListener("mousemove", (ev)=>{
            
            if(this.state.myid === null){
                return false;
            }
            
            this.refs["u"+this.state.myid].style.left=ev.pageX+"px";
            this.refs["u"+this.state.myid].style.top=ev.pageY+"px";
            
            this.socket.emit("mymove", {
                x:ev.pageX,
                y:ev.pageY,
                id:this.state.myid,
                src: this.refs["u"+this.state.myid].src
            })
        });
    }
    
    handleImg(evt){
        this.refs["u"+this.state.myid].src=evt.target.src;
    }
    
    
    leaveChat(){
        this.setState({
            showDisplay:true
        })
        this.socket.disconnect();
    }
    
    
  render() {
      console.log(this.state.allUsers);
      var allImgs = this.state.allUsers.map((obj, i)=>{
          return(
            <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i}/>
          )
      })
      
      var comp = null;
      
      if(this.state.showDisplay === true){
          comp = (
              <ChoosePage/>
          )
      }else{
         comp = (
        <div>
              <div ref ="theDisplay" id="display">
                <img src={exit} alt="exitarrow" className="exit" onClick={this.leaveChat}/>
              
                {allImgs}
                 
                </div>
        
        
            <div id="controls">
                {this.state.myid}
                <img src ={this.state.myImg} height={50} onClick={this.handleImg}/>
                <img src ={this.state.myImg2} height={50} onClick={this.handleImg}/>
                <img src ={this.state.myImg3} height={50} onClick={this.handleImg}/> 
                <img src ={this.state.myImg4} height={50} onClick={this.handleImg}/>
                <img src ={this.state.myImg5} height={50} onClick={this.handleImg}/>

            </div>
          </div>
      )
      }
      
      
    return (
       <div className="stickerApp">
            {comp}
      
  </div>  
    );
  }
}


export default StickerPage;