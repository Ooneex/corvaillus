import {DotEnvValueType, MiddlewareHandlerContext} from "../deps.ts";
import { env } from "../Env/Env.ts";
import {IEnv} from "../Env/IEnv.ts";

interface IMiddlewareState {
  app: {
    env: IEnv;
  }
}

export class ProxyMiddleware {
  public async handler(
    request: Request,
    ctx: MiddlewareHandlerContext<IMiddlewareState>,
  ) {
    const envData: Record<string, DotEnvValueType> = JSON.parse(Deno.env.get("OONEEX_APP_ENV") as string);
    env.setData(envData);
    ctx.state.app = {env};
    return await ctx.next();
  }
}
