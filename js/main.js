function _ojIsIE11() {
	var nAgt = navigator.userAgent;
	return nAgt.indexOf('MSIE') !== -1 || !!nAgt.match(/Trident.*rv:11./);
};
var _ojNeedsES5 = _ojIsIE11();

requirejs.config({
	 //baseUrl: 'js',
     //Path mappings for the logical module names
    paths: {
		
		'corejs': './lib/ojlibs-8.0.0/js/libs/corejs/shim.min',
		'regenerator-runtime': './lib/ojlibs-8.0.0/js/libs/regenerator-runtime/runtime',
        'knockout': './lib/ojlibs-8.0.0/js/libs/knockout/knockout-3.5.0',
		'jquery': './lib/ojlibs-8.0.0/js/libs/jquery/jquery-3.4.1.min',
        'jqueryui': './lib/ojlibs-8.0.0/js/libs/jquery-ui-1.12.1/jquery-ui.min',
		'hammerjs': './lib/ojlibs-8.0.0/js/libs/hammer/hammer-2.0.8.min',
		'jqueryui-amd': './lib/ojlibs-8.0.0/js/libs/jquery/jqueryui-amd-1.12.1.min',
        'ojs': './lib/ojlibs-8.0.0/js/libs/oj/v8.0.0/min' + (_ojNeedsES5 ? '_es5' : ''),
        'ojL10n': './lib/ojlibs-8.0.0/js/libs/oj/v8.0.0/ojL10n',
        'ojtranslations': './lib/ojlibs-8.0.0/js/libs/oj/v8.0.0/resources',
		'promise': './lib/ojlibs-8.0.0/js/libs/es6-promise/es6-promise.min',
		'basemaps': './lib/ojlibs-8.0.0/js/libs/oj/v8.0.0/resources/internal-deps/dvt/thematicMap/basemaps',
		'text': './lib/ojlibs-8.0.0/js/libs/require/text',
		'proj4': './lib/ojlibs-8.0.0/js/libs/proj4js/dist/proj4',
		'css': './lib/ojlibs-8.0.0/js/libs/require-css/css.min',
		'customElements': './lib/ojlibs-8.0.0/js/libs/webcomponents/custom-elements.min',
		'ojdnd': './lib/ojlibs-8.0.0/js/libs/dnd-polyfill/dnd-polyfill-1.0.1.min',
		'signals': './lib/ojlibs-8.0.0/js/libs/js-signals/signals.min',
	//	'viewModels': './metadataBrowser/js/viewModels',
		'd3':'./lib/metadataBrowser/libs/d3/d3.min',
    'touchr': './lib/ojlibs-8.0.0/js/libs/touchr/touchr',
  },
     //Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        },
		'jqueryui-amd': {

			deps: ['jquery']
		},
        'jqueryui': {
            deps: ['jquery']
        }
    },
	waitSeconds	: 0
});

if(_ojNeedsES5) {
	define('polyfills', ['corejs', 'regenerator-runtime']);
} else {
	define('polyfills', []);
};

define('promise', ['polyfills'], function () {
	Promise.polyfill = function () {};
	return Promise;
});

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', './js/appController', 'ojs/ojknockout',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar'],
  function (oj, ko, app) { // this callback gets executed when all required modules are loaded

    $(function () {

      function init() {
        oj.Router.sync().then(
          function () {
            app.loadModule();
            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(app, document.getElementById('globalBody'));
          },
          function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
          }
        );
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

      // console.log('this is main.js')

    });

  }
);