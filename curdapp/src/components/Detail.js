import React,{useState, useEffect} from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import profile from "../imges/3135715.png";
import { useParams, NavLink, useNavigate } from "react-router-dom";

const Detail = () => {

  const navigate = useNavigate();

  const [userData, setuserData] = useState([]);
    console.log(userData);

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
                 
                 console.log("data is available of ainglw user")
                 setuserData(data);
               }
       };

       useEffect(()=>{
     getSingleData();
       },[]);

       const deleteUser = async (id) =>{
        const res2 = await fetch(`http://localhost:8000/userdelete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const deldata = await res2.json();
        console.log(deldata);

        if(res2.status === 422 || !deldata){
            console.log("error")
        }else{
            console.log("user deleted");
            
            navigate("/")
        }
       }


  return (
    <div className="container mt-3">
      
      <h1>Wellcome {userData.name}</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
        <dv className="add_btn d-flex justify-content-end">
               <NavLink to={`/update/${userData._id}`}> <button className="btn btn-primary mx-2">
                  <CreateIcon />
                </button> </NavLink>
                <button onClick={()=> deleteUser(userData._id)} className="btn btn-danger">
                  <DeleteIcon />
                </button>
              </dv>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12 ">
              <img src={profile} style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                Name: <span>{userData.name}</span>
              </h3>
            
              <p>
                <EmailIcon /> Email: <span>{userData.email}</span>
              </p>
              
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12 mt-3">
              
              <p className="mt-5">
                <PhoneAndroidIcon /> Mobile: <span>+92 {userData.mobile}</span>
              </p>
              <p className="mt-3">
                Age: <span>{userData.age} </span>
              </p>
              
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
