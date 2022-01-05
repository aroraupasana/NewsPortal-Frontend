define(['ojs/ojcore', 'knockout', 'jquery', 'signals', 'ojs/ojmodule-element-utils',
	'./commonFunctions', '../appController','./dashboard', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojselectcombobox', 'ojs/ojbutton',
	'ojs/ojgauge', 'promise', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojmodel', 'ojs/ojarraydataprovider',
	'ojs/ojchart', 'ojs/ojinputtext', 'ojs/ojprogress', 'ojs/ojpagingtabledatasource', 'ojs/ojpagingcontrol',
	'ojs/ojcollectiontabledatasource', 'ojs/ojpopup', 'ojs/ojmessages', 'ojs/ojknockouttemplateutils', 'ojs/ojinputtext',
	'ojs/ojvalidation-number', 'ojs/ojknockout-validation'
],
	function (oj, ko, $, signals, moduleUtils, commonFunction, app,dashboard) {

		return new function DashboardViewModel() {

			var self = this;
			var originAddress = "http://localhost:8181";
			self.email_val = ko.observable("");
			self.password_val = ko.observable("");
			self.user_name = ko.observable("");

			self.submittedValue = ko.observable("");
			self.tracker = ko.observable();

			self.signup = function (event, ui) {
				event.email_val();
				event.password_val();

				var queryOption = {
					userEmailId: self.email_val(),
					userPassword: self.password_val(),
					userName: self.user_name()
				}
				$.ajax(originAddress + "/api/v1/saveuser", {
					type: "POST",
					data: JSON.stringify(queryOption),
					contentType: "application/json"
				}).done(function (deals) {
					commonFunction.user_type(deals.userType);
					dashboard.openAddNewsModule();
					app.gotoDashboard();
				}).fail(function (req, status, error) {
					self.DisplayErrorNotification(status, req.responseJSON.message);
				});
			}

			function resolveVVMForNotification(name, moduleConfig) {
				var masterPromise = Promise.all([
					moduleUtils.createView({
						'viewPath': './js/views/' + name + '.html'
					}),
					moduleUtils.createViewModel({
						'viewModelPath': './js/viewModels/' + name
					})
				]);
				masterPromise.then(
					function (values) {
						var viewModel = new values[1]({
							'userInfoSignal': self.userInfoSignal
						});
						moduleConfig({
							'view': values[0],
							'viewModel': viewModel
						});
					},
					function (reason) { }
				);
			};

			self.DisplayErrorNotification = function (type, message) {
				self.messages([]);
				resolveVVMForNotification("notificationModule", self.notification_module);
				self.messages.push({
					severity: type,
					summary: message,
					detail: '',
					autoTimeout: 0
				});
				self.messagesDataprovider(new oj.ArrayDataProvider(self.messages()));
			}

			self.notification_module = ko.observable({
				'view': [],
				'viewModel': null
			});

			self.messagesDataprovider = ko.observable();
			self.messages = ko.observableArray([]);

		};

	}
);
