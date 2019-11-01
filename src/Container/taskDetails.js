import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveItem } from '../Store/action';
//import {NotificationManager} from 'react-notifications';

class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };

  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentTask.data !== this.props.currentTask.data && Object.keys(this.props.currentTask).length > 0) {
      let taskList = this.props.buckets[this.props.bucketName];
      let currTask = taskList.filter((val) => val.id === this.props.currentTask.id);
      this.setState({
        data: currTask[0].data
      });
    }
  }

  handleChange = (e) => {
    try {
      this.setState({
        data: e.target.value
      });
    } catch (e) {
      console.log(e);
    }
  };

  validateForm = () => {
    let validFlag = true;
    let data = { ...this.state.data };
    try {
      if (data === "") {
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

  saveDetails = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let buckets = { ...this.props.buckets };
      if (Object.keys(this.props.currentTask).length > 0) {
        let taskList = buckets[this.props.bucketName];
        taskList.forEach(val => {
          if (val.id === this.props.currentTask.id) {
            val.data = this.state.data;
          }
        });
        this.props.saveItem(buckets);
        this.setState({ data: "" });
      } else {
        if (buckets[this.props.bucketName].length > 0) {
          let lastEl = buckets[this.props.bucketName].length - 1;
          let id = buckets[this.props.bucketName][lastEl].id + 1;
          let item = { id: id, data: this.state.data, isComplete: false };
          buckets[this.props.bucketName].push(item)
        } else {
          let item = { id: 0, data: this.state.data, isComplete: false };
          buckets[this.props.bucketName] = [item];
        }

        this.props.saveItem(buckets);
        this.setState({ data: "" });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="form-group">
          <label className="control-label col-sm-2">Task Detail:</label>
          <div className="col-sm-10">
            <input autoFocus onChange={this.handleChange} value={this.state.data} aria-required="true" aria-label="data" type="text" className="form-control" id="data" placeholder="Enter Task Detail" name="data" />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button onClick={this.saveDetails} type="button" className="btn btn-default">Save</button>
          </div>
        </div>
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.list.items,
    currentTask: state.list.currentItem,
    buckets: state.list.buckets,
  };
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      saveItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
