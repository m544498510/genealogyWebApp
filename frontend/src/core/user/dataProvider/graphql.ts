export const QUERY_CURRENT_USER = `
  query {
    currentUser {
      name
      nikeName
    }
  }
`;

export const ADD_USER = `
  mutation addUser($userName: string!, $password: string!, $nikeName: string!) {
    addUser(name: $userName, password: $password, nikeName: $nikeName){
      name,
      nikeName
    }
}
`;
