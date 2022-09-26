import React from "react";
import ChildComponent from "./ChildComponent";
import AddComponent from "./AddComponent";

class MyComponent extends React.Component {

    state = {

        arrJobs: [
            {
                id: "1",
                title: "dev",
                salary: '100'
            },
            {
                id: "2",
                title: "test",
                salary: '200'
            },
            {
                id: "3",
                title: "PM",
                salary: '300'
            }
        ]
    }

    addNewJob = (job) => {
        this.setState({
            arrJobs: [...this.state.arrJobs, job]
        })
    }

    deleteAJob = (job) => {
        let currentJob = this.state.arrJobs;
        currentJob = currentJob.filter(item => item.id !== job.id)
        this.setState({
            arrJobs: currentJob
        })
    }

    render() {

        return (
            <>
                <AddComponent
                    addNewJob={this.addNewJob}
                />

                <ChildComponent
                    arrJobs={this.state.arrJobs}
                    deleteAJob={this.deleteAJob} />
            </>
        )
    }
}

export default MyComponent;