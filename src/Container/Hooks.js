import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import EditableLabel from 'react-editable-label';
import TaskDetails from './taskDetails';
import TaskList from './TaskList';


const Tasks = (props) => {
    const [bucketName, updateBucketName] = useState(props.match.params.bucket);
    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        Bucket Name:
                        <EditableLabel
                            initialValue={bucketName}
                            save={value => updateBucketName(console.log(value))}
                        />
                        <Link className="pull-right" to="/">Back to Buckets</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-7 bg-info">
                        <h4>Task List</h4>
                        <TaskList bucketName={bucketName}></TaskList>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-4 bg-info">
                        <h4>Create Task</h4>
                        <TaskDetails bucketName={bucketName}></TaskDetails>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tasks;