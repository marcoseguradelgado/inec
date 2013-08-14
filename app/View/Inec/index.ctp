
<h2>Factibilidad y viabilidad de proyectos</h2>

<button class="mainButton" onclick="addForm();">Agregar Proyecto</button>

<h5>Metodo de Factibilidad</h5>

<select id="metodo">
	<option value="VAN">VAN</option>
	<option value="TIR">TIR</option>
</select>

<div class="mainBody">
	<div id="form-1" class="divProyecto">
		<div class="fields">
			<input type="text" name="nameProject"
				placeholder="Nombre del proyecto">
		</div>
		<div class="fields">
			<input type="text" name="tasaNormal" class="validate-input" onblur="validateTasa(this);"
				placeholder="Tasa de Interes %"> <span>Tasa de Interes capitalizable:</span>
				 <select name="tyInteres" onchange="changeInteres(this);">
				<option value="1">Anual</option>
				<option value="2">Semestral</option>
				<option value="3">Cuatrimestral</option>
				<option value="4">Trimestral</option>
				<option value="6">Bimestral</option>
				<option value="12">Mensual</option>
			</select> <span>Calculo anual de la tasa de interes:</span><span class="noDisplay"
				name="calcInteres"></span><em>%</em>
		</div>
		<div class="fields">
			<input type="text" name="vida"
				placeholder="Cantidad de periodos del proyecto" class="validate-input" onblur="cantVida(this);">
		</div>
		<div class="fields">
			<span>Tipo de Inversion</span> <select name="tyInversion" onchange="changeInversion(this);">
				<option value="Ifija">Inicial Fijo</option>
				<option value="Iperiodo">Por periodo fijo</option>
				<option value="IperiodoInd">Por periodo variante</option>
			</select> <input type="text" class="validate-input" name="inversion"
				placeholder="Valor de inversion 0" onblur="validateInversion(this);">
		</div>
		<div class="fields">
			<span>Tipo de Gastos</span> <select name="tyGastos" onchange="changeGasto(this);">
				<option value="Gfija">Inicial Fijo</option>
				<option value="Gperiodo">Por periodo fijo</option>
				<option value="GperiodoInd">Por periodo variante</option>
			</select> <input type="text" class="validate-input" name="gasto" onblur="validateGasto(this);"
				placeholder="Valor de gasto 0">
		</div>
		<div class="fields">
			<span>Tipo de Ingresos</span> <select name="tyIngresos" onchange="changeIngreso(this);">
				<option value="Hfija">Inicial Fijo</option>
				<option value="Hperiodo">Por periodo fijo</option>
				<option value="HperiodoInd">Por periodo variante</option>
			</select> <input type="text" class="validate-input" name="ingreso" onblur="validateIngreso(this);"
				placeholder="Valor de ingreso 0">
		</div>
		<div class="fields">
			<input type="text" class="validate-input" name="rescate" onblur="validateRescate(this);"
				placeholder="Valor de Rescate">
		</div>
	</div>
</div>

<button class="calcularResults" onclick="submitPro('<?php echo Router::url( $this->here, true ); ?>');">Calcular Factibilidad</button>
