import { DotEnv, DotEnvValueType, File } from "../deps.ts";
import { IEnv } from "./IEnv.ts";
import { AppEnvType } from "./types.ts";
import { AppLocaleType, AppVersionType } from "../types.ts";

export class Env implements IEnv {
  private dotEnv: DotEnv = new DotEnv();

  public generateEnvFile(): void {
    let fileContent = `ENV=dev
LOCALE=en-us
COUNTRY="United States"
VERSION=1.0.0
SECRET=${crypto.randomUUID()}
DEBUG=true
PORT=8080
`;
    const file = new File(".env");
    if (file.exists()) {
      fileContent = file.read();
    } else {
      file.ensure();
      file.write(fileContent);
    }

    // Generate .env.local if not exists
    const localEnvFile = new File(".env.local");
    if (localEnvFile.exists()) {
      return;
    }

    localEnvFile.ensure();
    localEnvFile.write(fileContent);
  }

  public async parse(): Promise<void> {
    await this.dotEnv.parse(".env");
    await this.dotEnv.parse(".env.test");
    await this.dotEnv.parse(".env.prod");
    await this.dotEnv.parse(".env.local");
    await this.dotEnv.parse(".env.test.local");
    await this.dotEnv.parse(".env.prod.local");

    Deno.env.set(`OONEEX_APP_ENV`, JSON.stringify(this.dotEnv.getData()));
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
