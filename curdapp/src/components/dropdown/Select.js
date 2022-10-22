import React,{useContext, useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {SerData} from '../context/ContextProvider';

const SelectCom = ({userData}) => {
 
  const {serData, setserData} = useContext(SerData);
  const [userVal, setuserVal] = useState([]);

  console.log(serData)

  const handleChange = (e) =>{
    setserData(userVal);
  }


  const searchUser = async (e) => {
    let key = e.target.value;
    
    if (key !== "") {
      let result = await fetch(`http://localhost:8000/search/${key}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await result.json();
      if (data) {
        setuserVal(data);
      }
    } else {
      setuserVal("");
    }
  };


  return (
    <div >
      
       <Box className="d-flex" sx={{ minWidth: 120 }}>
       
      <FormControl fullWidth>
      
        <InputLabel id="demo-simple-select-label">Search User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userData.name}
          label="Search User"
          onChange={searchUser}
        >
            <MenuItem value="">All</MenuItem>
            {
                userData.map((user)=>{
                     
                    return <MenuItem value={user.name}>{user.name}</MenuItem>
                })
            }
          
          
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleChange}>Search</Button>
    </Box>
    </div>
  )
}

export default SelectCom;