import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditableLabel from 'react-editable-label';
import TaskDetails from './taskDetails';
import TaskList from './TaskList';
import { saveBucket } from '../Store/action';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketName: this.props.match.params.bucket
        };
    }

    updateBucketName = value => {
        let buckets = { ...this.props.buckets };
        buckets[value] = buckets[this.state.bucketName];
        delete buckets[this.state.bucketName];
        this.props.saveBucket(buckets);
        this.setState({ bucketName: value });
    }
    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            Bucket Name:
                        <EditableLabel
                                initialValue={this.state.bucketName}
                                save={value => this.updateBucketName(value)}
                            />
                            <Link className="pull-right" to="/">Back to Buckets</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-7 bg-info">
                            <h4>Task List</h4>
                            <TaskList bucketName={this.state.bucketName}></TaskList>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-4 bg-info">
                            <h4>Create Task</h4>
                            <TaskDetails bucketName={this.state.bucketName}></TaskDetails>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        buckets: state.list.buckets
    };
};


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            saveBucket
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);