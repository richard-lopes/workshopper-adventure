const through     = require('through2')
    , msee        = require('msee')
	, mseeOptions = {
          paragraphStart: ''
        , paragraphEnd: '\n\n'
        , headingStart: '\n\u001b[0m\u001b[45m'
        , headingEnd: ' \u001b[0m\n\n'
        , headingIndentChar: ''
        , hrChar: '\u2500'
        ,listItemStart: '\n'
    	,listItemEnd: ''
        , listItemPad: {
        	right: '    ',
        	first: '  \u25b8 ',
        	regular: '    '
       	}
       	, codeStart: '\n'
    	, codeEnd: '\n\n'
        , codePad: '  \u001b[34m\u2502\u001b[0m '
        , paragraphPad: {
        	left: ' ',
        	right: '   '
        }
      }
module.exports = function () {
	var buffer = []
	return through(function (contents, encoding, done) {
		buffer.push(contents.toString())
		done()
	}, function (done) {
		var contents = buffer.join('\n')

		var str = msee.parse(contents, mseeOptions).replace(/^/gm, ' ').replace(/$/gm, '  ')
		str = str.substr(0, str.length-3)
		this.push(str)
		done()
	})
}
