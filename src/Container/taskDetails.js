import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {saveItem, updateItem} from '../Store/action';
//import {NotificationManager} from 'react-notifications';

class TaskDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      data : ""
    };
    
  }

  componentDidUpdate(prevProps) {
    if(prevProps.currentTask.data !== this.props.currentTask.data && Object.keys(this.props.currentTask).length > 0){
      let taskList = [...this.props.tasks];
      let currTask =  taskList.filter((val)=> val.id === this.props.currentTask.id);
      this.setState({  
        data:currTask[0].data
      });
    }
  }

  handleChange = (e) => {
    try {
      this.setState({ 
        data : e.target.value
      });
    } catch (e) {
      console.log(e);
    }
  };

  validateForm = () => {
    let validFlag = true;
    let data = {...this.state.data};
    try {
      if(data === ""){
          //NotificationManager.error("Enter "+val,null,5000);
          alert("Enter Value");
          validFlag = false;
      }
      return validFlag;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  saveDetails = (e) =>{
    e.preventDefault();
    if(this.validateForm()){
      if(Object.keys(this.props.currentTask).length>0){
        let taskList = [...this.props.tasks];
        taskList.forEach(val=>{
          if(val.id === this.props.currentTask.id){
            val.data = this.state.data;
          }
        });
        this.props.updateItem(taskList);
        this.setState({ data:"" });
      } else {
        let id = this.props.tasks[this.props.tasks.length-1].id +1;
        this.props.saveItem({ id:id, data: this.state.data});
        this.setState({  data:"" });
      }      
    }
  };
 
  render(){
    return(
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-2">Task Detail:</label>
            <div className="col-sm-10">
              <input onChange={this.handleChange} value={this.state.data} aria-required="true" aria-label="data" type="text" className="form-control" id="data" placeholder="Enter Task Detail" name="data"/>
            </div>
          </div>
          
          <div className="form-group">        
            <div className="col-sm-offset-2 col-sm-10">
              <button onClick={this.saveDetails} type="button" className="btn btn-default">Save</button>
            </div>
          </div>
        </form>
      </div>
    )
  
  }
}

const mapStateToProps = (state) => {
  return {
    tasks : state.list.items,
    currentTask : state.list.currentItem
  };
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveItem,  updateItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
