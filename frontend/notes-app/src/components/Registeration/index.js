import {Component} from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react";
import { HiEye ,HiEyeOff} from "react-icons/hi";
import "./index.css"

class Registeration extends Component{
    state={username:"",password:"",
        hidePassword:true,
        emptyFieldsMsg:""
    }

    onClickViewPassword=()=>{
        this.setState(prevState=>({hidePassword:!prevState.hidePassword}))
    }

    onChangeUsername=(event)=>{
        this.setState({username:event.target.value})
    }

    onChangePassword=(event)=>{
        this.setState({password:event.target.value})
    }

    onRegisterationSuccess=()=>{
        
        this.props.navigate("/login",{replace:true})
    }

    onSubmitForm=async (event)=>{
        event.preventDefault()
        const {username,password}=this.state
        const credentials={username,password}
        const url="http://localhost:5501/register";
        const options={
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(credentials)
        }
        const result=await fetch(url,options)
        
        console.log(result.status);
        if(result.status===201){
           this.onRegisterationSuccess()
        }
        if(result.status===400){
            const response=await result.json()
            const {message}=response
            console.log(message)
            this.setState({emptyFieldsMsg:`*${message}`})
        }
        
    }

    onClickLogin=()=>{
        this.props.navigate("/login",{replace:true,state:{registerationSuccess:true}})
    }

    render(){
        const {username,password,hidePassword,emptyFieldsMsg}=this.state
        const inputType=hidePassword?"password":"text"
        const emptyPasswordField=password===""
        return(
            <div className="bg-reg">
                <motion.h1 
                className="h1-signup"
                initial={{opacity:0,scale:0.8}}
                animate={{opacity:1,scale:1}}
                transition={{duration:0.8,ease:"easeOut"}}
                >Welcome to Ruscribe! Let’s Get You Started
                </motion.h1>
                <motion.h2 
                className="h2-signup"
                initial={{opacity:0,scale:0.8}}
                animate={{opacity:1,scale:1}}
                transition={{duration:0.8,ease:"easeOut"}}
                >
                    Smooth, simple, and distraction-free note-taking—
                    <br/>just for you.
                </motion.h2>
                <motion.form 
                className="signup-form" 
                onSubmit={this.onSubmitForm}
                initial={{opacity:0,y:30}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.8,ease:"easeOut"}}
                >
                    <div className="input-container">
                    <input 
                    type="text" 
                    placeholder="Enter Username" 
                    className="username-input-box"
                    onChange={this.onChangeUsername}
                    value={username}
                    />
                    </div>
                    <div className="input-container">
                    <input 
                    type={inputType} 
                    placeholder="Enter Password" 
                    className="password-input-box"
                    onChange={this.onChangePassword}
                    value={password}
                    />
                    <button type="button" 
                    onClick={this.onClickViewPassword}
                    className="view-password-button"
                    style={{color:emptyPasswordField? "transparent":"#b3b3b3"}}
                    >
                       {hidePassword?
                     <HiEye size={20}/>:<HiEyeOff size={20}/>   
                    }
                    </button>
                    </div>
                    <p className="error-msg">{emptyFieldsMsg}</p>
                    <button type="submit"
                    className="create-account-button"
                    >Create Account</button>
                    <div className="login-container">
                    <p>Already have an account?</p>
                    <button type="button" onClick={this.onClickLogin}
                    className="login-button"
                    >Login here</button>
                    </div>
                </motion.form>
            </div>
        )
    }
}

function RegisterationWrapper(){
    const navigate=useNavigate();
    return <Registeration navigate={navigate}/>
}

export default RegisterationWrapper