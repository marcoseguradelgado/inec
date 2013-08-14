var cont = 1;
var contIn = 0;
var contGs = 0;
var contIg = 0;
var contVa = 0;
var resultadosFinales = new Array();
var NombresFinales = new Array();

function addForm(){
	cont = cont+1;
	form = '<div id="form-'+cont+'" class="divProyecto"><div class="fields">'+
	'<input type="text" name="nameProject"	placeholder="Nombre del proyecto"></div>'+
    '<div class="fields">'+
	'<input type="text" name="tasaNormal" class="validate-input" onblur="validateTasa(this);"'+
		'placeholder="Tasa de Interes %"> <span>Tasa de Interes capitalizable:</span>'+
		 '<select name="tyInteres" onchange="changeInteres(this);">'+
		'<option value="1">Anual</option><option value="2">Semestral</option><option value="3">Cuatrimestral</option>'+
		'<option value="4">Trimestral</option><option value="6">Bimestral</option><option value="12">Mensual</option>'+
	'</select> <span>Calculo anual de la tasa de interes:</span><span name="calcInteres">%</span></div>'+
    '<div class="fields"><input type="text" name="vida" placeholder="Cantidad de periodos del proyecto" class="validate-input" onblur="cantVida(this);">'+
    '</div><div class="fields"><span>Tipo de Inversion</span> <select name="tyInversion" onchange="changeInversion(this);">'+
	'<option value="Ifija">Inicial Fijo</option><option value="Iperiodo">Por periodo fijo</option>'+
    '<option value="IperiodoInd">Por periodo variante</option></select> <input type="text" class="validate-input" name="inversion"'+
	'placeholder="Valor de inversion 0" onblur="validateInversion(this);">'+
   '</div><div class="fields"><span>Tipo de Gastos</span> <select name="tyGastos" onchange="changeGasto(this);">'+
	'<option value="Gfija">Inicial Fijo</option><option value="Gperiodo">Por periodo fijo</option>'+
   '<option value="GperiodoInd">Por periodo variante</option></select>'+
	'<input type="text" class="validate-input" name="gasto" onblur="validateGasto(this);" placeholder="Valor de gasto 0"></div><div class="fields">'+
   '<span>Tipo de Ingresos</span> <select name="tyIngresos" onchange="changeIngreso(this);">'+
		'<option value="Hfija">Inicial Fijo</option><option value="Hperiodo">Por periodo fijo</option>'+
		'<option value="HperiodoInd">Por periodo variante</option>'+
	'</select> <input type="text" class="validate-input" name="ingreso" onblur="validateIngreso(this);"	placeholder="Valor de ingreso 0"></div>'+
    '<div class="fields"><input type="text" class="validate-input" name="rescate" onblur="validateRescate(this);" placeholder="Valor de Rescate">'+
  '</div></div>';
	
	$('.mainBody').find('div.divProyecto:last-child').after(form);
}

function IsNumericr(input)
{
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}

function changeInversion(e){
	divParent = $(e).parent();
	inputName = $(e).val();	
	
	if(inputName == 'IperiodoInd'){
		$(e).after('<button onclick="addInversion(this);" class="add">Agregar Inversion</button><button onclick="removeInversion(this);" class="add">Eliminar Inversion</button>');
	}else{
		$(divParent).find('.add').remove();
		$(divParent).find('input[name="inversion"]').remove();
		contIn = 0;
		$(e).after('<input type="text" onblur="validateInversion(this);" class="validate-input" name="inversion" placeholder="Valor de inversion 0">');
	}
}

function changeGasto(e){
	divParent = $(e).parent();
	inputName = $(e).val();	
	
	if(inputName == 'GperiodoInd'){
		$(e).after('<button onclick="addGasto(this);" class="add">Agregar Gasto</button><button onclick="removeGasto(this);" class="add">Eliminar Gasto</button>');
	}else{
		$(divParent).find('.add').remove();
		$(divParent).find('input[name="gasto"]').remove();
		contGs = 0;
		$(e).after('<input type="text" onblur="validateGasto(this);" value="" name="gasto" placeholder="Valor de gasto 0">');
	}
}

function changeIngreso(e){
	divParent = $(e).parent();
	inputName = $(e).val();	
	
	if(inputName == 'HperiodoInd'){
		$(e).after('<button onclick="addIngreso(this);" class="add">Agregar Ingreso</button><button onclick="removeIngreso(this);" class="add">Eliminar Ingreso</button>');
	}else{
		$(divParent).find('.add').remove();
		$(divParent).find('input[name="ingreso"]').remove();
		contIg = 0;
		$(e).after('<input type="text" onblur="validateIngreso(this);" value="" name="ingreso" placeholder="Valor de ingreso 0">');
	}
}

