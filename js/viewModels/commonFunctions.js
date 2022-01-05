define(['ojs/ojcore', 'knockout', 'jquery', 'signals', 'ojs/ojmodule-element-utils', '../appController', 'ojs/ojmodule-element', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojnavigationlist',
	'ojs/ojconveyorbelt', 'ojs/ojinputtext', 'ojs/ojradioset', 'ojs/ojselectcombobox', 'ojs/ojarraydataprovider', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojslider', 'ojs/ojdialog'
],
	function (oj, ko, $, signals, moduleUtils, app) {
		function commonFunctions() {
			var self = this;
			self.originAddress = window.location.origin;
			self.context_val = ko.observable();
			self.user_type = ko.observable("1");

		}
		return new commonFunctions();
	}
);