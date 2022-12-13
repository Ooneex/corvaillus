import { DotEnv, DotEnvValueType, File } from "../deps.ts";
import { IEnv } from "./IEnv.ts";
import { AppEnvType } from "./types.ts";
import { AppLocaleType, AppVersionType } from "../types.ts";

export class Env implements IEnv {
  private dotEnv: DotEnv = new DotEnv();

  public generateEnvFile(): void {
    const file = new File(".env");
    if (file.exists()) {
      return;
    }

    file.ensure();
    file.write(`ENV=dev
LOCALE=en-us
COUNTRY="United States"
VERSION=1.0.0
SECRET=${crypto.randomUUID()}
DEBUG=true
PORT=8000
`);
  }

  public async parse() {
    await this.dotEnv.parse(".env");
    await this.dotEnv.parse(".env.test");
    await this.dotEnv.parse(".env.prod");
    await this.dotEnv.parse(".env.local");
    await this.dotEnv.parse(".env.test.local");
    await this.dotEnv.parse(".env.prod.local");
  }

  public getAppEnv(): AppEnvType | null {
    return this.dotEnv.get<AppEnvType>("ENV") ?? null;
  }

  public isDev(): boolean {
    return this.getAppEnv() === "dev";
  }

  public isProd(): boolean {
    return this.getAppEnv() === "prod";
  }

  public isTest(): boolean {
    return this.getAppEnv() === "test";
  }

  public getCountry(): string | null {
    return this.dotEnv.get<string>("COUNTRY") ?? null;
  }

  public getLocale(): AppLocaleType | null {
    return this.dotEnv.get<AppLocaleType>("LOCALE") ?? null;
  }

  public getPort(): number | null {
    return this.dotEnv.get<number>("PORT") ?? null;
  }

  public getSecret(): string | null {
    return this.dotEnv.get<string>("SECRET") ?? null;
  }

  public getVersion(): AppVersionType | null {
    return this.dotEnv.get<AppVersionType>("VERSION") ?? null;
  }

  public isDebug(): boolean {
    return this.dotEnv.get<boolean>("DEBUG") === false;
  }

  public get<T>(key: Uppercase<string>): T | undefined {
    return this.dotEnv.get<T>(key);
  }

  public getData(): Record<string, DotEnvValueType> {
    return this.dotEnv.getData();
  }

  public setData(data: Record<string, DotEnvValueType>): void {
    this.dotEnv.setData(data);
  }
}

export const env = new Env();