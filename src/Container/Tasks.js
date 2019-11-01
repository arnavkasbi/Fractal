import React from 'react';
import { Link } from 'react-router-dom';
import TaskDetails from './taskDetails';
import TaskList from './TaskList';


const Tasks = (props) => {
    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Bucket Name : {props.match.params.bucket}
                            <Link className="pull-right" to="/">Back to Buckets</Link>
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-7 bg-info">
                        <h4>Task List</h4>
                        <TaskList bucketName={props.match.params.bucket}></TaskList>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-4 bg-info">
                        <h4>Create Task</h4>
                        <TaskDetails bucketName={props.match.params.bucket}></TaskDetails>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;