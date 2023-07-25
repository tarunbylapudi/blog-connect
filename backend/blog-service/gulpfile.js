const gulp = require("gulp");
const sonarqubeScanner = require("sonarqube-scanner");
gulp.task("sonar", function (callback) {
  sonarqubeScanner(
    {
      serverUrl: "http://localhost:9000",
      options: {},
    },
    callback
  );
});
