## Shared Configuration

Force uses [shared configuration](https://github.com/artsy/README/blob/main/playbooks/development-environments.md#shared-configuration) to distribute common and sensitive configuration values. The [setup script](../scripts/setup.sh) will download `.env.shared` and also initialize a `.env` (from `.env.example`) for developer custom configuration and any overrides.

## Adding an ENV var

### Server side only

1. Add the variable to `.env.shared` file and [update the S3 version](https://github.com/artsy/README/blob/main/playbooks/development-environments.md#shared-configuration).
1. Edit `src/config.ts` to include default for your env variable. You can safely use `null` to indicate an empty variable.

### Server + Client

1. Add the variable to your `.env.shared` file and [update the S3 version](https://github.com/artsy/README/blob/main/playbooks/development-environments.md#shared-configuration).
1. Edit `src/config.ts` to include default for your env variable. You can safely use `null` to indicate an empty variable.
1. Edit `src/lib/setup_sharify.js` to export your env variable to the client runtime
1. Edit `src/typings/sharify.d.ts` to type your env variable
1. Add the env var to the allow-list in `src/v2/System/Server/sharifyHelpers.ts`
1. You can access it via `sd.[YOUR_VAR]` in client code
1. Restart your local server
