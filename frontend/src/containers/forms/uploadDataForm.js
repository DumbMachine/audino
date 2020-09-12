import React from "react";
import { withRouter } from "react-router";
import Dropzone from "react-dropzone-uploader";
import { withStore } from "@spyna/react-store";
import "react-dropzone-uploader/dist/styles.css";

class UploadDataForm extends React.Component {
    constructor(props) {
        super(props);

        const userName = this.props.userName;
        const projectId = this.props.projectId;

        this.initialState = {
            userName,
            projectId,
            // addDataUrl: `/api/datazip`,
            addDataUrl: `/api/projects/${projectId}/data`,
    };

    this.state = Object.assign({}, this.initialState);
    console.log(this.props);
  }

  getUploadParams = ({ file, meta }) => {
    const body = new FormData();
    body.append("fileField", file);
    body.append("username", this.state.userName);
    body.append("projectId", this.state.projectId);
    return {
      url: this.state.addDataUrl,
      body,
      headers: {
        Authorization: localStorage.getItem("access_token"),
        //   Authorization: "Bearer " + localStorage.getItem("access_token")
      },
    };
  };
  handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  render() {
    return (
      <Dropzone
        getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
        accept="application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream, audio/*, application/json"
      />
    );
  }
}

export default withStore(withRouter(UploadDataForm));