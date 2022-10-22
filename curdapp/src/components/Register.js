import React, { useContext, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import {AddData} from "./context/ContextProvider";

const Register = () => {


    
  const navigate = useNavigate();

   const [inputval, setInputval] = useState({
       name:"",
       email:"",
       age: null,
       mobile:"",
      
   });
   const [error, setError] = useState(false);
   const {uData, setuData} = useContext(AddData);
   const [alrtData, setalrtData] = useState(false);

  const setData = (e) =>{
   console.log(e.target.value);
   const {name, value} = e.target;
   setInputval((preval)=>{
         return{
          ...preval,
          [name]:value
         }
   });
   
  };

  const  isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }




  const addData = async(e) =>{
     e.preventDefault();
   const { name, email, age, mobile } = inputval;

   if(!name || !email || !age || !mobile)
        {
          setError(true)
          return false
        }else if(age < 18 || age > 60 || !isValidEmail(email)){
          setError(true)
          return false
        };

          const result = await fetch("http://localhost:8000/register",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              name, email, age, mobile
            })
          });
          const data = await result.json();
          console.log(data);

          if(result.status === 422 || !data){
           
           console.log("error in register")
          }else if(result.status === 420 || !data){
            setalrtData(true)
            //  alert("this email is already exist")
          }else{
            
            console.log("data is aded")
            navigate("/")
            setuData(data);
          }
  }
  return (
    <>

{alrtData ? 
        <>
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Warning!</strong> this email already added!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={()=>setalrtData(false)}
            ></button>
          </div>
        </>
       : ""
      }
    <div className='container'>
      
      <div className='mb-3 col-lg-6 col-md-6 col-12 mt-5'>
            <h2>Add user</h2>
          </div>
      <form className='mt-4'>
        <div className='row'>
          
  <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input value={inputval.name} type="text" name='name' onChange={setData} placeholder="User name" className="form-control" 
    id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' required/>
    {error && !inputval.name && <small id="emailHelp" className="form-text text-muted color-red">Please inter valid data.</small> }
  </div>
  <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" className="form-label">Email</label>
    <input value={inputval.email} type="email" onChange={setData} name='email' className="form-control" 
    id="exampleInputPassword1" autoComplete='off' placeholder="User Email" required/>
    
    {(error || (error && !inputval.email)) && <small id="emailHelp" className="form-text text-muted">Please inter valid email.</small> }
  </div>
  <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" className="form-label">Age</label>
    <input value={inputval.age} type="number" onChange={setData} name='age' className="form-control" 
    id="exampleInputPassword1" autoComplete='off' placeholder="Enter age between 18 to 60" required/>
    {(error &&  (inputval.age<=18 || inputval.age>60)) && <small id="emailHelp" className="form-text text-muted">Please inter between 18 - 60 </small>}
  </div>
  <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" className="form-label">Mobile</label>
    <input value={inputval.mobile} type="text" onChange={setData} name='mobile' className="form-control"
     id="exampleInputPassword1" autoComplete='off' placeholder="Enter Phone" max="12" required/>
     {error && !inputval.mobile && <small id="emailHelp" className="form-text text-muted">Please inter valid data.</small> }
  </div>
  
  
  <button onClick={addData}  type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
    </div>
    </>
  )
}

export default Register;           