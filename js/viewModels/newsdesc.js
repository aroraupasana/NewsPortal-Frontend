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

        function DashboardViewModel() {

            var self = this;
            var originAddress = "http://localhost:8181";

            self.urlParams = new URL(window.location.href);
            self.newIdvalue= ko.observable(self.urlParams.searchParams.get("newsid"));
            self.heading = ko.observable();
            self.content =ko.observable();
            
            self.getNewsById = function () {
                $.ajax(originAddress + "/api/v1/getnewsbyid?id=" + self.newIdvalue(), {
                    type: "GET",
                    contentType: "application/json",
                }).done(function (deals) {
                    self.heading(deals.newsHeading);
                    self.content(deals.newsContent);
                }).fail(function (req, status, error) {
                });
            }
            self.getNewsById();
        };
        return new DashboardViewModel();
    }
);
