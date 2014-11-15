;jQuery.getter = function ( params ) {
params.params = params.params || '';
params.empty = params.empty || '';
params.warning = params.warning || 'Alerta. No existen resultados.';
params.error = params.error || '';

$.get(PROYECTO.settings.base || '/' + params.url + "/?" + params.params)
	.success(function(res){
		if ( !res ) {
			if ( $.isFunction(params.empty) ) {params.empty(res)}
			else {alert(params.warning)}
	})
	.error(function(err){
		if (err['status'] && err['status'] == 405 ) {
			alert(eval('[' + err['responseText'] + ']')[0]['msg']);
		}
		if ( $.isFunction(params.error) ) {params.error(err)}
	});