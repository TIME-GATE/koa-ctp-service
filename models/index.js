/**
 * 加载mongodb、mysql
 */

const path = require('path');

[
  'Account',
]
.map((modelName) => {
  exports[modelName] = require(path.join(__dirname, modelName))
})

