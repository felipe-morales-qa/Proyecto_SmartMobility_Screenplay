import { fakerES as faker } from '@faker-js/faker'; 

let primerNumeroUsado = false;

/**
 * Genera un número móvil colombiano válido.
 * La primera persona usa un número fijo y las demás uno aleatorio.
 */
export function generarNumeroMovilColombiano(): string {
  if (!primerNumeroUsado) {
    primerNumeroUsado = true;
    return '3102047999';   // Número fijo para la primera persona
  }

  const numero = faker.number.int({ min: 0, max: 999_999_999 })
    .toString()
    .padStart(9, '0');

  return `3${numero}`;
}

/**
 * Interfaz de persona ficticia usada en los agendamientos.
 */
export interface PersonaAleatoria {
  nombreCliente: string;
  telefonoCliente: string;
  codigoSAP: string;
  nombreAtiende: string;
  telefonoAtiende: string;
  correo?: string;
  ciudad?: string;
}

/**
 * Genera una persona aleatoria con datos coherentes en español.
 */
export function generarPersonaAleatoria(): PersonaAleatoria {
  return {
    nombreCliente: faker.person.firstName(),     // 👈 nombre realista en español
    telefonoCliente: generarNumeroMovilColombiano(),
    codigoSAP: faker.string.numeric(6),
    nombreAtiende: faker.person.firstName(),
    telefonoAtiende: generarNumeroMovilColombiano(),
    correo: faker.internet.email().toLowerCase(),
    ciudad: faker.location.city(),
  };
}

/**
 * Permite reiniciar el número fijo para nuevas corridas.
 */
export function reiniciarNumeroFijo() {
  primerNumeroUsado = false;
}
