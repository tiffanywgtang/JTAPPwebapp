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
            myImg: require("../img/sticker-astronaut.svg"),
            myImg2: require("../img/sticker-rocket.svg"),
            myImg3: require("../img/sticker-satelite.svg"),
            myImg4: require("../img/sticker-spacecraft.svg"),
            myImg5: require("../img/greenalien.svg"),
            allUsers:[],
            myid:null,
            showDisplay:false,
            stickers:[]
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
        //this.socket = mySocket("http://localhost:10002");
        this.socket.on("userJoined",(data)=>{
           this.setState({
               allUsers:data
           }) 
        });
        
        
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myid:data
            })
        });
        
        this.socket.on("newmove", (data)=>{
            
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        });
        
        this.socket.on("newSticker", (data)=>{
            this.setState({
                stickers:data
            })
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
            });
        });
              
              
              
              
              
        this.refs.theDisplay.addEventListener("click", (ev)=>{
                this.socket.emit("stick",{
                    x:ev.pageX,
                    y:ev.pageY,
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
      
      
      var allstickers = this.state.stickers.map((obj, i)=>{
          var mystyle = {left:obj.x, top:obj.y};
          return(
            <img style={mystyle} key={i} src={obj.src} height={50} className="allImgs"/>
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
                    {allstickers}
                </div>
        
        
            <div id="controls">
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