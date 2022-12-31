import { ProxyMiddleware } from "@ooneex/app";

const middleware = new ProxyMiddleware();
export const { handler } = middleware;
