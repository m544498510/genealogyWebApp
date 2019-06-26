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
  mutation addSecret($secretCfg: addSecretInput) {
    addSecret(secretCfg: $secretCfg){
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
  mutation updateSecret($secretCfg: updateSecretInput) {
    updateSecret(secretCfg: $secretCfg){
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
