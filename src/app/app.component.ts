import { Component, OnInit } from '@angular/core';
import { Persona } from './Entities/Persona';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  persona1: Persona;
  persona2: Persona;
  persona3: Persona;
  formData = {edad: 0, nombre: '', sexo: 0, peso: 0, altura: 0};
  sexoMap = new Map<number, string>();
  personasChanged = false;
  title = 'Exam';
  ngOnInit(): void {
    this.sexoMap.set(0, 'Hombre');
    this.sexoMap.set(1, 'Mujer');
  }

  generarPersonas() {
    const valido = this.validarDatos();
    if (valido === null) {
      this.personasChanged = false;
      setTimeout(e => {
        this.persona1 = new Persona(this.formData.nombre, this.formData.edad, this.formData.sexo,
        this.formData.peso, this.formData.altura);
        this.persona2 = new Persona(this.formData.nombre, this.formData.edad, this.formData.sexo);
        this.persona3 = new Persona();
        this.persona3.setAltura(1.76);
        this.persona3.setEdad(24);
        this.persona3.setNombre('Roberto');
        this.persona3.setPeso(200);
        this.persona3.setSexo(environment.sexo.HOMBRE);
        this.personasChanged = true;
      }, 100);
    } else {
      alert(valido);
    }
  }

  validarDatos(): string {
    console.log(this.formData);
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
