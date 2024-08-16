module.exports = {
  // Get current commit message (`git log -1 --pretty=%B`) and send it to RelativeCI as part of the build informatin
  includeCommitMessage: true,
  // Save agent payload to disk for debugging
  // @example './relative-ci-payload.json',
  payloadFilepath: undefined,
  webpack: {
    // Path to Webpack stats JSON file
    stats: "./webpack-stats.json",
  },
}
