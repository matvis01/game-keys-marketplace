const { defineConfig } = require("cypress")
const synpressPlugins = require("@synthetixio/synpress/plugins")

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "tests/e2e/specs",
    supportFile: "tests/support/index.ts",
    videosFolder: "tests/e2e/videos",
    screenshotsFolder: "tests/e2e/screenshots",
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      synpressPlugins(on, config)
      return config
    },
  },
})
