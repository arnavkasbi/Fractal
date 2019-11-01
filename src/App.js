import React from 'react';
import "./styles/css/App.css";
import BucketList from "./Container/BucketList";
//import TaskDetails from "./Container/taskDetails";


const App =()=> {
  return (
    <div className="App">
      <div className="container-fluid">
        <BucketList></BucketList>
      </div>      
    </div>
  );
}

export default App;