function cantVida(e){
	divParent = $(e).parent();
	inputName = $(e).val();
	$(divParent).find('.errormessage').remove();
	$(e).removeClass('validation-failed');	
	
	if(inputName == ''){
		$(e).addClass('validation-failed');
		$(e).after('<span class="errormessage">*Valor requerido</span>');
	}else{
		if(!IsNumericr(inputName)){
			$(e).addClass('validation-failed');
			$(e).after('<span class="errormessage">*Valor debe ser numerico</span>');
		}
	}
}

function changeInteres(e){
	
	divParent = $(e).parent();
	select = $(e).val();
	newInteres = $(divParent).find('span[name="calcInteres"]');
	$(divParent).find('.errormessage').remove();
	divName = $(divParent).find('input[name="tasaNormal"]');
	$(divName).removeClass('validation-failed');
	if($(divName).val() == ''){
		$(divName).addClass('validation-failed');
		$(divName).after('<span class="errormessage">*Valor requerido</span>');
	}else{
		if(!IsNumericr($(divName).val())){
			$(divName).addClass('validation-failed');
			$(divName).after('<span class="errormessage">*Valor debe ser numerico</span>');
		}else{
			ireal = $(divName).val() /100;
			interes = 1+(ireal/select);
			interes = Math.pow(interes,select);
			interes = (interes-1)*100;
			$(newInteres).html(parseFloat(interes).toFixed(2));
		}
	}
}

function validateTasa(e){
	divParent = $(e).parent();
	select = $(divParent).find('select[name="tyInteres"]').val();
	newInteres = $(divParent).find('span[name="calcInteres"]');
	$(divParent).find('.errormessage').remove();
	$(e).removeClass('validation-failed');		
	if($(e).val() == ''){
		$(e).addClass('validation-failed');
		$(e).after('<span class="errormessage">*Valor requerido</span>');
	}else{
		if(!IsNumericr($(e).val())){
			$(e).addClass('validation-failed');
			$(e).after('<span class="errormessage">*Valor debe ser numerico</span>');
		}else{
			ireal = $(e).val() /100;
			interes = 1+(ireal/select);
			interes = Math.pow(interes,select);
			interes = (interes-1)*100;
			$(newInteres).html(parseFloat(interes).toFixed(2));
		}
	}
}

function validateInversion(e){
	divParent = $(e).parent();
	$(divParent).find('.errormessage').remove();
	$(e).removeClass('validation-failed');		
	if($(e).val() == ''){
		$(e).addClass('validation-failed');
		$(e).after('<span class="errormessage">*Valor requerido</span>');
	}else{
		if(!IsNumericr($(e).val())){
			$(e).addClass('validation-failed');
			$(e).after('<span class="errormessage">*Valor debe ser numerico</span>');
		}
	}
}

function validateGasto(e){
	divParent = $(e).parent();
	$(divParent).find('.errormessage').remove();
	$(e).removeClass('validation-failed');		
	if($(e).val() == ''){
		$(e).addClass('validation-failed');
		$(e).after('<span class="errormessage">*Valor requerido</span>');
	}else{
		if(!IsNumericr($(e).val())){
			$(e).addClass('validation-failed');
			$(e).after('<span class="errormessage">*Valor debe ser numerico</span>');
		}
	}
}

function validateIngreso(e){
	divParent = $(e).parent();
	$(divParent).find('.errormessage').remove();
	$(e).removeClass('validation-failed');		
	if($(e).val() == ''){
		$(e).addClass('validation-failed');
		$(e).after('<span class="errormessage">*Valor requerido</span>');
	}else{
		if(!IsNumericr($(e).val())){
			$(e).addClass('validation-failed');
			$(e).after('<span class="errormessage">*Valor debe ser numerico</span>');
		}
	}
}

function validateRescate(e){
	divParent = $(e).parent();
	$(divParent).find('.errormessage').remove();
	$(e).removeClass('validation-failed');		
	if($(e).val() == ''){
		$(e).addClass('validation-failed');
		$(e).after('<span class="errormessage">*Valor requerido</span>');
	}else{
		if(!IsNumericr($(e).val())){
			$(e).addClass('validation-failed');
			$(e).after('<span class="errormessage">*Valor debe ser numerico</span>');
		}
	}
}

function addInversion(e){
		divParent = $(e).parent();
		contIn = contIn +1;
		$(divParent).find('input[name="inversion"]:last-child').after('<input type="text" onblur="validateInversion(this);" class="validate-input" name="inversion" placeholder="Valor de inversion '+contIn+'">');
}

function removeInversion(e){
	divParent = $(e).parent();
	arrayInversion = $(divParent).find('input[name="inversion"]');
	contObject = Object.keys(arrayInversion).length;
	if(contObject != '5'){
		contIn = contIn-1;
		$(divParent).find('input[name="inversion"]:last-child').remove()
	}
}

function addGasto(e){
	divParent = $(e).parent();
	contGs = contGs +1;
	$(divParent).find('input[name="gasto"]:last-child').after('<input type="text" onblur="validateGasto(this);" class="validate-input" name="gasto" placeholder="Valor de gasto '+contGs+'">');
}

