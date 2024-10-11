export default {
  // Define the transformations to apply to files during testing
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  // Specify the environment in which tests should be run
  testEnvironment: 'node'
}
