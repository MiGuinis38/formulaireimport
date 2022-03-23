import React, { Component } from "react";
import {
  Form,
  Header,
  Checkbox,
  Button,
  List,
  Icon,
  Dropdown
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import {
  labOptions,
  locationOptions,
  labelOptions,
  fundingBodyOptions
} from "../config.js";
import Growout from "./Growout";

import FileUpload from "./FileUpload";

class CreateExperiment extends Component {
  state = {
    currentUserIsProjectLead: false,
    labOptions,
    locationOptions,
    labelOptions,
    fundingBodyOptions,
    projectStartDate: "2020-01-01",
    projectEndDate: "2020-12-31",
    growouts: []
  };

  fileInputRef = React.createRef();

  handleLabelAddition = (e, { value }) => {
    this.setState((prevState) => ({
      labelOptions: [
        { key: this.state.labelOptions.length, text: value, value },
        ...prevState.labelOptions
      ]
    }));
    console.log(this.state.labelOptions);
  };

  handleLabelChange = (e, { value }) => {
    this.setState({
      labelOptions: [
        ...this.state.labelOptions,
        { key: this.state.labelOptions.length, text: value, value }
      ]
    });
    console.log(value);
  };

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      labOptions: [
        { key: this.state.labOptions.length, text: value, value },
        ...prevState.labOptions
      ]
    }));
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  projectDetailFormRenderer = () => {
    // When the user has indicated that they are the project lead,
    // pull the personal information from their associated user
    // properties
    if (this.state.currentUserIsProjectLead) return null;

    const { lab } = this.state;
    return (
      <React.Fragment>
        <p>Please provide details on the project lead.</p>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First name"
            name="firstName"
            placeholder="Ben"
            required
            onChange={this.onChangeHandler}
          />
          <Form.Input
            fluid
            label="Last name"
            name="lastName"
            placeholder="Wyatt"
            required
            onChange={this.onChangeHandler}
          />
          <Form.Select
            fluid
            label="Lab"
            name="lab"
            options={this.state.labOptions}
            search
            selection
            allowAdditions
            clearable
            value={lab}
            onAddItem={this.handleAddition}
            onChange={(e, { value }) => this.setState({ lab: value })}
          />
        </Form.Group>
        <Form.Input label="Email" placeholder="bwyatt@example.com" required />
      </React.Fragment>
    );
  };

  addGrowout = () => {
    this.setState((prevState) => ({
      growouts: [...prevState.growouts, { key: this.state.growouts.length }]
    }));
  };

  growoutsRenderer = () => {
    if (!this.state.growouts) return null;
    return this.state.growouts.map((go) => {
      return <Growout myKey={go.key + 1} />;
    });
  };

  render() {
    return (
      <Form>
        <Header as="h2" content="Create Dataset" />
        <Header as="h3" icon="clipboard outline" content="General Info" />
        <Form.Select
          fluid
          label="Funding Body"
          name="fundingBody"
          options={this.state.fundingBodyOptions}
          search
          selection
          allowAdditions
          clearable
          value={this.state.fundingBody}
        />
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Title"
            name="projectTitle"
            required
            onChange={this.onChangeHandler}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <DateInput
            fluid
            label="Start date"
            name="projectStartDate"
            placeholder="Date"
            value={this.state.projectStartDate}
            iconPosition="left"
            onChange={(e, { value }) =>
              this.setState({ projectStartDate: value })
            }
          />
          <DateInput
            fluid
            label="End date"
            name="projectEndDate"
            placeholder="Date"
            value={this.state.projectEndDate}
            iconPosition="left"
            onChange={(e, { value }) =>
              this.setState({ projectEndDate: value })
            }
          />
        </Form.Group>
        <Form.TextArea
          label="Description"
          placeholder="A high-level explanation of the experiment/project."
          required
        />

        <Header as="h5" content="Labels" />
        <Dropdown
          placeholder="Test"
          name="labels"
          fluid
          multiple
          search
          selection
          options={labelOptions}
          allowAdditions
          clearable
          // onAddItem={this.handleLabelAddition}
          // onChange={this.handleLabelChange}
        />
        <Header
          as="h3"
          icon="user"
          content="Primary Contact"
          style={{ marginTop: "5rem" }}
        />

        <Checkbox
          label="I am the primary contact."
          onChange={() =>
            this.setState({
              currentUserIsProjectLead: !this.state.currentUserIsProjectLead
            })
          }
          checked={this.state.currentUserIsProjectLead}
        />
        {this.projectDetailFormRenderer()}
        <Header
          as="h3"
          icon="table"
          content="Growouts"
          style={{ marginTop: "5rem" }}
        />
        {this.growoutsRenderer()}
        <Button
          icon="add"
          content="Add Growout"
          color="blue"
          type="button"
          style={{ margin: "1rem 0" }}
          onClick={this.addGrowout}
        />
        <Form.Button>Submit</Form.Button>

        <Header
          as="h2"
          content="Form Overview"
          style={{ marginTop: "10rem" }}
        />
        <p>
          This section details the reasons for what, why, and how for each
          section above. This section will not be included in the production
          version of the form, but I wanted to keep the rationale with the form
          during any discussion.
        </p>
        <List>
          <List.Item>
            <Icon name="right triangle" />
            <List.Content>
              <List.Header>General Info</List.Header>
              <List.Description>
                <p>
                  This section gathers the minimum amount of information to
                  identify an experiment or study. The name is the 'formal'
                  unique name within the lab. There may be multiple experiments
                  associated with a grant or exploratory project in an effort to
                  acquire future funding.
                </p>

                <p>
                  The start and end dates are for the individual experiment.
                  This can be updated as needed when dates are set in stone. It
                  should allow for users to extend time frames if additional
                  growouts are performed if grants get extended. That being
                  said, the growouts could determine the start and end date
                  instead. I'm inclined to go this route, but I need feedback.
                </p>

                <p>
                  A description is required and must at least give a broad idea
                  of the purpose of the study. Optionally, labels/tags could be
                  used to help with searching functionality downstream. New
                  labels can be created as needed. Since this is a skeleton,
                  adding labels was not implemented.
                </p>
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <Icon name="right triangle" />
            <List.Content>
              <List.Header>Primary Contact</List.Header>
              <List.Description>
                <p>
                  This section gathers the minimum amount of information to
                  identify the best person to contact for the experiment or
                  study. Although there may be a project lead such as Sam or
                  Ray, if for example Michelle is in charge of collection of
                  x-ray related data, then she may be a better point of contact.
                </p>
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <Icon name="right triangle" />
            <List.Content>
              <List.Header>Growout(s)</List.Header>
              <List.Description>
                <p>
                  This section gathers the minimum amount of information to
                  identify the associated growouts for an experiment or study.
                  These can be done after an experiment is defined. The goal is
                  to identify at least the physical location and time frame for
                  the growout. Additional information is likely necessary such
                  as the exact field number(s) in which a population for the
                  experiment is grown.
                </p>

                <p>
                  The start and end dates for the growout should be supplied, if
                  at least after plant material is collected from field/growth
                  chamber/greenhouse chamber/etc.
                </p>

                <p>
                  Finally, the tag list should be provided in order to identify
                  what column should be treated as the unique ID for the tag
                  list. This would be expected to be used as the encoded value
                  on the tag (specifically QR code). Since this is just a
                  skeleton, I didn't implement CSV parsing, so I just load
                  static data, but it should give you a general idea of what to
                  expect.
                </p>
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
        {/* <code>{JSON.stringify(this.state)}</code> */}
      </Form>
    );
  }
}

export default CreateExperiment;
