const through     = require('through2')
    , msee        = require('msee')
	, mseeOptions = {
          paragraphStart: ''
        , paragraphEnd: '\n\n'
        , hrChar: '\u2500'
        , listItemPad: {
        	right: '   ',
        	first: '  » ',
        	regular: '    '
       	}
       	, codeStart: '\n\e[40m'
    	, codeEnd: '\e[0m\n\n'
        , defaultCodePad: '    '
        , paragraphPad: {
        	left: ' ',
        	right: '   '
        }
        , maxWidth: 118
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
