define(['ojs/ojcore', 'knockout', 'jquery', 'signals', 'ojs/ojmodule-element-utils', '../appController', './dashboard',
	'ojs/ojmodule-element', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojnavigationlist', 'ojs/ojselectcombobox', 'ojs/ojconveyorbelt', 'ojs/ojaccordion', 'ojs/ojmenu', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojinputtext', 'ojs/ojradioset', 'ojs/ojarraydataprovider', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojslider', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'promise',
],
	function (oj, ko, $, signals, moduleUtils, app, dashboard) {
		var viewModel = function (params) {
			var self = this;
			var originAddress = "http://localhost:8181";

			self.section = dashboard;
			self.section_to_display = ko.observable();
			self.section_to_display(self.section.section_to_display());
			self.categories_list = ko.observableArray([]);
			self.categories_list_array = ko.observableArray([]);
			self.broadcaster_list = ko.observableArray([]);
			self.broadcaster_list_array = ko.observableArray([]);
			self.broadcaster_val_news = ko.observable();
			self.category_val_news = ko.observable();
			self.news_heading_val = ko.observable();
			self.news_content_val = ko.observable();
			self.category_id_news = ko.observable();
			self.broadcaster_id_news = ko.observable();
			self.category_name = ko.observable();
			self.add_news_module = ko.observable({
				'view': [],
				'viewModel': null
			});
			self.broadcaster_name = ko.observable();

			self.getCatogories_list = function (callback) {
				self.categories_list([]);
				$.ajax(originAddress + "/api/v1/getallcategory", {
					type: "GET",
					contentType: "application/json",
					async: false
				}).done(function (deals) {
					self.categories_list_array([]);
					self.categories_list([]);
					if (deals.length > 0) {
						self.categories_list_array(deals);
						self.category_val_news(deals[0].categoryName);
					}
					for (var i = 0; i < deals.length; i++) {
						self.categories_list.push({ value: deals[i].categoryName, label: deals[i].categoryName });
					}

				}).fail(function (req, status, error) {
					alert('category fetch: ' + status);
				});
			}

			self.getBroadcaster_list = function (callback) {
				self.categories_list([]);
				$.ajax(originAddress + "/api/v1/getallbroadcaster", {
					type: "GET",
					contentType: "application/json",
					async: false
				}).done(function (deals) {
					self.broadcaster_list([]);
					self.broadcaster_list_array([]);
					self.broadcaster_list_array(deals);
					if (deals.length > 0)
						self.broadcaster_val_news(deals[0].broadcasterName);
					for (var i = 0; i < deals.length; i++) {
						self.broadcaster_list.push({ value: deals[i].broadcasterName, label: deals[i].broadcasterName });
					}

				}).fail(function (req, status, error) {
					alert('Broadcaster fetch: ' + status);
				});
			}

			self.addCategory = function (callback) {
				var queryOption = {
					categoryName: self.category_name()
				};
				$.ajax(originAddress + "/api/v1/savecategory", {
					type: "POST",
					data: JSON.stringify(queryOption),
					contentType: "application/json",
				}).done(function (deals) {
					self.section.getCategoriesTable();
				}).fail(function (req, status, error) {
					dashboard.DisplayErrorNotification(status, req.responseJSON.message);
				});
			}

			self.addBroadcaster = function (callback) {
				var queryOption = {
					broadcasterName: self.broadcaster_name()
				};
				$.ajax(originAddress + "/api/v1/savebroadcaster", {
					type: "POST",
					data: JSON.stringify(queryOption),
					contentType: "application/json",
				}).done(function (deals) {
					self.section.getbroadcasterTable();
				}).fail(function (req, status, error) {
					dashboard.DisplayErrorNotification(status, req.responseJSON.message);
				});
			}

			self.saveNewsFeed = function (callback) {

				for (var i = 0; i < self.categories_list_array().length; i++) {
					if (self.categories_list_array()[i].categoryName == self.category_val_news())
						self.category_id_news(self.categories_list_array()[i].categoryId);
				}
				for (var i = 0; i < self.broadcaster_list_array().length; i++) {
					if (self.broadcaster_list_array()[i].broadcasterName == self.broadcaster_val_news())
						self.broadcaster_id_news(self.broadcaster_list_array()[i].broadcasterId);
				}


				var queryOption = {
					broadcasterId: self.broadcaster_id_news(),
					categoryId: self.category_id_news(),
					newsHeading: self.news_heading_val(),
					newsContent: self.news_content_val()

				};
				$.ajax(originAddress + "/api/v1/savenews", {
					type: "POST",
					data: JSON.stringify(queryOption),
					contentType: "application/json",
				}).done(function (deals) {
					dashboard.DisplayErrorNotification("confirmation", "Saved Successfully");
				}).fail(function (req, status, error) {
					dashboard.DisplayErrorNotification(status, req.responseJSON.message);
				});
			}

			self.section.getCategoriesTable();
			self.deletebroadcaster = function (data) { }

			self.section.getbroadcasterTable();
			self.getBroadcaster_list();
			self.getCatogories_list();

		}
		return viewModel;

	}
);