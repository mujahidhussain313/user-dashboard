import React, {useState, useEffect, useContext} from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {UpdateData} from "./context/ContextProvider";


const Update = () => {

  // const [userData, setuserData] = useState([]);
  //   console.log(userData);
  const {upData, setupData} = useContext(UpdateData);

  const navigate = useNavigate();

    const [inputval, setInputval] = useState({
        name:"",
        email:"",
        age:"",
        mobile:""
       
    })
 
   const setData = (e) =>{
    console.log(e.target.value);
    const {name, value} = e.target;
    setInputval((preval)=>{
          return{
           ...preval,
           [name]:value
          }
    })
   }

   
   const {id} = useParams("");
    console.log(id)

    const getSingleData = async() =>{
        
        
               const result = await fetch(`http://localhost:8000/getuser/${id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
               });
               const data = await result.json();
               console.log(data);
     
               if(result.status === 422 || !data){
                console.log("error in single user detail")
               }else{
                 
                 console.log("data is available of single user")
                 setInputval(data);
               }
       };

       useEffect(()=>{
     getSingleData();
       },[]);

       const updateuser = async(e) =>{
        e.preventDefault();
        const { name, email, age, mobile  } = inputval;
          const result = await fetch(`http://localhost:8000/updateuser/${id}`,{
            method:"PATCH",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              name, email, age, mobile
            })
          });

        const data2 = await result.json();
        console.log(data2);
         if(result.status === 422 || !data2){
          alert("fill the data")
         }else{
          setupData(data2)
          navigate("/");
         }
       }

  return (
    <div className='container'>
    
    <div className='mb-3 col-lg-6 col-md-6 col-12 mt-5'>
            <h2>Update user</h2>
          </div>
    <form className='mt-4'>
      <div className='row'>
<div class="mb-3 col-lg-6 col-md-6 col-12">
  <label for="exampleInputEmail1" className="form-label">Name</label>
  <input value={inputval.name} type="text" name='name' onChange={setData} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  
</div>
<div className="mb-3 col-lg-6 col-md-6 col-12">
  <label for="exampleInputPassword1" className="form-label">Email</label>
  <input value={inputval.email} type="email" onChange={setData} name='email' className="form-control" id="exampleInputPassword1" />
</div>
<div className="mb-3 col-lg-6 col-md-6 col-12">
  <label for="exampleInputPassword1" className="form-label">Age</label>
  <input value={inputval.age} type="text" onChange={setData} name='age' className="form-control" id="exampleInputPassword1" />
</div>
<div className="mb-3 col-lg-6 col-md-6 col-12">
  <label for="exampleInputPassword1" className="form-label">Mobile</label>
  <input value={inputval.mobile} type="text" onChange={setData} name='mobile' className="form-control" id="exampleInputPassword1" />
</div>


<button onClick={updateuser} type="submit" className="btn btn-primary">Submit</button>
</div>
</form>
  </div>
  )
}

export default Update;