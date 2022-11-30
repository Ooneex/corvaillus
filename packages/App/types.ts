import { LocaleType } from "./deps.ts";

export type AppLocaleType = LocaleType;
export type AppEnvType =
  | "dev"
  | "staging"
  | "pre-prod"
  | "prod"
  | "test"
  | "demo"
  | `${string}`;
export type AppRoleType =
  | "ROLE_GUEST"
  | "ROLE_USER"
  | "ROLE_ADMIN"
  | "ROLE_SUPER_ADMIN"
  | `ROLE_${Uppercase<string>}`;
export type AppVersionType = `${number}.${number}.${number}`;

export const AppDefaultEnv: AppEnvType[] = [
  "dev",
  "pre-prod",
  "prod",
  "staging",
  "test",
  "demo",
];
