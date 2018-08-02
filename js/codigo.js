var alumnos = [];

function completartabla(){
$("#tabla1").html("");
$("#tabla1").append("<thead><tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Mail</th><th>Foto</th></tr></thead>");
$("#tabla1").append("<tbody id='body1'></body>");	
	for (var i = 0; i < alumnos.length; i++)
	$("#body1").append("<tr><td>"+alumnos[i].nombre+"</td><td>"+alumnos[i].apellido+"</td><td>"+alumnos[i].edad+"</td><td>"+alumnos[i].email+"</td><td><div align='center'><img width='100px' src='"+alumnos[i].foto+ "'>" + "</img>"+"</div></td></tr>");
}

function alumno(){
	this.nombre="";
	this.apellido="";
	this.edad="";
	this.email="";
	this.foto="";
}

$(document).ready(function(){
	$("#boton1").click(function(){
		if (localStorage.getItem("alumnosGuardados")==undefined){
				$.ajax({
				url: "http://www.scaggiano.com.uy/json.js",
				success: function(datos){
					alumnos = JSON.parse(datos);
					completartabla();
					localStorage.setItem("alumnosGuardados", datos);
				},

				error: function(){
					$("body").append("<div align='center'><h1> No se pudieron cargar los datos</h1></div>");

				}
			});
		}//para consultar si existe
		else {
			var alumnosStr = localStorage.getItem("alumnosGuardados");
			alumnos = JSON.parse(alumnosStr);
			completartabla();
		}

	});
	
	$("#agregaralumn").click(function(){
		var nom = $("#nombre").val();
		var apell = $("#apellido").val();
		var edad = $("#edad").val();
		var email = $("#correo").val();


		var persona1 = new alumno();
		persona1.nombre = nom;
		persona1.apellido = apell;
		persona1.edad = edad;
		persona1.email = email;


		alumnos.push(persona1);
		var alumnosStr = JSON.stringify(alumnos);
		localStorage.setItem("alumnosGuardados", alumnosStr);// para guardar
		completartabla();
		$('#exampleModal').modal('hide');
	});
});



