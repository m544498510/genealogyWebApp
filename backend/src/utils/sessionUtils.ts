import {Context} from "koa";
import {IUser} from "../modules/user/model";

export function getUserInfo(ctx: Context): IUser | null {
  if (ctx.session) {
    return ctx.session.user;
  } else {
    return null;
  }
}

export function getUserId(ctx: Context): string {
  if (ctx.session && ctx.session.user) {
    return ctx.session.user._id;
  } else {
    return '';
  }

}
