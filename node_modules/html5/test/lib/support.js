var fs = require('fs');
var path = require('path');

var testDir = path.resolve(__dirname, '..', 'data');

function TestData(content) {
	this.lines = content.split('\n');
	this.index = 0;
}

TestData.prototype.next = function() {
	var data = {};
	var hasData = false;
	var key;
	for (;this.index < this.lines.length; this.index++) {
		var line = this.lines[this.index];
		var heading = this.parseSectionHeading(line);
		if (heading) {
			if (hasData) {
				if (heading === 'data')
					break;
				data[key] = data[key].join('\n');
			}
			key = heading;
			data[key] = [];
			hasData = true;
		} else if (key) {
			data[key].push(line);
		}
	}
	if (hasData) {
		// Remove trailing newline
		data[key].pop();
		data[key] = data[key].join('\n');
		return data;
	}
};

TestData.prototype.parseSectionHeading = function(line) {
	if (line.indexOf('#') === 0)
		return line.slice(1);
	return null;
};


function getDataFiles(subdir, ext) {
	ext = ext || '.dat';
	subdir = path.join(testDir, subdir);
	return fs.readdirSync(subdir).map(function(file){
		return path.join(subdir, file);
	}).filter(function (file) {
		return fs.statSync(file).isFile() && path.extname(file) === ext;
	});
}

function convertExpected(string) {
	var lines = string.split('\n');
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (line.slice(0, 1) === '|')
			lines[i] = line.slice(2);
	}
	return lines.join('\n');
}


exports.TestData = TestData;
exports.getDataFiles = getDataFiles;
exports.convertExpected = convertExpected;