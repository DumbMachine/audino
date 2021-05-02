import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Table from "react-bootstrap/Table";

class Analytics extends React.Component {
  constructor(props) {
    super(props);

    const projectId = Number(this.props.projectId);
    this.state = {
      projectId,
      data: null,
      isDataLoading: false,
      layout: {
        height: 400,
        width: 500,
        title: "Pie chart",
      },
    };
  }

  COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  pieData = [];

  CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }

    return null;
  };
  handleGetAnalytics() {
    const projectId = this.state.projectId;
    axios({
      method: "get",
      url: `/api/projects/${projectId}/analytics`,
    })
      .then((response) => {
        response.data &&
          response.data.information &&
          response.data.information.project_progress.map((item) => {
            this.pieData.push({ name: item[0], value: item[1] });
          });
        this.setState({ data: response.data });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response,
          isUserLoading: false,
        });
      });
  }

  componentDidMount() {
    this.handleGetAnalytics();
  }

  render() {
    const { projectId, isDataLoading, data, layout } = this.state;

    return (
      <div>
        <Helmet>
          <title>Data</title>
        </Helmet>
        <div className="container h-100"></div>
        <h4>Project Users: </h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data && data.information
              ? data.information.project_users.map((user, itr) => {
                  return (
                    <tr key={itr}>
                      <td>{itr}</td>
                      <td>{user[0]}</td>
                      <td>{user[1]}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
        <h4>Project Progress: </h4>
        <PieChart width={300} height={400}>
          <Pie
            data={this.pieData}
            color="#000000"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {this.pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={this.COLORS[index % this.COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<this.CustomTooltip />} />
          <Legend />
        </PieChart>
      </div>
    );
  }
}

export default withRouter(Analytics);
