export type AppEnvType =
  | "dev"
  | "prod"
  | "test"
  | string;

export const AppDefaultEnv: AppEnvType[] = [
  "dev",
  "prod",
  "test",
];
