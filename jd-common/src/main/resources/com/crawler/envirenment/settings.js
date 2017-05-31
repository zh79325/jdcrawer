
/**
 *  This file provides local settings you'll need to modify to make sure
 *  envjs platform tests can function properly.  Dont modify this
 *  file directly, copy it to local_settings.js and then modify it so
 *  as not to commit your local settings back to the repo.
 */

var SETTINGS = {
    BASE_URI : 'file:///mnt/repos/thatcher/env-js/',
    AJAX_BASE: 'http://github.com/thatcher/env-js/raw/master/',
    LOCAL_PORT: '8080',
    APP_CONTEXT: '/env-js/'
};


Envjs.config('logging',[
	{category:'Envjs.Core',  				level:'DEBUG'},
	{category:'Envjs.Core.REPL',        	level:'DEBUG'},
	{category:'Envjs.DOM',  				level:'DEBUG'},
	{category:'Envjs.DOM.Node',  			level:'DEBUG'},
	{category:'Envjs.DOM.NodeList',  		level:'DEBUG'},
	{category:'Envjs.DOM.NamedNodeMap', 	level:'DEBUG'},
	{category:'Envjs.DOM.NamespacedNodeMap',level:'DEBUG'},
	{category:'Envjs.DOM.Element',  		level:'DEBUG'},
	{category:'Envjs.DOM.Document',  		level:'DEBUG'},
	{category:'Envjs.DOM.EventTarget',  	level:'DEBUG'},
	{category:'Envjs.Timer',            	level:'DEBUG'},
	{category:'Envjs.Location',  			level:'DEBUG'},
	{category:'Envjs.XMLHttpRequest',  		level:'INFO'},
	{category:'Envjs.Parser',  	        	level:'DEBUG'},
	{category:'Envjs.Parser.HTMLParser',	level:'DEBUG'},
	{category:'Envjs.Parser.XMLParser', 	level:'DEBUG'},
	{category:'Envjs.HTML.Frame',			level:'DEBUG'},
	{category:'Envjs.Window',  				level:'DEBUG'},
	{category:'Envjs.Platform',  			level:'DEBUG'},
	{category:'Envjs.Platform.Johnson',   	level:'DEBUG'},
	{category:'root', 		 				level:'DEBUG'}
]);
