define([], function() {
	var CONST;

	return CONST = {
		STATES : 'state_gallery state_page state_about state_load',
		
		EVENTS : {
			LOAD_START : 'load:start',
			LOAD_END : 'load:end',
			ERROR : 'error',
			MESSAGE : 'message',
			GALLERY_OPEN : 'gallery:open',
			GALLERY_CLOSE : 'gallery:close',
			PAGE_OPEN : 'page:open',
			PAGE_CLOSE : 'page:close',
			ABOUT_OPEN : 'about:open',
			ABOUT_CLOSE : 'about:close',
			LOADED_GALLERY_ITEMS : 'gallery-items:loaded'
		}
	} 		
});