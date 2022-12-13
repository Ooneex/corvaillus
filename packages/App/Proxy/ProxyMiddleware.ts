import { MiddlewareHandlerContext } from "../deps.ts";

interface IMiddlewareState {
  env: unknown;
  context: MiddlewareHandlerContext;
}

export class ProxyMiddleware {
  public async handler(
    request: Request,
    context: MiddlewareHandlerContext<IMiddlewareState>,
  ) {
    // console.log(JSON.parse(localStorage.getItem("EnvConfig") as string));

    return await context.next();
  }
}
