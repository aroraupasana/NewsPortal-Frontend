

define(['ojs/ojcore', 'knockout', 'jquery', 'signals', 'ojs/ojmodule-element-utils', './login','./signup' ,'./dashboard','../appController', 'ojs/ojknockout'
],
    function (oj, ko, $, signals, moduleUtils, login,signup,dashboard, app) {
        var viewModel = function (params) {
            var self = this;
            self.login = login;
            self.signup = signup;
            self.dashboard =dashboard;
        }
        return viewModel;

    }
);