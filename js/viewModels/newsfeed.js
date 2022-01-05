define(['ojs/ojcore', 'knockout', 'jquery', 'signals', 'ojs/ojmodule-element-utils',
    './commonFunctions', '../appController', 'ojs/ojpagingdataproviderview', 'ojs/ojcollectiondataprovider', 'ojs/ojmodel',
    'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojselectcombobox', 'ojs/ojbutton',
    'ojs/ojgauge', 'promise', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojarraydataprovider',
    'ojs/ojchart', 'ojs/ojinputtext', 'ojs/ojprogress', 'ojs/ojpagingtabledatasource', 'ojs/ojpagingcontrol',
    'ojs/ojcollectiontabledatasource', 'ojs/ojpopup', 'ojs/ojmessages', 'ojs/ojknockouttemplateutils', 'ojs/ojinputtext',
    'ojs/ojvalidation-number', 'ojs/ojknockout-validation', 'ojs/ojmenu', 'ojs/ojoption', 'ojs/ojtoolbar',
    'ojs/ojlistview'
],
    function (oj, ko, $, signals, moduleUtils, commonFunction, app, PagingDataProviderView, CollectionDataProvider, Model) {

        return new function DashboardViewModel() {

            var self = this;
            var originAddress = "http://localhost:8181";

            self.selectedMenuItem = ko.observable("");
            self.newsDescUrl = ko.observable();
            self.newsIdValue = ko.observable();
            self.hotnewsIdValue = ko.observable();
            self.pagingDataProviderForCategory = ko.observable("");
            self.menuItemsFirstFive = ko.observableArray([]);
            self.menuItems = ko.observableArray([]);
            self.menuItemsLength = ko.observable();
            self.pagingDataProvider = ko.observable("");

            self.menuItemAction = function (data, event) {
                self.selectedMenuItem(data.target.id);
                self.getNewsByCategories(self.selectedMenuItem());
            }

            self.menuItemAction1 = function (data, event) {
                self.selectedMenuItem(event.id);
                self.getNewsByCategories(self.selectedMenuItem());
            }

            self.homePage = function (data, event) {
                self.selectedMenuItem("");
               app.gotohomePage();
            }

            self.newpageNav = function (data, event) {
                self.newsIdValue(event.data.newsId);
                self.newsDescUrl("?root=newsdesc&newsid=" + self.newsIdValue());
                var a = document.getElementById('newsdescid'+self.newsIdValue());
                 a.href = self.newsDescUrl();
            }

            self.newpageNavforHotNews = function (data, event) {
                self.hotnewsIdValue(event.data.newsId);
                self.newsDescUrl("?root=newsdesc&newsid=" + self.hotnewsIdValue());
                var a = document.getElementById('newsdescids'+self.hotnewsIdValue());
                 a.href = self.newsDescUrl();
            }

            self.getNewsByCategories = function (data) {
                $.ajax(originAddress + "/api/v1/getnewsbycategory?categoryId=" + data, {
                    type: "GET",
                    contentType: "application/json",
                }).done(function (deals) {
                    self.pagingDataProviderForCategory("");
                    self.pagingDataProviderForCategory(new oj.PagingDataProviderView(new oj.ArrayDataProvider(deals, { idAttribute: 'newsId' })));
                }).fail(function (req, status, error) {
                });
            }
          
            self.getCategoriesTable = function (callback) {
                $.ajax(originAddress + "/api/v1/getallcategory", {
                    type: "GET",
                    contentType: "application/json",
                }).done(function (deals) {
                    self.menuItemsLength(deals.length);
                    self.menuItems([]);
                    self.menuItemsFirstFive([]);

                    if (deals.length < 6) {
                        for (var i = 0; i < deals.length; i++) {
                            self.menuItemsFirstFive.push({ id: deals[i].categoryId, label: deals[i].categoryName });
                        }
                    }
                    else {
                        for (var i = 0; i < 5; i++) {
                            self.menuItemsFirstFive.push({ id: deals[i].categoryId, label: deals[i].categoryName });
                        }
                        for (var i = 5; i < deals.length; i++) {
                            self.menuItems.push({ id: deals[i].categoryId, label: deals[i].categoryName });
                        }
                    }


                }).fail(function (req, status, error) {

                });
            }

            self.getCategoriesTable();

            self.getAllNews = function (callback) {
                $.ajax(originAddress + "/api/v1/getallnews", {
                    type: "GET",
                    contentType: "application/json",
                }).done(function (deals) {
                    self.pagingDataProvider(new oj.PagingDataProviderView(new oj.ArrayDataProvider(deals, { idAttribute: 'newsId' })));
                }).fail(function (req, status, error) {
                });
            }

            self.getAllNews();

            self.pagingDataProviderTrendingNews = ko.observable("");
            self.getAllTrendingNews = function (callback) {
                $.ajax(originAddress + "/api/v1/gettrendingnews", {
                    type: "GET",
                    contentType: "application/json",
                }).done(function (deals) {
                    self.pagingDataProviderTrendingNews(new oj.PagingDataProviderView(new oj.ArrayDataProvider(deals, { idAttribute: 'newsId' })));
                }).fail(function (req, status, error) {

                });
            }

            self.getAllTrendingNews();
        };
        return new DashboardViewModel();
    }
);
