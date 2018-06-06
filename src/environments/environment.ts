// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiBaseUrl: 'http://localhost:4201'
  apiBaseUrl: 'http://192.168.1.101:4201',

  spotify: {
    clientId: '6e45c95d2b9f439c81131bbbce0da318',
    clientSecret: '8b303ff71c144b269b4d57ac1c06288a',
    redirectUri: 'http://192.168.1.101:4200/settings/spotify-callback',
    scopes: 'user-read-private user-read-email'
  }
};
