// import _ from 'lodash'

// function getComponent() {
//   return import('lodash')
//     .then(({ default: _ }) => {
//       const element = document.createElement('div')

//       element.innerHTML = _.join(['Hello', 'webpack'], ' ')
//       return element
//     })
//     .catch((error) => 'An error occurred while loading the component')
// }
// 简化
async function getComponent() {
  const element = document.createElement('div')
  const { default: _ } = await import('lodash')
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  return element
}
getComponent().then((component) => {
  document.body.appendChild(component)
})
