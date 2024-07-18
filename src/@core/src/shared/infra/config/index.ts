import { config as readEnv } from 'dotenv';
import { join } from 'path';


// readEnv({ path: envTestingFile });

// export const config = {
//   db: {
//     vendor: process.env.DB_VENDOR as any,
//     host: process.env.DB_HOST,
//     logging: process.env.DB_LOGGING === "true",
//   },
// };

export type Config = {
  db: {
    vendor: any,
    host: string,
    logging: boolean
  }
}

function makeConfig(envFile): Config {
  const output = readEnv({ path: envFile });
  return {
    db: {
      vendor: output.parsed.DB_VENDOR as any,
      host: output.parsed.DB_HOST,
      logging: output.parsed.DB_LOGGING === 'true',
    },
  };
}

const envTestingFile = join(__dirname, "../../../../.env.test");
export const configTest = makeConfig(envTestingFile);