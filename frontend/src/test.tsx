import * as React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

export type Props = {
  data: {
    loading: boolean,
    error: object,
    userList: object[]
  }
};

const GET_UserList = gql`
  query {
    userList {
      _id,
      name,
      password
    }
  }
`;

const CreateUser = gql`
  mutation {
    addUser (){
      
    }
  }
`;

export class Test extends React.Component<Props> {
  render() {
    const {loading, error, userList} = this.props.data;
    if(loading){
      return <div>Loading....</div>
    }else if(error){
      return <div>{JSON.stringify(error)}</div>
    }else if(userList && userList.length > 0){
      return userList.map(item => (
        <div>
          <span>Id: {item._id}</span>
          <span style={{marginLeft: 20}}>Name: {item.name}</span>
          <span style={{marginLeft: 20}}>Password: {item.password}</span>
        </div>
      ));
    }
  }
}

export default graphql(GET_UserList)(Test);
