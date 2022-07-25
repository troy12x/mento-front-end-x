import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeader, faHeart, faUserPlus, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken }  from '@fortawesome/free-solid-svg-icons';
import { faMessage }  from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

import image from '../assets/images/image.jpg'
import profile from '../assets/images/profile.jpg'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck }  from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Profile = () => {
    let loadBanner = 'https://i.gifer.com/PG23.gif'
    let loadPfp = 'https://i.gifer.com/PG23.gif'
    const baseURL = `http://localhost:1000`
    const [user,setUser] = useState({})
    const [posts,setPosts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        axios.defaults.withCredentials = true
        async function fetchData(){
            document.title = "Profile | Otnem - Share your project with the world"
            let mainResponse = await axios.get(`${baseURL}/profile?packet=1&user=${(searchParams.get('user'))?searchParams.get('user'):''}`)
            if(mainResponse.data.redirect)
                window.location.href = mainResponse.data.redirect
            let userData = mainResponse.data.userObj
            setUser({...userData})
            setPosts(mainResponse.data.userObj.posts)
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
    const changeFollow = async(follow)=>{
        let response
        if(follow)
            response = await axios.post(`${baseURL}/follow`,{followUserName:user.userName})
        else
            response = await axios.post(`${baseURL}/unfollow`,{unFollowUserName:user.userName})
        if(response.data.middleware)
            return window.location.href = response.data.redirect
        if(response.data.success)
            window.location.reload()
        else
            alert(response.data.msg)
        console.log(response)
    }
    const cover = {
        paddingLeft:"0px",
        paddingRight:"0px"
    }
    const lol = {
        display:"flex",
        gap:"0.5rem",
        placeItems:"center",
        justifyContent:'start',
        alignItems:'start'
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
        background:'#23F649'
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
    <div>
    <style>{"\
        @media screen and (max-width: 991px){\
        .navbar__ {\
            display:none\
        }\
        }\
        #profile{\
        color:#23F649\
        }\
    "
    }</style>
        <Navbar></Navbar>
        <div className="posts_cards mb-5 mt-lg-6 ">
    <div className="container-fluid " >
        <div className="row align-items-center">
            <div className="col-12" style={cover}>
            <div className="cover" >
                <img src={(user.banner)?user.banner:loadBanner} />
            </div>
            </div>
            <div className="col-10 col-lg-5 mt--4 " style={{ margin: "-4rem auto 0 auto"}} >
            <div className="user">
                <div className="pd-left">
                <div className="pd-row">
                    <img src={(user.profilePic)?user.profilePic:loadPfp} className="pd-image" alt="Profile Image" style={{objectFit:"cover",width: "5em",height: "5em",border: "1px solid #DBDBDB"}}></img>
                <div>
                    <div style={lol}>
                    <h3 style={{marginBottom:"0",fontSize:'25px',fontWeight:'bold'}}>Eyad Gomaa </h3>
                    
                    {(user.verified)?<FontAwesomeIcon style={{color:" gb(0, 191, 255)", fontSize:"24px"}}icon={faCircleCheck} />:""}
                    </div>
                    <p> {user.followers} 0 Followers | 0 Following </p>
                    
                    <h4 id="bio" className='mt-1' style={{fontWeight:"bold",textAlign:"center"}}>" Front-end Developer"</h4>
                    </div>
                </div>
                </div>
                <div className="pd-right mt-3">
                    <div style={{display:'flex',gap:'0.5em'}}>
                        {(!user.isMine)?((!user.isFollowing)?(
                            <div style={{cursor:'pointer',hover:{color:"white"}}}>
                                <div className="settings" onClick={()=>{changeFollow(true)}}>
                                    <FontAwesomeIcon icon={faUserPlus} className="hover:text-white" />
                                </div>
                            </div>
                        ):(
                            <div style={{cursor:'pointer',hover:{color:"white"}}}>
                                <div className="settings" onClick={()=>{changeFollow(false)}}>
                                    <FontAwesomeIcon icon={faUserSlash} className="hover:text-white" />
                                </div>
                            </div>
                        )):""}
                        <a href="./settings">
                            <div className="settings">
                                <FontAwesomeIcon icon={faGear} className="hover:text-white" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        
    </div>
    <div className="posts_cards">
    <div className="container-fluid"   >

        <div className="grid_posts" >
    
            <div  className="full_post" style={{height:'100%'}}>
            <a style={postStyle} ></a>
            <div className="post_box" data-type="art">
            <div className="index_image" >
                <img src={profile} width="100%" height="100%" alt="Image Not Available"></img>
            </div>
            <div className="top">
                <div className="items">
                    <a className="item sned" href={`/chat?user=${user.userName}&redirect=true`}>  <FontAwesomeIcon icon={faMessage} /> </a>
                  
                    
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
    </div>
    </div>
    </div>
    )
}

export default Profile