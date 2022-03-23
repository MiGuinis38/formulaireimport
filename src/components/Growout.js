import React, { Component } from "react";
import { Form, Header } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { CsvToHtmlTable } from "react-csv-to-table";
import Dropzone from "react-dropzone";
import { FileUpload } from "./FileUpload";

import { locationOptions } from "../config";

const tagFileExample = "example-tag-list.csv";

class Growout extends Component {
  state = { locationOptions };

  handleLocationAddition = (e, { value }) => {
    this.setState((prevState) => ({
      locationOptions: [
        { key: this.state.locationOptions.length, text: value, value },
        ...prevState.locationOptions
      ]
    }));
  };

  loadTagListRenderer = () => {
    if (!this.state.tagListData) return null;

    const csvHeaders = this.state.tagListData
      .split("\n")[0]
      .split(",")
      .map((v, idx) => {
        return { key: idx, text: v, value: v };
      });
    return (
      <React.Fragment>
        <Form.Dropdown
          options={csvHeaders}
          placeholder="Select header from tag list as sample ID"
          label="Unique ID"
          selection
          clearable
          required
        />
        <CsvToHtmlTable
          data={this.state.tagListData}
          csvDelimiter=","
          tableClassName="table table-striped table-hover"
          hasHeader
          style={{ width: "100%" }}
        />
      </React.Fragment>
    );
  };

  fileChange = (e) => {
    this.setState({ file: e.target.files[0] }, () => {
      console.log("File chosen --->", this.state.file);
    });
    fetch(tagFileExample)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        this.setState({ tagListData: text });
      });
  };
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Header as="h4" content={`Growout #${this.props.myKey}`} />
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Location"
            name="location"
            options={this.state.locationOptions}
            placeholder="Location"
            search
            selection
            allowAdditions
            clearable
            onAddItem={this.handleLocationAddition}
            onChange={(e, { value }) => this.setState({ location: value })}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <DateInput
            fluid
            label="Start date"
            name="growoutStartDate"
            placeholder="Date"
            value={this.state.growoutStartDate}
            iconPosition="left"
            onChange={(e, { value }) =>
              this.setState({ growoutStartDate: value })
            }
          />
          <DateInput
            fluid
            label="End date"
            name="growoutEndDate"
            placeholder="Date"
            value={this.state.growoutEndDate}
            iconPosition="left"
            onChange={(e, { value }) =>
              this.setState({ growoutEndDate: value })
            }
          />
        </Form.Group>
        <Header as="h5" content="Tag List" sytle={{ marginTop: "5rem" }} />
        <p>Please provide tag list (supported formats: .csv)</p>
        <Dropzone onDrop={(files) => console.log(files)}>
          {({ getRootProps, getInputProps }) => (
            <div className="container">
              <div
                {...getRootProps({
                  className: "dropzone",
                  onDrop: (event) => event.stopPropagation()
                })}
              >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </div>
          )}
        </Dropzone>
        {this.loadTagListRenderer()}
      </React.Fragment>
    );
  }
}

export default Growout;
