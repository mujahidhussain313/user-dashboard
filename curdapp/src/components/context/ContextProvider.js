import React, { createContext, useState } from 'react';

const AddData = createContext(null);
const UpdateData = createContext(null);
const DelData = createContext(null);
const SerData = createContext(null);


const ContextProvider = ({children}) => {

   const [uData, setuData] = useState("");
   const [upData, setupData] = useState("");
   const [delData, setdelData] = useState("");
   const [serData, setserData] = useState("");
   

  return (
    <AddData.Provider value={{uData, setuData}}>
        <UpdateData.Provider value={{upData, setupData}}>
            <DelData.Provider value={{delData, setdelData}}>
              <SerData.Provider value={{serData, setserData}}>
            {children}
            </SerData.Provider>
            </DelData.Provider>
        
        </UpdateData.Provider>
   
    </AddData.Provider>
  )
}

export default ContextProvider;
export {AddData, UpdateData, DelData, SerData};