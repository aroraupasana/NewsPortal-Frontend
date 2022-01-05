/*
 * Router and App Configuration
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource', 'ojs/ojpagingtabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojselectcombobox', 'ojs/ojcollectiontabledatasource', 'jquery', 'ojs/ojcollectionpagingdatasource', 'ojs/ojmessages'],
  function (oj, ko, moduleUtils) {
    function ControllerViewModel() {
      var self = this;

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'login': {
          label: 'Login',
        },
        'signup': {
          label: 'Signup',
        },
        'dashboard': {
          label: 'Dashboard'
        },
        'newsfeed': {
          label: 'Newsfeed',
          isDefault: true
        },
        'notificationModule': {
          label: 'NotificationModule'
        },
        'deleteModuleCategory':{
          label: 'DeleteModuleCategory'
        },
        'deleteModuleBroadcaster':{
          label: 'DeleteModuleCategory'
        },
        'newsdesc':{
          label: 'Newsdesc'
        }
      });


      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Module configuration
      self.moduleConfig = ko.observable({
        'view': [],
        'viewModel': null
      });

      self.loadModule = function () {
        ko.computed(function () {
          var name = self.router.moduleConfig.name();
          var viewPath = './js/views/' + name + '.html';
          var modelPath = './js/viewModels/' + name;
          var masterPromise = Promise.all([
            moduleUtils.createView({
              'viewPath': viewPath
            }),
            moduleUtils.createViewModel({
              'viewModelPath': modelPath
            })
          ]);
          masterPromise.then(
            function (values) {
              self.moduleConfig({
                'view': values[0],
                'viewModel': values[1]
              });
            },
            function (reason) { }
          );
        });
      };


      /**
       * Global accessible info
       */
      self.gotoDashboard = function (event, ui) {
        self.router.go('dashboard');
      }

      self.gotoNewsDesc = function (event, ui) {
        self.router.go('newsdesc');
      }

      self.gotohomePage = function (event, ui) {
        self.router.go('newsfeed');
      }
      // self.gotoDealDetails = function (event, ui) {
      //   self.router.go('deal-details');
      // }

      ko.bindingHandlers['dynamicHtml'] = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
          ko.utils.setHtml(element, valueAccessor());
          ko.applyBindingsToDescendants(bindingContext, element);
          console.log('dynamic html')
        }
      };

    }

    return new ControllerViewModel();
  }
);