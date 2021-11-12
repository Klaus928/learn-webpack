// import _ from 'lodash'
import { print } from './print'
// 测试tree-shaking
import { add } from './test'
function component() {
  const element = document.createElement('div')
  element.innerHTML = 'hello webpack' + add(1, 2)
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.onclick = () => {
    print('Hello webpack!')
  }
  console.log('VERSION', VERSION)
  console.log('NODE_ENV', process.env.NODE_ENV)
  return element
}

document.body.appendChild(component())
// 动态导入
// function getComponent() {
//   return import('lodash')
//     .then(({ default: _ }) => {
//       const element = document.createElement('div')

//       element.innerHTML = _.join(['Hello', 'webpack'], ' ')
//       return element
//     })
//     .catch((error) => 'An error occurred while loading the component')
// }
// 动态导入简化
// async function getComponent() {
//   const element = document.createElement('div')
//   const { default: _ } = await import('lodash')
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ')
//   return element
// }
// getComponent().then((component) => {
//   document.body.appendChild(component)
// })
