const viewGenerator = require('./plop/view/prompt')
const componentGenerator = require('./plop/component/prompt')

module.exports = function (plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
}
