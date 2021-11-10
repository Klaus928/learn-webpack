import _ from 'lodash'
import Print from './print'
import { add } from './test'
function component() {
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.onclick = Print.bind(null, 'Hello webpack!')
  console.log(add(1, 2))
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
