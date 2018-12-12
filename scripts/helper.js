var fs = require("fs");
var path = require("path");

function rootBuildGradleExists() {
  var target = path.join("platforms", "android", "build.gradle");
  return fs.existsSync(target);
}

/*
 * Helper function to read the build.gradle that sits at the root of the project
 */
function readRootBuildGradle() {
  var target = path.join("platforms", "android", "build.gradle");
  return fs.readFileSync(target, "utf-8");
}


// -------- Build Gradle Updates -------- //

function addPluginDeps(buildGradle) {
  
    var classPath = "apply plugin: 'com.google.gms.google-services'"
  
    buildGradle = buildGradle.concat(classPath);
  
  return buildGradle;
}


/*
 * Helper function to write to the build.gradle that sits at the root of the project
 */
function writeRootBuildGradle(contents) {
  var target = path.join("platforms", "android", "build.gradle");
  fs.writeFileSync(target, contents);
}

module.exports = {

  modifyRootBuildGradle: function() {
    // be defensive and don't crash if the file doesn't exist
    if (!rootBuildGradleExists) {
      return;
    }

    var buildGradle = readRootBuildGradle();

    // Add Google's Services Repo
    buildGradle = addRepos(buildGradle);



    writeRootBuildGradle(buildGradle);
  },

  restoreRootBuildGradle: function() {
    // be defensive and don't crash if the file doesn't exist
    if (!rootBuildGradleExists) {
      return;
    }

    var buildGradle = readRootBuildGradle();
  
    writeRootBuildGradle(buildGradle);
  }
};