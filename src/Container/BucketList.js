import React, { Component } from 'react';
import "../styles/css/TaskList.css";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveBucket } from '../Store/action';
import Modal from "react-modal";


class BucketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //showBucket: false,
            createBucket: true,
            bucketName: ""
        };
    }

    componentDidMount() {
        Modal.setAppElement('#root');
        if (Object.keys(this.props.bucketList).length > 0) {
            this.setState({ createBucket: false });
        }
    }

    changeBucket = (e) => {
        try {
            this.setState({
                bucketName: e.target.value
            });
        } catch (e) {
            console.log(e);
        }
    };

    saveBucket = () => {
        if (this.props.bucketList[this.state.bucketName]) {
            alert("Bucket Already Exists");
        } else {
            let buckets = { ...this.props.bucketList };
            buckets[this.state.bucketName] = [];
            this.props.saveBucket(buckets);
            this.setState({ createBucket: false });
        }
    };

    showBucketList = (data) => {
        let row = [];
        if (data.length > 0) {
            data.forEach((element, id) => {
                row.push(
                    <li key={id} className="list-group-item" >
                        <a href={'Tasks/' + element}>
                            <i
                                className='fa fa-eye pull-right'
                                aria-hidden="true">
                            </i>
                        </a>
                        <span >{element}</span>


                    </li>
                );
            });
        }
        return row;
    };

    createBucket = () => {
        this.setState({ createBucket: true, bucketName: "" })
    };

    closeMe = () => {
        this.setState({ createBucket: false });
    };
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.createBucket}
                >
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-sm-2">Enter Bucket Name:</label>
                            <div className="col-sm-10">
                                <input autoFocus onChange={this.changeBucket} value={this.state.bucketName} aria-required="true" aria-label="bucket" type="text" className="form-control" id="bucket" placeholder="Enter Bucket Name" name="bucket" />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button onClick={this.saveBucket} type="button" className="btn btn-default">Save</button>
                                <button onClick={this.closeMe} type="button" className="btn btn-primary">Close</button>
                            </div>

                        </div>
                    </form>
                </Modal>
                <div className="row bg-info">
                    <div className="col-sm-6">
                        <button onClick={this.createBucket} type="button" className="btn btn-default pull-right">Create Bucket</button>
                        <div className="panel panel-default">
                            <div className="panel-heading">Bucket List</div>
                            <ul className="list-group">
                                {this.showBucketList(Object.keys(this.props.bucketList))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        bucketList: state.list.buckets
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

export default connect(mapStateToProps, mapDispatchToProps)(BucketList);
