;jQuery.getter = function ( params ) {
	params.params = params.params || '';
	params.empty = params.empty || '';
	params.warning = params.warning || 'Error. Failed to complete the operation.';
	if ( params['type'] == 'views' ) {
			$.get('/static/views/' + params.url)
			.success(function(request){
				if ($.isFunction(params.success)) {params.success(request);}
			})
			.error(function(){
				if ( $.isFunction(callNotication) ) {callNotication(params.warning)}
			});
		} else if ( params['type'] == 'api' ) {
			$.get('/api/core/' + params.url + "/?format=json" + params.params)
			.success(function(request){
				if ( request['meta']['total_count'] > 0 ) {
					if ($.isFunction(params.success)) {params.success(request);}
				} else {
					if ( $.isFunction(params.empty) ) {params.empty(request)}
					else {
						if ( $.isFunction(callNotication) ) {callNotication(params.warning)}
					}
				}
			})
			.error(function(){
				if ( $.isFunction(callNotication) ) {callNotication(params.warning)}
			});
		} else {
			$.get('/api/core/' + params.url + params.params)
			.success(function(request){
				if ($.isFunction(params.success)) {params.success(request);}
			})
			.error(function(){
				if ( $.isFunction(callNotication) ) {callNotication(params.warning)}
			});
		}
}