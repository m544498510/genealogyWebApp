import {ADD_SECRET, DEL_SECRET, QUERY_SECRETS, UPDATE_SECRET} from "./graphql";
import {mutation, query} from "~/utils/graphqlUtil";
import {Secret, SecretCfg} from "../types";

export function querySecrets(): Promise<Secret[]> {
  return query<{secrets: Secret[]}>(QUERY_SECRETS)
    .then(data => data.secrets);
}

export function addSecret(secretCfg: SecretCfg):Promise<Secret>{
  return mutation<{addSecret: Secret}>(ADD_SECRET, 'addSecret', {secretCfg})
    .then(data => data.addSecret);
}

export function updateSecret(secret: Secret): Promise<Secret> {
  return mutation<{updateSecret: Secret}>(UPDATE_SECRET, 'updateSecret', {secretCfg:secret})
    .then(data => data.updateSecret);
}

export function delSecret(id: string): Promise<boolean> {
  return mutation<boolean>(DEL_SECRET, 'deleteSecret', {id});
}
