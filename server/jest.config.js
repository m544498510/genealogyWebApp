// jest.config.js
module.exports = {
  "transform": {
    "^.+\\.(ts|tsx)$": "<rootDir>/testConfig/preprocessor.js"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(spec))\\.(js?|ts?)$",
  "moduleFileExtensions": ["ts", "tsx", "js","json"],
};
