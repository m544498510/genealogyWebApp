export const QUERY_SECRETS =  `
  query {
    secrets {
      _id
      siteName
      url
      userName
      decryptPassword
      note
      userId
    }
  }
`;

export const ADD_SECRET = `
  mutation addSecret($siteName: string!, $url: string, $userName: string!, $decryptPassword: string!, $note: string) {
    addSecret(siteName: $siteName, url: $url, userName: $userName, decryptPassword: $decryptPassword, note: $note){
      _id
      siteName
      url
      userName
      decryptPassword
      note
      userId
    }
  }
`;

export const UPDATE_SECRET = `
  mutation updateSecret($id: ID!, $siteName: string!, $url: string, $userName: string!, $decryptPassword: string!, $note: string) {
    updateSecret(_id: $id, siteName: $siteName, url: $url, userName: $userName, decryptPassword: $decryptPassword, note: $note){
      _id
      siteName
      url
      userName
      decryptPassword
      note
      userId
    }
  }
`;

export const DEL_SECRET = `
  mutation deleteSecret($id: ID!){
    deleteSecret(id: $id)
  }
`;
