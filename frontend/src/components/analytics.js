import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";

class Analytics extends React.Component {
  constructor(props) {
    super(props);

    const projectId = Number(this.props.projectId);
    console.log(props, "thes are the props");
    this.state = {
      projectId,
      data: null,
      isDataLoading: false,
    };
  }

  handleGetAnalytics() {
    const projectId = this.state.projectId;
    axios({
      method: "get",
      url: `/api/projects/${projectId}/analytics`,
    })
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          isUserLoading: false,
        });
      });
  }

  componentDidMount() {
    this.handleGetAnalytics();
  }

  render() {
    const { projectId, isDataLoading, data } = this.state;

    return (
      <div>
        <Helmet>
          <title>Data</title>
        </Helmet>
        <div className="container h-100">
          The dashboard: {projectId}
          {data ? JSON.stringify(data) : <p>Not data loaded yet</p>}
        </div>
      </div>
    );
  }
}

export default withRouter(Analytics);
