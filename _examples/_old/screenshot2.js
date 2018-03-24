var alloyOpenPage = 'https://alloy.work/heldergroen';

var async = require('async'),
sizes = [
	[2560, 1440],
	[1920, 1080],
	[1366, 768],
	[320, 568],
	[768, 1024],
];

function capture(sizes, callback) {
	var page = require('webpage').create();
	page.viewportSize = {
		width: sizes[0],
		height: sizes[1]
	};
	page.clipRect = {
		top: 0,
		left: 0,
		width: sizes[0],
		height: sizes[1]
	};
	page.zoomFactor = 1;
	page.open(alloyOpenPage, function (status) {
		var filename = sizes[0] + 'x' + sizes[1] + '.jpg';
		window.setTimeout(function () {
			page.render('./Downloads/screenshots/' + filename);
			page.close();
			callback.apply();
		}, 4000);
	});
}

async.eachSeries(sizes, capture, function (e) {
	if (e) console.log(e);
	console.log('done!');
	phantom.exit();
});
