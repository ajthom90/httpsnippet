/**
 * @description
 * HTTP code snippet generator for Kotlin using Fuel.
 *
 * @author
 * @ajthom90
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  '
  }, options)

  var code = new CodeBuilder(opts.indent)

  var methodsToFuelExtension = { 'GET': 'httpGet()', 'POST': 'httpPost()', 'PUT': 'httpPut()', 'DELETE': 'httpDelete()', 'PATCH': 'httpPatch', 'HEAD': 'httpHead()' }

  code.push('val (request, response, result) = "%s".%s', source.fullUrl, methodsToFuelExtension[source.method.toUpperCase()])

  if (source.postData.text) {
    code.push(1, '.body(%s)', JSON.stringify(source.postData.text))
  }

  // Add headers, including the cookies
  var headers = Object.keys(source.allHeaders)

  // construct headers
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(1, '.header("%s" to "%s")', key, source.allHeaders[key])
    })
  }

  code.push(1, '.response()')

  return code.join()
}

module.exports.info = {
  key: 'fuel',
  title: 'Fuel',
  link: 'https://github.com/kittinunf/Fuel',
  description: 'An HTTP Request Client Library for Kotlin'
}
