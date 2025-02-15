import {Link} from 'react-router-dom'
import { Component } from 'react'
import Cookies from 'js-cookie'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { HiEye ,HiEyeOff} from "react-icons/hi";
import "./index.css"

class Login extends Component{
    state={
        username:"",
        password:"",
        hidePassword:true,
        errorMsg:""
    }

    viewPassword=()=>{
        this.setState(prevState=>({hidePassword:!prevState.hidePassword}))
    }

    onChangeUsername=(event)=>{
        this.setState({username:event.target.value})
    }

    onChangePassword=(event)=>{
        this.setState({password:event.target.value})
    }

    onSubmitForm=async (event)=>{
        event.preventDefault()
        const {username,password}=this.state
        const credentials={username,password}
        const url="http://localhost:5501/login"
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(credentials)
        }
        const result=await fetch(url,options)
        const data=await result.json()
        if(result.status===200){
            const {token}=data
            Cookies.set("jwt_token",token,{expires:1})
            this.props.navigate("/",{replace:true,state:{username}})
        }
        if(result.status===400){
            const {message}=data
            console.log(message)
            this.setState({errorMsg:`*${message}`})
        }
    }

    render(){
        const {username,password,hidePassword,errorMsg}=this.state
        const inputType=hidePassword?"password":"text"
        const emptyPasswordField=password==="";
        return(
            <div className="bg-login">
                <motion.h1 
                className='h1-login'
                initial={{opacity:0,scale:0.8}}
                animate={{opacity:1,scale:1}}
                transition={{duration:0.8,ease:"easeOut"}}
                >
                    Sign In
                </motion.h1>
                <motion.form 
                className="login-form" 
                onSubmit={this.onSubmitForm}
                initial={{opacity:0,y:30}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.8,ease:"easeOut"}}
                >
                    <div className='input-box'>
                    <input 
                    type="text" 
                    placeholder="Enter Username" 
                    className="username-input"
                    onChange={this.onChangeUsername}
                    value={username}
                    />
                    </div>
                    <div className='input-box'>
                    <input 
                    type={inputType} 
                    placeholder="Enter Password" 
                    className="password-input"
                    onChange={this.onChangePassword}
                    value={password}
                    />
                    <button 
                    type="button"
                    onClick={this.viewPassword}
                    className='hide-password-button'
                    style={{color:emptyPasswordField? "transparent":"#b3b3b3"}}
                    >
                     {hidePassword?
                    <HiEye size={20}/>:<HiEyeOff size={20}/> 
                    }
                    </button>
                    </div>
                    <p className="error-msg-login">{errorMsg}</p>
                    <button type="submit" className='submit-button'>Login</button>
                    <div className='sign-up-cta'>
                        <p>New here? </p>
                        <Link to="/register" className='signup-link'>Create an account</Link>
                        </div>
                </motion.form>
            </div>
        )
    }
}

const LoginWrapper=()=>{
    const navigate=useNavigate()
    
    return <Login navigate={navigate}/>
}

export default LoginWrapper