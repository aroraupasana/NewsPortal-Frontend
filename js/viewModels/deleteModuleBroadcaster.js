define(['ojs/ojcore', 'knockout', 'jquery', 'signals', 'ojs/ojmodule-element-utils', './dashboard',
],
	function (oj, ko, $, signals, moduleUtils, dashboard) {
		var viewModel = function (params) {
			var self = this;
			self.dashboard = dashboard;

		}
		return viewModel;

	}
);