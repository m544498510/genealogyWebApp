import {ADD_SECRET, DEL_SECRET, QUERY_SECRETS, UPDATE_SECRET} from "./graphql";
import {mutation, query} from "~/utils/graphqlUtil";
import {Secret, SecretCfg} from "../types";

export function querySecrets(): Promise<Secret[]> {
  return query<Secret[]>(QUERY_SECRETS, 'fetchSecrets');
}

export function addSecret(secretCfg: SecretCfg):Promise<Secret>{
  return mutation<Secret>(ADD_SECRET, 'addSecret', secretCfg);
}

export function updateSecret(secret: Secret): Promise<Secret> {
  return mutation<Secret>(UPDATE_SECRET, 'updateSecret', secret);
}

export function delSecret(id: string): Promise<boolean> {
  return mutation<boolean>(DEL_SECRET, 'delSecret', {id});
}
