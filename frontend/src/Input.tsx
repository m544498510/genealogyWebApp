import * as React from 'react';
import gql from "graphql-tag";
import {graphql} from "react-apollo";

const createUser = gql`
  mutation createUserFunc($name: String, $password: String) {
    addUser(name: $name, password: $password) {
      _id,name,password
    }
  }
`;

export interface InputPanelProps {
  mutate: Function
}

export interface InputPanelState {
  createResult: object
}

export class InputPanel extends React.Component<InputPanelProps, InputPanelState> {
  private name: string;
  private password: string;

  constructor(props, context) {
    super(props, context);
    this.state = {
      createResult: null
    }
  }

  onClick = () => {
    this.props.mutate({
      variables: {
        name: this.name,
        password: this.password
      }
    })
      .then(({data}) => {
        this.setState({
          createResult: data
        });
      })
      .catch(e=>{
        console.log(JSON.stringify(e));
      })
  };

  render() {
    return (
      <div style={{marginTop: 50, textAlign:'center'}}>
        <span>Name: </span> <input type="text" onChange={e => this.name = e.target.value}/>
        <br/>
        <span>Password: </span> <input type="password" onChange={e => this.password = e.target.value}/>
        <br/>
        <button onClick={this.onClick}>Commit</button>

        <div>{JSON.stringify(this.state.createResult)}</div>
      </div>
    )
  }
}

export default graphql(createUser)(InputPanel);
