import {PageProps} from "../deps.ts";

// Todo: Refactor to ProxyView
export const ProxyComponent = (Props: PageProps) => {
  // console.log(Props.data.app.env.getPort());
  console.log(Props.data.app);
  return <h1>Proxy Component</h1>;
};
