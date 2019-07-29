import { Component, OnInit } from '@angular/core';
import { Persona } from './Entities/Persona';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Se declaran las 3 variables para las personas.
  persona1: Persona;
  persona2: Persona;
  persona3: Persona;
  // formData es un objeto donde se almacenaran los datos del formulario para crear personas.
  formData = {edad: 0, nombre: '', sexo: 0, peso: 0, altura: 0};
  // sexoMap es un mapa el cual se usa para el selector de sexos.
  sexoMap = new Map<number, string>();
  // peronasChanged es un variable usada para activar la animacion cada que se crean las personas.
  personasChanged = false;
  title = 'Exam';
  ngOnInit(): void {
    // se agregan los valores por defecto de hombre y mujer al mapa.
    this.sexoMap.set(0, 'Hombre');
    this.sexoMap.set(1, 'Mujer');
  }

  generarPersonas() {
    // se validan los datos del formulario antes de crear a las personas.
    const valido = this.validarDatos();
    if (valido === null) {
      // si los datos son validos entonces se activa la animacion y se crean las personas.
      this.personasChanged = false;
      setTimeout(e => {
        // la primera persona debe tener todos los datos del formulario.
        this.persona1 = new Persona(this.formData.nombre, this.formData.edad, this.formData.sexo,
          this.formData.peso, this.formData.altura);
        // la segunda debe tener todos menos los ultimos 2.
        this.persona2 = new Persona(this.formData.nombre, this.formData.edad, this.formData.sexo);
        // la tercera es con el contructor por defecto y se agregan los campos con el setter.
        this.persona3 = new Persona();
        this.persona3.setAltura(1.76);
        this.persona3.setEdad(24);
        this.persona3.setNombre('Roberto');
        this.persona3.setPeso(200);
        this.persona3.setSexo(environment.sexo.HOMBRE);
        this.personasChanged = true;
      }, 100);
    } else {
      // si no es valido se muestra una alerta diciendo los fallos que tuvo.
      alert(valido);
    }
  }

  validarDatos(): string {
    // se revisan los datos del formularo, si se encuentra un error en los datos se regresa inmediatamente la cadena con el error,
    // si no hay errores se regresa un null.
    if (!isNaN(+this.formData.nombre)) {
      return 'Ingresa un nombre valido.';
    }
    if (this.formData.edad > 120 || this.formData.edad <= 0 ) {
      return 'Ingresa una edad valida mayor a 0 y menor a 120.';
    }
    if (this.formData.peso <= 10 || this.formData.peso >= 500) {
      return 'Ingresa un peso valido, mayor a 10 y menor a 500.';
    }
    if (this.formData.altura <= 0 || this.formData.altura >= 3) {
      return 'Ingresa una altura valida, mayor a 0 y menor a 3.';
    }
    if (this.formData.sexo < environment.sexo.HOMBRE  || this.formData.sexo > environment.sexo.MUJER) {
      return 'Ingresa un sexo valido, H para hombre y M para mujer.';
    }
    return null;
  }
}
