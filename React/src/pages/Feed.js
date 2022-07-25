import Navbar from '../Navbar.js';
import '../assets/css/all.css'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faMessage }  from '@fortawesome/free-solid-svg-icons';
import profile from '../assets/images/profile.jpg'

import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck }  from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import '../assets/css/boostrap.min.css'
import { useSearchParams } from 'react-router-dom';

const Feed = () => {
    const baseURL = `http://localhost:1000`
    const [posts,setPosts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        async function fetchData(){
            axios.defaults.withCredentials = true
            document.title = "Feed | Otnem - Share your project with the world"
            let mainResponse = await axios.get(`${baseURL}/?packet=1&attr=cat&element=${(searchParams.get('element'))?searchParams.get('element'):'all'}`)
            setPosts(mainResponse.data.posts)
        }
        fetchData()
    }, []);
    const changeLike = async(isLiked,postNum,user)=>{
        let response
        if(isLiked)
            response = await axios.post(`${baseURL}/addLike`,{postNum,user})
        else
            response = await axios.post(`${baseURL}/removeLike`,{postNum,user})
        if(response.data.middleware)
            return window.location.href = response.data.redirect
        if(response.data.success){
            return window.location.href = `/post?postNum=${postNum}&user=${user}`
        }
    }
    const no = {
        marginLeft:"0vw",
        fontSize:"1.5em",
        fontWeight: "bold",
        width:"100%",
        textAlign:"center",
        color:"#757575",
        display:"inline-block",
        padding:"0.5em 1em",
        borderRadius:"0.5em 1em",
        display:(posts[0])?"none":"block"
    }
    const mystyle = {
        paddingTop:'85px'
    };
    const active ={
        background:'#23F649',
        color:'white'
    }
    const noActive = {
        fontSize:'1rem'
    }
    const postStyle = {
        width:"20em",
        height:"24em",
        position:"absolute",
        marginLeft:"0",
        borderRadius:"3em 3em 0 0" ,
        cursor:"pointer",
        zIndex:"2",
    }
    const iconStyle = {
        zIndex:"3"
    }
    return (
    <div style={mystyle}>
        <Navbar>

    </Navbar>
    <style>
    {"\
    #house{\
    color:#23F649\
    }\
    "}
    </style>
    <div className="container" >
        <div className="Selector_Links" style={{fontSize:"1.2rem"}}>
        <div className="SC_Item" style={(!searchParams.get('element'))?active:noActive} onClick={()=>{window.location.href = `/?attr`}} id="SC_IT" data-type="all" >
            <p >All</p>
        </div>
        <div className="SC_Item" style={(searchParams.get('element')==='art')?active:noActive} onClick={()=>{window.location.href = `/?attr=cat&&element=art`}} id="SC_IT" data-type="art">
            <p>Art</p>
        </div>
        <div className="SC_Item" style={(searchParams.get('element')==='tech')?active:noActive} onClick={()=>{window.location.href = `/?attr=cat&&element=tech`}} id="SC_IT" data-type="tech">
            <p>Tech</p>
        </div>
        <div className="SC_Item" style={(searchParams.get('element')==='uxui')?active:noActive} onClick={()=>{window.location.href = `/?attr=cat&&element=uxui`}} id="SC_IT" data-type="uiux">
            <p>UI/UX</p>
        </div>
        <div className="SC_Item" style={(searchParams.get('element')==='amvs')?active:noActive} onClick={()=>{window.location.href = `/?attr=cat&&element=amvs`}} id="SC_IT" data-type="amvs">
            <p>Amvs</p>
        </div>
        <div className="SC_Item" style={(searchParams.get('element')==='photoshop')?active:noActive} onClick={()=>{window.location.href = `/?attr=cat&&element=photoshop`}} id="SC_IT" data-type="photoshop">
            <p>Photoshop</p>
        </div>
        <div className="SC_Item" style={(searchParams.get('element')==='games')?active:noActive} onClick={()=>{window.location.href = `/?attr=cat&&element=games`}} id="SC_IT" data-type="games">
            <p>Games</p>
        </div>
        <div className="SC_Item" style={(searchParams.get('element')==='other')?active:noActive} onClick={()=>{window.location.href = `/?attr=cat&&element=other`}} id="SC_IT" data-type="other">
            <p>Other</p>
        </div>
        </div>
    </div>
   
    <div className="posts_cards mt-5" >
    <div className="container-fluid"   >

       <a href='/post'> 
       <div className="grid_posts" >
    
       <div  className="full_post" style={{height:'100%'}}>
       <a style={postStyle} ></a>
       <div className="post_box" data-type="art">
       <div className="index_image" >
           <img src={profile} width="100%" height="100%" alt="Image Not Available"></img>
       </div>
       <div className="top">
           <div className="items">
               <a className="item sned" >  <FontAwesomeIcon icon={faMessage} /> </a>
             
               
                   <div style={iconStyle} className="item star" >
                   <FontAwesomeIcon  icon={faHeart}  style={{color:'red'}}/>
                   </div>
            
           
           </div>
       </div>
       <div className="bottom">
       <a className="UserDetails" style={{cursor:'pointer'}}>
               <div className="UserImage">
               <img src={profile} alt="User Profile Image"></img>
               </div>
               <div className="name_time">
               <div className="name">
                   <h6 style={{width:'auto',height:'1.3em',overflow:'hidden !important',textOverflow:'ellipsis',whiteSpace: 'nowrap' ,textAlign:'end' , marginRight:'0.5em',fontWeight:'bold'}}>Eyad Gomaa </h6>
                  <FontAwesomeIcon icon={faCircleCheck} />
               </div>
               <h6>1h ago </h6>
               </div>
           </a>
           <div className="post_name">
                <h5 style={{width:'4rem',height:'1.3em',overflow:'hidden !important',textOverflow:'ellipsis',whiteSpace: 'nowrap' ,textAlign:'start' , }}> Title</h5>
           </div>
       </div>
       </div>
   <div className="bottom-post">
       <div>
       <h2></h2>
       <p style={{color:"#9e9ea7",textAlign:'center',fontWeight:'bold'}}> 0 Likes | 0 Comments </p>
       </div>
   </div>
   </div>
   
   </div>
       </a>
    </div>
    </div>
    </div>
    )
}

export default Feed