function removeGasto(e){
	divParent = $(e).parent();
	arrayInversion = $(divParent).find('input[name="gasto"]');
	contObject = Object.keys(arrayInversion).length;
	if(contObject != '5'){
		contGs = contGs-1;
		$(divParent).find('input[name="gasto"]:last-child').remove()
	}
}

function addIngreso(e){
	divParent = $(e).parent();
	contIg = contIg +1;
	$(divParent).find('input[name="ingreso"]:last-child').after('<input type="text" onblur="validateIngreso(this);" class="validate-input" name="ingreso" placeholder="Valor de ingreso '+contIg+'">');
}

function removeIngreso(e){
	divParent = $(e).parent();
	arrayInversion = $(divParent).find('input[name="ingreso"]');
	contObject = Object.keys(arrayInversion).length;
	if(contObject != '5'){
		contIg = contIg-1;
		$(divParent).find('input[name="ingreso"]:last-child').remove()
	}
}

function submitPro(urli){
	$('div.divProyecto').each(function(){
		contVa = 0;
		$(this).removeClass('divProyectoErr');
		validate = $(this).find('.validate-input');
		$(validate).each(function(){
			if($(this).val() == ''){
				$(this).parent().parent().addClass('divProyectoErr');
				$(this).addClass('validation-failed');
				contVa = contVa +1;
			}
		});
	});
	
	if(contVa == 0){
		$('div.divProyecto').each(function(){
			
			ingreso = new Array();
			inversion = new Array();
			gasto = new Array();
			proyectName = $(this).find('input[name="nameProject"]').val();
			tasa = $(this).find('span[name="calcInteres"]').html();
			tasa.replace(/[^0-9\.]+/g, "");
			vida = $(this).find('input[name="vida"]').val();
			selInversion = $(this).find('select[name="tyInversion"]').val();
			 $(this).find('input[name="inversion"]').each(function(){
				 inversion[inversion.length] = $(this).val();
			});
			selGastos = $(this).find('select[name="tyGastos"]').val();
			$(this).find('input[name="gasto"]').each(function(){
				gasto[gasto.length] = $(this).val();
			});
			selIngreso = $(this).find('select[name="tyIngresos"]').val();
			 $(this).find('input[name="ingreso"]').each(function(){
				 ingreso[ingreso.length] = $(this).val();
			});
			rescate = $(this).find('input[name="rescate"]').val();
			resultado = 0;
			result = 0;
			for(var i=0;i<=vida;i++){
				
				if(selInversion == 'Ifija' && i == 0){
					resultado = resultado-parseInt(inversion[0]);
				}else if(selInversion == 'Iperiodo'){
					result = result-parseInt(inversion[0]);
				}else if(selInversion == 'IperiodoInd'){
					result = result-parseInt(inversion[i]);
				}
				
				if(selGastos == 'Gfija' && i == 0){
					resultado =resultado - parseInt(gasto[0]);
				}else if(selGastos == 'Gperiodo'){
					result = result - parseInt(gasto[0]);
				}else if(selGastos == 'GperiodoInd'){
					result = result - parseInt(gasto[i]);
				}
				
				if(selIngreso == 'Hfija' && i == 0){
					resultado = resultado + parseInt(ingreso[0]);
				}else if(selIngreso == 'Hperiodo'){
					result = result + parseInt(ingreso[0]);
				}else if(selIngreso == 'HperiodoInd'){
					result = result + parseInt(ingreso[i]);
				}
				console.log(i);
				if(i == vida){					
					console.log('entro');
					resultado = (resultado+parseInt(rescate)) + (result / Math.pow((1+(tasa/100)),i));
					result = 0;
				}else if(i != 0){
					resultado = resultado + (result / Math.pow((1+(tasa/100)),i));
					result = 0;
				}else{
					result = 0;
				}
				
				
			}			
			resultadosFinales[resultadosFinales.length] = parseFloat(resultado).toFixed(2);
			NombresFinales[NombresFinales.length] = proyectName;
		});    
		
		jQuery('div.mainBody').html('<div class="Finalresults"></div>');
		max = Math.max.apply( Math, resultadosFinales );
		for(var r = 0;r<NombresFinales.length;r++){
			if(max == resultadosFinales[r]){
				jQuery('div.Finalresults').before('<div class="resultField"><h2>Nombre del proyecto: '+NombresFinales[r]+'</h2><h3>Proyecto Factible Economicamente</h3><p>Monto: '+resultadosFinales[r]+'</p></div>')
			}else{
				jQuery('div.Finalresults').before('<div class="resultField"><h2>Nombre del proyecto: '+NombresFinales[r]+'</h2><p>Monto: '+resultadosFinales[r]+'</p></div>')
			}
			
		}
		
		
	}
}