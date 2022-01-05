define(['ojs/ojcore', 'knockout', 'jquery', 'signals', 'ojs/ojmodule-element-utils', '../appController', './commonFunctions',
	'ojs/ojmodule-element', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojnavigationlist', 'ojs/ojselectcombobox', 'ojs/ojconveyorbelt', 'ojs/ojaccordion', 'ojs/ojmenu', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojinputtext', 'ojs/ojradioset', 'ojs/ojarraydataprovider', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojslider', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'promise',
],
	function (oj, ko, $, signals, moduleUtils, app, commonFunction) {
		function SubAdminViewModel() {
			var self = this;
			var originAddress = "http://localhost:8181";
			self.commonFunction = commonFunction;

			self.categories_list = ko.observableArray([]);
			self.broadcaster_list = ko.observableArray([]);
			self.categoryDeleteRow = ko.observable();
			self.section_to_display = ko.observable("0");
			self.messagesDataprovider = ko.observable();
			self.messages = ko.observableArray([]);
			self.tempdata_newprospects = ko.observableArray([]);
			self.tempCols_newprospects = ko.observableArray([]);
			self.category_column = ko.observable();
			self.category_data = ko.observable();
			self.tempdata_newprospects_1 = ko.observableArray([]);
			self.tempCols_newprospects_1 = ko.observableArray([]);
			self.broadcaster_column = ko.observable();
			self.broadcaster_data = ko.observable();

			function resolveReportModules(name, moduleConfig) {
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
							'userInfoSignal1': self.userInfoSignal1
						});
						moduleConfig({
							'view': values[0],
							'viewModel': viewModel
						});
					},
					function (reason) { }
				);
			};

			self.add_news_module = ko.observable({
				'view': [],
				'viewModel': null
			});
		
			self.openAddNewsModule = function (data) {

				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				var value_for_section;
				if (data == undefined && commonFunction.user_type() == 0) {
					value_for_section = 0;
				} else if (data == undefined && commonFunction.user_type() == 1) {
					value_for_section = 2;
				} else {
					value_for_section = data.currentTarget.id;
				}
				resolveReportModules("addnews", self.add_news_module);
				self.section_to_display(value_for_section);

			};


			//Handle Message Module
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


			//End Notification Module
			//Start delete Module			
			self.getCategoriesTable = function (callback) {
				$.ajax(originAddress + "/api/v1/getallcategory", {
					type: "GET",
					contentType: "application/json",
				}).done(function (deals) {
					self.tempdata_newprospects([]);
					self.tempCols_newprospects([]);

					for (var i = 0; i < deals.length; i++) {
						self.tempdata_newprospects.push(deals[i]);
					}
					for (var property in deals[0]) {
						if (deals[0].hasOwnProperty(property)) {
							if (property != "categoryId" && property!="categoryType")
								self.tempCols_newprospects.push({ headerText: property, field: property, renderer: oj.KnockoutTemplateUtils.getRenderer(property, true) });

						}
					}
					self.tempCols_newprospects.push({ headerText: "", field: "", renderer: oj.KnockoutTemplateUtils.getRenderer("icons", true) });

					self.category_column(self.tempCols_newprospects());
					self.category_data(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.tempdata_newprospects(), { idAttribute: 'categoryId' })));

				}).fail(function (req, status, error) {
					alert('new prospect - getJSON failed: ' + status);
				});
			}


			self.deletecategory = function (data,event,ui) {
				document.getElementById('deleteModuleCategory').close();

				$.ajax(originAddress + "/api/v1/deletecategory?id="+self.categoryDeleteRow(), {
					type: "DELETE",
				//	data: JSON.stringify(queryOption),
					contentType: "application/json",
				}).done(function (deals) {
					self.DisplayErrorNotification("confirmation", "Successfully Deleted");
					self.getCategoriesTable();
				}).fail(function (req, status, error) {
				});

			};


			self.getbroadcasterTable = function (callback) {
				$.ajax(originAddress + "/api/v1/getallbroadcaster", {
					type: "GET",
					contentType: "application/json",
				}).done(function (deals) {
					self.tempdata_newprospects_1([]);
					self.tempCols_newprospects_1([]);

					for (var i = 0; i < deals.length; i++) {
						self.tempdata_newprospects_1.push(deals[i]);
					}
					for (var property in deals[0]) {
						if (deals[0].hasOwnProperty(property)) {
							if (property != "broadcasterId" && property!= "broadcasterType")
								self.tempCols_newprospects_1.push({ headerText: property, field: property, renderer: oj.KnockoutTemplateUtils.getRenderer(property, true) });

						}
					}
					self.tempCols_newprospects_1.push({ headerText: "", field: "", renderer: oj.KnockoutTemplateUtils.getRenderer("icons", true) });

					self.broadcaster_column(self.tempCols_newprospects_1());
					self.broadcaster_data(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.tempdata_newprospects_1(), { idAttribute: 'broadcasterId' })));

				}).fail(function (req, status, error) {
					alert('new prospect - getJSON failed: ' + status);
				});
			}

			self.deleteBroadcaster  = function (data,event,ui) {
				document.getElementById('deleteModuleBroadcaster').close();

				$.ajax(originAddress + "/api/v1/deletebroadcaster?id="+self.broadcasterDeleteRow(), {
					type: "DELETE",
					contentType: "application/json",
				}).done(function (deals) {
					self.DisplayErrorNotification("confirmation", "Successfully Deleted");
					self.getbroadcasterTable();
				}).fail(function (req, status, error) {
				//	dashboard.DisplayErrorNotification(status, req.responseJSON.message);
				});

			};


			self.cancelDeletion = function () {
				document.getElementById('deleteModuleCategory').close();
			};

			self.cancelDeletionBroadcaster  = function () {
				document.getElementById('deleteModuleBroadcaster').close();
			};

			
			self.openDeleteModuleCategory = function (event) {
				self.categoryDeleteRow(event.currentTarget.id);
				document.getElementById('deleteModuleCategory').open();
			};

			self.broadcasterDeleteRow =ko.observable();
			self.openDeleteModulebroadcaster = function (event) {
				self.broadcasterDeleteRow(event.currentTarget.id);
				document.getElementById('deleteModuleBroadcaster').open();
			};

			self.deleteModuleCategory = ko.observable({
				'view': [],
				'viewModel': null
			});
			resolveVVMDealModules("deleteModuleCategory", self.deleteModuleCategory);
			self.deleteModuleBroadcaster = ko.observable({
				'view': [],
				'viewModel': null
			});
			resolveVVMDealModules("deleteModuleBroadcaster", self.deleteModuleBroadcaster);
			

			function resolveVVMDealModules(name, moduleConfig) {
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
			//End Delete Module
		}

		$(function () {
		})

		return new SubAdminViewModel();


	}
);