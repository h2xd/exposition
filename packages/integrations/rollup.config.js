import { definePackageBuild } from '../../scripts/build'

const packages = ['msw', 'vue-devtools']

export default packages.reduce((prevConfig, packageName) => {
  return [
    ...prevConfig,
    ...definePackageBuild(packageName),
  ]
}, definePackageBuild())
