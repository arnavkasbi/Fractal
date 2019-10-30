import React, { Component } from 'react';
import "../styles/css/TaskList.css";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteItem, editItem, updateItem } from '../Store/action';
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
      // selectedRows : [],
      selectedCount: 0,
      allSelected: false,
      clearSelectedRows: false
    };
    this.tableObject = {};
  }

  markComplete = () => {
    let markedArr = this.tableObject.selectedRows.map(val=>val.id);
    let completedArr = this.props.tasks.filter(val => {
      if(markedArr.indexOf(val.id) !== -1){
        val.isComplete = true;
      }
      return val;
    });

    this.props.updateItem(completedArr);
  };

  deleteDetails = () => {
    this.handleClearRows();
    let taskList = [...this.props.tasks];
    let deleteArr = this.tableObject.selectedRows.map(val => val.id);
    let output = taskList.filter((val) => {
      return deleteArr.indexOf(val.id) === -1;
    });

    this.props.deleteItem(output);

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
    if (data.length > 0) {
      data.forEach((element, index) => {
        if (status === "completed") {
          if (element.isComplete) {
            row.push(
              {
                data: element.data,
                id: element.id,
                isComplete : element.isComplete
              }
            );
          }
        } else {
          if (!element.isComplete) {
            row.push(
              {
                data: element.data,
                id: element.id,
                isComplete : element.isComplete
              }
            );
          }
        }
      });
    } 
    return row;
  };

  handleSelection = (e) => {
    this.tableObject = e;
  };

  handleClearRows = () => {
    this.setState({ clearSelectedRows: !this.state.clearSelectedRows })
  };
  
  render() {
    //console.log(this.state);
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-6">
            <DataTable
              columns={todoColumns}
              data={this.rowCreated(this.props.tasks)}
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
              data={this.rowCreated(this.props.tasks, "completed")}
              keyField={'id'}
              responsive
            >
            </DataTable>
          </div>
          &nbsp;
          <div className="row">
            <button onClick={this.editDetails} type="button" className="btn btn-default">Edit</button>
            <button onClick={this.deleteDetails} type="button" className="btn btn-default">Delete</button>
            <button onClick={this.markComplete} type="button" className="btn btn-default">Mark Complete</button>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    tasks: state.list.items,
    currentTask: state.list.currentItem
  };
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteItem, editItem, updateItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
