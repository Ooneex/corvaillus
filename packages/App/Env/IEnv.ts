import {AppEnvType} from "./types.ts";
import {AppLocaleType} from "../types.ts";

export interface IEnv {
    getAppEnv(): AppEnvType | null;
    isDev(): boolean;
    isProd(): boolean;
    isTest(): boolean;
    getLocale(): AppLocaleType | null;
    getCountry(): string | null;
    getVersion(): string | null;
    getSecret(): string | null;
    isDebug(): boolean;
    getPort(): number | null;
}
