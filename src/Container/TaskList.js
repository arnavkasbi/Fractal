import React, { Component } from 'react';
import "../styles/css/TaskList.css";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteItem, editItem, saveItem } from '../Store/action';
import DataTable from 'react-data-table-component';
//import {NotificationManager} from 'react-notifications';

const todoColumns = [
  {
    name: 'To Do Tasks',
    selector: 'data',
    fixedHeader: true,
    compact: true
  }
];

const completedColumns = [
  {
    name: 'Completed Tasks',
    selector: 'data',
    fixedHeader: true,
    compact: true
  }
];

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCount: 0,
      allSelected: false,
      allCompleted: false,
      clearSelectedRows: true,
      clearCompletedRows: true
    };
    this.tableObject = {};
    this.completedTasks = {};
  }

  markComplete = () => {
    this.handleClearRows();
    let buckets = { ...this.props.buckets };
    let markedArr = this.tableObject.selectedRows.map(val => val.id);
    buckets[this.props.bucketName] = buckets[this.props.bucketName].filter(val => {
      if (markedArr.indexOf(val.id) !== -1) {
        val.isComplete = true;
      }
      return val;
    });

    this.props.saveItem(buckets);
  };

  markTodo = () => {
    this.handleClearCompletedRows();
    let buckets = { ...this.props.buckets };
    let markedArr = this.completedTasks.selectedRows.map(val => val.id);
    buckets[this.props.bucketName] = buckets[this.props.bucketName].filter(val => {
      if (markedArr.indexOf(val.id) !== -1) {
        val.isComplete = false;
      }
      return val;
    });

    this.props.saveItem(buckets);
  };

  deleteDetails = () => {
    this.handleClearRows();
    let buckets = { ...this.props.buckets };
    let taskList = buckets[this.props.bucketName];
    let deleteArr = this.tableObject.selectedRows.map(val => val.id);
    let output = taskList.filter((val) => {
      return deleteArr.indexOf(val.id) === -1;
    });
    buckets[this.props.bucketName] = output;
    this.props.deleteItem(buckets);
  }

  editDetails = () => {
    this.handleClearRows();
    if (!this.tableObject.selectedCount || this.tableObject.selectedCount > 1) {
      alert("Select single item to edit ");
    } else {
      this.props.editItem(this.tableObject.selectedRows[0])
    }
  }


  rowCreated = (data, status) => {
    let row = [];
    if (data && data.length > 0) {
      data.forEach((element, index) => {
        if (status === "completed") {
          if (element.isComplete) {
            row.push(
              {
                data: element.data,
                id: element.id,
                isComplete: element.isComplete
              }
            );
          }
        } else {
          if (!element.isComplete) {
            row.push(
              {
                data: element.data,
                id: element.id,
                isComplete: element.isComplete
              }
            );
          }
        }
      });
    }
    return row;
  };

  handleSelection = (e) => {
    let temp = {}
    temp.allSelected = e.allSelected;
    temp.selectedRows = e.selectedRows.filter(val=>!val.isComplete);
    temp.selectedCount = temp.selectedRows.length;
    this.tableObject = temp;
  };

  handleCompleteSelection = e => {
    let temp = {}
    temp.allSelected = e.allSelected;
    temp.selectedRows = e.selectedRows.filter(val=>val.isComplete);
    temp.selectedCount = temp.selectedRows.length;
    this.completedTasks = temp;
  }
  handleClearRows = () => {
    this.setState({ clearSelectedRows: !this.state.clearSelectedRows })
  };
  handleClearCompletedRows = () => {
    this.setState({ clearCompletedRows: !this.state.clearCompletedRows })
  };

  render() {
    //console.log(this.state);
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-6">
            <DataTable
              columns={todoColumns}
              data={this.rowCreated(this.props.buckets[this.props.bucketName])}
              keyField={'id'}
              selectableRows
              onRowSelected={this.handleSelection}
              clearSelectedRows={this.state.clearSelectedRows}
              responsive
            >
            </DataTable>
          </div>
          <div className="col-sm-6">
            <DataTable
              columns={completedColumns}
              data={this.rowCreated(this.props.buckets[this.props.bucketName], "completed")}
              keyField={'id'}
              selectableRows
              onRowSelected={this.handleCompleteSelection}
              clearSelectedRows={this.state.clearCompletedRows}
              responsive
            >
            </DataTable>
          </div>
        </div>
        <div className="row">
          <button onClick={this.editDetails} type="button" className="btn btn-default">Edit</button>
          <button onClick={this.deleteDetails} type="button" className="btn btn-default">Delete</button>
          <button onClick={this.markTodo} type="button" className="btn btn-default">Mark TODO</button>
          <button onClick={this.markComplete} type="button" className="btn btn-default">Mark Complete</button>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    buckets: state.list.buckets,
    currentTask: state.list.currentItem
  };
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteItem, editItem, saveItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
