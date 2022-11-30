import { LocaleType } from "@ooneex/translation";

export type AppLocaleType = LocaleType;
export type AppEnvType = "dev" | "prod" | "test" | "demo";
export type AppRoleType =
  | "ROLE_GUEST"
  | "ROLE_USER"
  | "ROLE_ADMIN"
  | "ROLE_SUPER_ADMIN"
  | `ROLE_${Uppercase<string>}`;
export type AppVersionType = `${number}.${number}.${number}`;
