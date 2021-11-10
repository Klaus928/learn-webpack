import _ from 'lodash'
import './style.css'
import head from './head.jpg'
import Data from './data.xml'
import Notes from './data.csv'
import JsonData from './data.json'
import toml from './data.toml'
import yaml from './data.yaml'
import json from './data.json5'

console.log('toml.title', toml.title) // output `TOML Example`
console.log('toml.owner.name', toml.owner.name) // output `Tom Preston-Werner`

console.log('yaml.title', yaml.title) // output `YAML Example`
console.log('yaml.owner.name', yaml.owner.name) // output `Tom Preston-Werner`

console.log('json.title', json.title) // output `JSON5 Example`
console.log('json.owner.name', json.owner.name) // output `Tom Preston-Werner`
function component() {
  const element = document.createElement('div')

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('hello')
  const img = new Image()
  img.src = head
  img.width = 200
  element.appendChild(img)

  console.log('xml', Data)
  console.log('csv', Notes)
  console.log('json', JsonData)
  return element
}

document.body.appendChild(component())
