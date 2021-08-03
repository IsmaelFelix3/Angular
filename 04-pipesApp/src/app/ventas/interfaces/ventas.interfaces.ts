
// trabajar con enumeracion es trabajar con valores numericos solo que con palabras
export enum Color 
{
    rojo,negro,azul,verde
}

export interface Heroe
{
    nombre: string,
    vuela: boolean,
    color: Color
}