"use client"
import {React,useEffect,useState} from "react";

const Unauthorized = () => {
    const [screenWidth, setScreenWidth] = useState(null);
    
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Initial screen width
        setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div style={{display:'flex',height:'100vh',backgroundColor:'black',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <h1 style={{marginLeft:'20px',color:'white',fontSize:screenWidth<430?'15px':''}}>401 - Unauthorized</h1>
            <div style={{height:screenWidth<430?'30%':'40%',width:'2px',backgroundColor:'grey',marginLeft:'20px'}}></div>
            <p style={{marginLeft:'20px',color:'white',fontSize:screenWidth<430?'10px':'',paddingRight:screenWidth<430?'10px':'auto'}}>Sorry, you are not authorized to access this page.</p>
        </div>
    );
};

export default Unauthorized;