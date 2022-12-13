import { Manifest, start, StartOptions } from "./deps.ts";

import { env } from "./Env/Env.ts";

export class Kernel {
  public static async boot(manifest: Manifest, opts: StartOptions = {}) {
    env.generateEnvFile();
    await env.parse();

    await start(manifest, {...opts, port: env.getPort() || undefined});
  }
}
