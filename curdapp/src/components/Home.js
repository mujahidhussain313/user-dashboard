import React, { useEffect, useState, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { AddData } from "./context/ContextProvider";
import { UpdateData } from "./context/ContextProvider";
import { DelData } from "./context/ContextProvider";
import {SerData} from './context/ContextProvider';
import SelectCom from "./dropdown/Select";

const Home = () => {

    // getting data for alert
  const { uData, setuData } = useContext(AddData);
  const { upData, setupData } = useContext(UpdateData);
  const { delData, setdelData } = useContext(DelData);

//   getting data for dropdown select component
  const {serData, setserData} = useContext(SerData);

  const [userData, setuserData] = useState([]);
  console.log(userData);

  // getting all user data
  const getData = async () => {
    const result = await fetch("http://localhost:8000/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    console.log(data);

    if (result.status === 422 || !data) {
      console.log("error in home");
    } else {
      console.log("data is available");
      setuserData(data);
    }
  };

  useEffect(() => {
    getData();
    setserData("");
  }, []);

  //    deleting user

  const deleteUser = async (id) => {
    const res2 = await fetch(`http://localhost:8000/userdelete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deldata = await res2.json();
    console.log(deldata);

    if (res2.status === 422 || !deldata) {
      console.log("error");
    } else {
      console.log("user deleted");
      getData();
      setdelData(deldata);
    }
  };

  return (
    <>
    {/* setting alert for add delete and update user */}
      {uData ? 
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> User Successfully Added!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={()=>setuData("")}
            ></button>
          </div>
        </>
       : ""
      }
      {upData ? 
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> User Successfully Updated!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={()=>setupData("")}
            ></button>
          </div>
        </>
      : ""
      }
      {delData ? 
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Success!</strong> User Successfully Deleted!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={()=>setdelData("")}
            ></button>
          </div>
        </>
      : ""
      }

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <SelectCom userData={userData}/>
        
           </div>

          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Age</th>
                <th scope="col">Operation</th>
              </tr>
            </thead>
            <tbody>
              {serData.length > 0 ? (
                serData.map((item, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id+1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.age}</td>
                        <td className="d-flex justify-content-between">
                          <NavLink to={`/view/${item._id}`}>
                            <button className="btn btn-success">
                              <RemoveRedEyeIcon />
                            </button>
                          </NavLink>
                          <NavLink to={`/update/${item._id}`}>
                            <button className="btn btn-primary">
                              <CreateIcon />
                            </button>
                          </NavLink>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteUser(item._id)}
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                userData.map((item, id) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">{id+1}</th>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.mobile}</td>
                          <td>{item.age}</td>
                          <td className="d-flex justify-content-between">
                            <NavLink to={`/view/${item._id}`}>
                              <button className="btn btn-success">
                                <RemoveRedEyeIcon />
                              </button>
                            </NavLink>
                            <NavLink to={`/update/${item._id}`}>
                              <button className="btn btn-primary">
                                <CreateIcon />
                              </button>
                            </NavLink>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteUser(item._id)}
                            >
                              <DeleteIcon />
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
