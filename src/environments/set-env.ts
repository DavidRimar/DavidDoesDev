const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const targetPath = './src/environments/environment.ts';

  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env'
  });

  const envConfigFile = `export const environment = {
  production: true,
  spaceId: '${process.env["SPACE_ID"]}',
  accessToken: '${process.env["CONTENTFUL_ACCESS_TOKEN"]}',
  aboutMeId: '${process.env["ABOUT_ME_ID"]}'
};
`;

  console.log('The file `environment.ts` is being generated! \n');

  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(`The environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv();
