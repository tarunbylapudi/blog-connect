module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js"], // Update with your source code directory
  moduleDirectories: ["node_modules", "src"], // Update with your source code directory
  transform: {},
  transformIgnorePatterns: ["/node_modules/(?!(module-to-transform)/)"],
  esm: "node",
  verbose: true,
};
