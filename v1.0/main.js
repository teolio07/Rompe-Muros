
/* swal.fire("bienvenidos") */
function abrirVentana(){
    window.open("index.html" , "ventana1" , "width=700,height=400,scrollbars=false")

}


    swal.fire({
        title: 'bienvenido',
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        showCancelButton: true,
        cancelButtonText: 'salir',
        showConfirmButton:  true,
        confirmButtonText: 'jugar',
        
    }).then((result)=>{
        if (result.isConfirmed) {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
    
        var posProyectilX = canvas.width/2; //240
        var posProyectilY = canvas.height-30;//190
        var radioProyectil = 10;
        var aumentoPosXProyectil = 2;
        var aumentoPosYProyectil = -2;
        
    
        var altoBarra = 10;
        var anchoBarra = 75;
        var posBarraX = (canvas.width-anchoBarra)/2; //202.5        202+75=277,5
        /* document.write(posBarraX + " posBarraX") */
        var posBarraY = 330;
        /* document.write("<br>" +posBarraY + "posBarraY") */
    
        var btnDerecho = false;
        var btnIzquierdo = false;
    
        var cantidadFilas = 1; //5
        var cantidadColumnas = 1; //7
        var anchoLadrillo = 75;
        var altoLadrillo = 20;
        var espacioLadrillos =10;
        var margenSuperior = 30;
        var margenIzquierda = 30;
    
        var posLadrillos = [];
        for(columna=0; columna<cantidadColumnas; columna++) {
            posLadrillos[columna] = [];
            for(fila=0; fila<cantidadFilas; fila++) {
                posLadrillos[columna][fila] = { posLadrilloX: 0,
                                       posLadrilloY: 0, 
                                       estado: 1,
                                       color: "rgba(69, 227, 34, 1)"};
            }
        }
        console.log(posLadrillos)
        var Puntaje = 0;
    
        var vidas = 3;
    
        var velocidadX = 0;
        var velocidadY = 0;
    
    
        
        
    
        document.addEventListener("keydown", btnPresionado, false);
        document.addEventListener("keyup", btnSuelto, false);
        
    
        function btnPresionado(e) {
            if(e.keyCode == 39) {
                btnDerecho = true;
            }
            else if(e.keyCode == 37) {
                btnIzquierdo = true;
            }
    
        }
    
        function btnSuelto(e) {
            if(e.keyCode == 39) {
                btnDerecho = false;
            }
            else if(e.keyCode == 37) {
                btnIzquierdo = false;
            }
        }
    
        
        function cambiarColorLadrillo(){
            for(columna=0; columna<cantidadColumnas; columna++) {
                for(fila=0; fila<cantidadFilas; fila++) {
                    var ladrillo = posLadrillos[columna][fila];
                    if (ladrillo.estado == 1 && ladrillo.color == "rgba(69, 227, 34, 1)") {
                        if(posProyectilX > ladrillo.posLadrilloX && posProyectilX < ladrillo.posLadrilloX+anchoLadrillo && posProyectilY > ladrillo.posLadrilloY && posProyectilY < ladrillo.posLadrilloY+altoLadrillo) {
                            ladrillo.color = "red";
                        }
                    }
                }
            }
        }
    
        function nivel2(){ 
            posProyectilX = canvas.width/2 - canvas.width/2 ;
            posProyectilY = canvas.height-30 - canvas.height-30;
            posBarraX = (canvas.width-anchoBarra)/2;  
            swal.fire({
                title: 'ganaste',
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger',
                showCancelButton: true,
                cancelButtonText: 'volver a intentar',
                showConfirmButton:  true,
                confirmButtonText: 'Siguiente nivel',
                
            }).then((resul)=>{
                console.log(resul)
              if(resul.isConfirmed){
                window.location.href = "https://youtube.com";
              }else{
                location.reload()
              }
            }) 
        }
    
        function Colisiones() {
            for(columna=0; columna<cantidadColumnas; columna++) {
                for(fila=0; fila<cantidadFilas; fila++) {
                    var ladrillo = posLadrillos[columna][fila];
                    if (ladrillo.estado == 1 && ladrillo.color == "red") {
                            if(posProyectilX > ladrillo.posLadrilloX && posProyectilX < ladrillo.posLadrilloX+anchoLadrillo && posProyectilY > ladrillo.posLadrilloY && posProyectilY < ladrillo.posLadrilloY+altoLadrillo) {
                                aumentoPosYProyectil = -aumentoPosYProyectil;
                                ladrillo.estado = 0                           
                                Puntaje++;
                                if (Puntaje == cantidadFilas*cantidadColumnas) {
                                    /* alert("Ganaste"); */
                                    nivel2(); 


                                }
                            }
                    }
                }
            }
        }
    
        
        
        function proyectil(){
            var balon = new Image();
            balon.src="imagenes/balon.png";
            ctx.beginPath();
                ctx.arc(posProyectilX, posProyectilY, radioProyectil, 0, Math.PI*2, false);            
                ctx.drawImage(balon,posProyectilX-10, posProyectilY-10,)
            ctx.closePath();        
        }
    
        function pintarPosicionarLadrillos() { 
            for(columna=0; columna<cantidadColumnas; columna++) {
                for(fila=0; fila<cantidadFilas; fila++) {
                    if(posLadrillos[columna][fila].estado == 1){
                        var posXLadrillo = (columna*(anchoLadrillo+espacioLadrillos))+margenIzquierda;
                        var posYLadrillo = (fila*(altoLadrillo+espacioLadrillos))+margenSuperior;
                        posLadrillos[columna][fila].posLadrilloX = posXLadrillo;
                        posLadrillos[columna][fila].posLadrilloY = posYLadrillo;
                        ctx.beginPath();
                        ctx.rect(posXLadrillo, posYLadrillo, anchoLadrillo, altoLadrillo);
                        ctx.fillStyle = posLadrillos[columna][fila].color;
                        ctx.fill();
                        
                        ctx.closePath();
                    }
                }
            }
        }
    
        function mostrarPuntaje() {
        ctx.font = "13px uno";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Puntaje: "+Puntaje, 10, 20);
        }
    
        function mostrarVidas() {
            ctx.font = "10px uno";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Vidas: "+vidas, canvas.width-65, 20);
        }
    
        function Barra() {
        var texturaBarra = new Image();
        texturaBarra.src="imagenes/texturaBarra.JPG";
        ctx.beginPath();
        ctx.rect(posBarraX,posBarraY, anchoBarra, altoBarra);
        ctx.fillStyle = "rgba(227, 68, 196, 1)";
        ctx.fill();
        ctx.drawImage(texturaBarra,posBarraX,posBarraY)
        ctx.closePath();
        }

        function reiniciar(){
            posProyectilX = canvas.width/2 - canvas.width/2 ;
            posProyectilY = canvas.height-30 - canvas.height-30;
            posBarraX = (canvas.width-anchoBarra)/2;
            swal.fire({
                title: 'Se te acabaron las vidas',
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger',
                showCancelButton: true,
                cancelButtonText: 'salir del juego',
                showConfirmButton:  true,
                confirmButtonText: 'volver a intentar',
                
            }).then((res)=>{
              if(res.isConfirmed){
                  location.reload()
              }else{
                  window.close()
              }
            }) 
        }
        
        function funcionPrincipal() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pintarPosicionarLadrillos();
            proyectil();
            Barra()
            mostrarPuntaje();
            mostrarVidas();
            setInterval(cambiarColorLadrillo,1000)
            Colisiones()
            if(posProyectilX + aumentoPosXProyectil > canvas.width-radioProyectil || posProyectilX + aumentoPosXProyectil < 10){
                aumentoPosXProyectil = -aumentoPosXProyectil;
            }
            
            if(posProyectilY + aumentoPosYProyectil < radioProyectil) {
                aumentoPosYProyectil = -aumentoPosYProyectil;
            } else if(posProyectilY + aumentoPosYProyectil > canvas.height-radioProyectil) {
                //
                if(posProyectilX > posBarraX && posProyectilX < posBarraX + anchoBarra){
                    aumentoPosYProyectil = -aumentoPosYProyectil
                }
                else{
                    if(vidas==1) {                                    
                        reiniciar();
                                        
                    }
                    else {
                        posProyectilX = canvas.width/2;
                        posProyectilY = canvas.height-30;
                        aumentoPosXProyectil = 2;
                        aumentoPosYProyectil = -2;
                        posBarraX = (canvas.width-anchoBarra)/2;
                        vidas--;
                    }
                }
            }
    
           
            if(btnDerecho && posBarraX < canvas.width-anchoBarra) {
                console.log(posBarraX)
                posBarraX += 7;
            }
            else if(btnIzquierdo && posBarraX > 0) {
                console.log(posBarraX)
                posBarraX -= 7;
            }
    
            posProyectilX += aumentoPosXProyectil;
            posProyectilY += aumentoPosYProyectil;
            requestAnimationFrame(funcionPrincipal);
        }
        funcionPrincipal();
        }else{
            window.close()
        }
    })

