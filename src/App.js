import React from 'react';
import "./styles/css/App.css";
import TaskList from "./Container/TaskList";
import TaskDetails from "./Container/taskDetails";


function App() {
  // function navigate() {
  //   window.location.href="/details";
  // }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manipulation</h1>
      </header>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-7 task-details">
            <h1>Task List</h1>
            <TaskList></TaskList>
          </div>
          
          {/* <button onClick={navigate}>Add Customer</button> */}
          <div className="col-sm-4 task-details">
            <h1>Create Task</h1>
            <TaskDetails></TaskDetails>
          </div>
        </div>
       
      </div>      
    </div>
  );
}

export default App;
