define(['jquery', 'App', 'Events'], function($, App, Events) {
    var helper = {
        getData : function(url, onSuccess, context) {
            var context = context || this;

            if(typeof onSuccess !== 'function') return false;

            Events.trigger('load:start');

            $.ajax({
                dataType : 'json',
                url : url,
                context : context,
                success : onSuccess,
                error : function(xhr, ajaxOptions, thrownError) {
                    Events.trigger('error', thrownError)
                },
                complete : function() {
                    Events.trigger('load:end');
                }
            });

            return this;
        },

        getCachedData : function(url, onSuccess, context) {
            if(typeof onSuccess !== 'function') return false;

            if(+localStorage.getItem('cacheTime') < window.app.lastUpsateTime) {
                localStorage.clear();
            }

            if(localStorage.getItem(url) !== null) {
                onSuccess.call(context, JSON.parse(localStorage.getItem(url)));
                return this;
            }

            helper.getData(url, function(data) {
                if(localStorage.getItem('cacheTime') === null) {
                    localStorage.setItem('cacheTime', new Date().getTime());
                }
                localStorage.setItem(url, JSON.stringify(data));
                onSuccess.call(context, data);
            }, context);

            return this;
        },

        initModules : function($el) {
            //TODO: init modules
        }
    };

    return helper;
});