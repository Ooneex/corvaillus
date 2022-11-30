import {
  AppEnvType,
  AppLocaleType,
  AppRoleType,
  AppVersionType,
} from "@ooneex/app";
import { Helper } from "@ooneex/helper";
import { HttpMethodType, HttpProtocolType } from "@ooneex/http";

import { RouteCollection } from "../Collection.ts";
import { Route } from "../Route/Route.ts";
import { ActionType, IRoute, IRouter } from "../types.ts";

export class Router implements IRouter {
  private routeCollection = new RouteCollection();

  public get(
    name: string,
    path: string,
    action: ActionType,
  ): IRoute {
    return this.register(name, path, ["GET"], action);
  }

  public post(
    name: string,
    path: string,
    action: ActionType,
  ): IRoute {
    return this.register(name, path, ["POST"], action);
  }

  public put(
    name: string,
    path: string,
    action: ActionType,
  ): IRoute {
    return this.register(name, path, ["PUT"], action);
  }

  public patch(
    name: string,
    path: string,
    action: ActionType,
  ): IRoute {
    return this.register(name, path, ["PATCH"], action);
  }

  public delete(
    name: string,
    path: string,
    action: ActionType,
  ): IRoute {
    return this.register(name, path, ["DELETE"], action);
  }

  public head(
    name: string,
    path: string,
    action: ActionType,
  ): IRoute {
    return this.register(name, path, ["HEAD"], action);
  }

  public options(
    name: string,
    path: string,
    action: ActionType,
  ): IRoute {
    return this.register(name, path, ["OPTIONS"], action);
  }

  public register(
    name: string,
    path: string,
    methods: HttpMethodType[],
    action: ActionType,
  ): IRoute {
    const route = new Route({
      name,
      path,
      action,
      method: methods,
    });

    this.routeCollection.add(name, route);

    return route;
  }

  public fromYaml(
    data: Record<string, Record<string, unknown>>,
  ): RouteCollection {
    const names = Object.keys(data);

    names.map((name) => {
      const path = Helper.getByKey<string>(data[name], "path");

      if (!path) {
        return;
      }

      const route = new Route({ name, path });
      route
        .action(
          Helper.getByKey<ActionType>(data[name], "action"),
        )
        .method(Helper.getByKey<HttpMethodType[]>(data[name], "method"))
        .protocol(Helper.getByKey<HttpProtocolType[]>(data[name], "protocol"))
        .host(Helper.getByKey<string[]>(data[name], "host"))
        .ip(Helper.getByKey<string[]>(data[name], "ip"))
        .port(Helper.getByKey<string[]>(data[name], "port"))
        .default(Helper.getByKey<Record<string, string>>(data[name], "default"))
        .data(Helper.getByKey<Record<string, unknown>>(data[name], "data"))
        .locale(Helper.getByKey<AppLocaleType[]>(data[name], "locale"))
        .role(Helper.getByKey<AppRoleType[]>(data[name], "role"))
        .env(Helper.getByKey<AppEnvType[]>(data[name], "env"))
        .version(Helper.getByKey<AppVersionType[]>(data[name], "version"))
        .description(Helper.getByKey<string>(data[name], "description"));

      // Set where constraint
      const where = Helper.getByKey<Record<string, string>>(
        data[name],
        "constraint.where",
      );
      if (where) {
        Object.keys(where).map((property) => {
          route.where(property, where[property]);
        });
      }

      // Set regex constraint
      const regex = Helper.getByKey<Record<string, string>>(
        data[name],
        "constraint.regex",
      );
      if (regex) {
        Object.keys(regex).map((property) => {
          const reg = new RegExp(regex[property]);
          route.whereRegex(property, reg);
        });
      }

      // Set number constraint
      const numbers = Helper.getByKey<string[]>(
        data[name],
        "constraint.number",
      );
      if (numbers) {
        numbers.map((name) => {
          route.whereNumber(name);
        });
      }

      // Set alphaNumeric constraint
      const alphaNumerics = Helper.getByKey<string[]>(
        data[name],
        "constraint.alphaNumeric",
      );
      if (alphaNumerics) {
        alphaNumerics.map((name) => {
          route.whereAlphaNumeric(name);
        });
      }

      // Set uuid constraint
      const uuids = Helper.getByKey<string[]>(data[name], "constraint.uuid");
      if (uuids) {
        uuids.map((name) => {
          route.whereUuid(name);
        });
      }

      // Set in constraint
      const whereIn = Helper.getByKey<Record<string, string[]>>(
        data[name],
        "constraint.in",
      );
      if (whereIn) {
        Object.keys(whereIn).map((property) => {
          route.whereIn(property, whereIn[property]);
        });
      }

      this.routeCollection.add(name, route);
    });

    return this.routeCollection;
  }

  public count(): number {
    return this.routeCollection.count();
  }

  public findByName(name: string): IRoute | undefined {
    return this.routeCollection.get(name);
  }

  public getCollection(): RouteCollection {
    return this.routeCollection;
  }
}
