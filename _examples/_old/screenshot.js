var async = require('async'),
		sizes = [
				[320,568],
				[768,1024]
				[1366,768],
				// [1920, 1080]
		];

function capture(sizes, callback) {
		var page = require('webpage').create();
		page.viewportSize = {
				width: sizes[0],
				height: sizes[1]
		};
		page.zoomFactor = 1;
		page.open('https://alloy.work/marjolijn', function (status) {
				var filename = sizes[0] + 'x' + sizes[1] + '.png';
					page.render('~/Downloads/screenshots/' + filename);
					page.close();
					callback.apply();
		});
}

async.eachSeries(sizes, capture, function (e) {
		if (e) console.log(e);
		console.log('done!');
		phantom.exit();
});

//
var page = require('webpage').create(),
address, output, size;
var system = require('system');


address = 'http://alloy.work/marjolijn';
output = 'screenshot.png';
sizeX = 320;
sizeY = 568;
page.viewportSize = { width: sizeX, height: sizeY };
page.open(address, function (status) {
	if (status !== 'success') {
		console.log('Unable to load the address!');
	} else {
		window.setTimeout(function () {
			page.render(output);
			phantom.exit();
		}, 200);
	}
});
