## Adding an ENV var

### Server side only

1. Add the variable to your `.env` file.
1. Edit `src/desktop/config.coffee` and `src/mobile/config.coffee` to include default for your env variable. You can safely use `null` to indicate an empty variable.
1. Use it in the runtime via `/src/config.js`

### Server + Client

1. Add the variable to your `.env` file.
1. Edit `src/desktop/config.coffee` and `src/mobile/config.coffee` to include default for your env variable. You can safely use `null` to indicate an empty variable.
1. Edit `src/lib/setup_sharify.js` to export your env variable to the client runtime
1. You can access it via `sd.[YOUR_VAR]` in client code
1. Restart your local server
