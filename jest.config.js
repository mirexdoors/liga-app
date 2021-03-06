module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transformIgnorePatterns: [
    "node_modules/(?!(babel-jest|jest-vue-preprocessor)/)",
  ],
  transform: {
    "^.+\\.vue$": "<rootDir>/node_modules/vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|jpeg|mp3|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.js?$": "babel-jest"
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/*.vue",
    "<rootDir>/components/**/*.vue",
  ]
};