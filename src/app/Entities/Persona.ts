import { environment } from 'src/environments/environment';

export class Persona {

    private nombre: string;
    private edad: number;
    private NSS: string;
    private sexo: number;
    private peso: number;
    private altura: number;

    constructor()
    constructor(nombre: string, edad: number, sexo: number, peso?: number, altura?: number)
    constructor(nombre?: string, edad?: number, sexo?: number, peso?: number, altura?: number) {
        (nombre === undefined) ? this.nombre = '' : this.nombre = nombre;
        (edad === undefined) ? this.edad = 0 : this.edad = edad;
        this.NSS = this.generaNSS();
        (sexo === undefined) ? this.sexo = environment.sexo.HOMBRE : this.sexo = sexo;
        (peso === undefined) ? this.peso = 0 : this.peso = peso;
        (altura === undefined) ? this.altura = 0 : this.altura = altura;
    }

    public calcularIMC(): number {
        const resultado: number = this.peso / (Math.pow(2, this.altura));
        if (this.sexo === environment.sexo.HOMBRE && resultado < 20 || this.sexo === environment.sexo.MUJER &&
            resultado < 19) {
            return environment.pesos.INFRAPESO;
        }
        if (this.sexo === environment.sexo.HOMBRE && resultado >= 20 && resultado <= 25 || this.sexo === environment.sexo.MUJER &&
            resultado >= 19 && resultado <= 24) {
            return environment.pesos.PESO_IDEAL;
        }
        if (this.sexo === environment.sexo.HOMBRE && resultado > 25 || this.sexo === environment.sexo.MUJER &&
            resultado > 24) {
            return environment.pesos.SOBREPESO;
        }
    }

    public esMayorDeEdad(): boolean {
        return this.edad >= 18;
    }

    private comprobarSexo(sexo: number): boolean {
        return this.sexo === sexo;
    }

    private generaNSS(): string {
        return Math.random().toString(36).substr(2, 8);
    }

    public toString(): string {
        let sexo: string;
        let estadoPeso: string;
        let estadoEdad: string;
        switch (this.calcularIMC()) {
            case environment.pesos.INFRAPESO: estadoPeso = '!Falta de peso!'; break;
            case environment.pesos.PESO_IDEAL: estadoPeso = 'Peso normal'; break;
            case environment.pesos.SOBREPESO: estadoPeso = '!Sobrepeso!'; break;
            default: estadoPeso = 'No disponible';
        }
        (this.esMayorDeEdad()) ? estadoEdad = 'Es Mayor De Edad' : estadoEdad = 'Es Menor De Edad';
        (this.sexo === environment.sexo.HOMBRE) ? sexo = 'H' : sexo = 'M';
        return `Nombre: ${this.nombre}, Sexo: ${sexo}, Edad: ${this.edad}, ${estadoEdad}, `
            + `Peso: ${this.peso} -${estadoPeso}-, Altura: ${this.altura}, NSS: ${this.NSS}`;
    }

    public setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public setEdad(edad: number) {
        this.edad = edad;
    }

    public setSexo(sexo: number) {
        this.sexo = sexo;
    }

    public setPeso(peso: number) {
        this.peso = peso;
    }

    public setAltura(altura: number) {
        this.altura = altura;
    }
}
