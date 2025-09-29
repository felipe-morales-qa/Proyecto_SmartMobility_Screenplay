import { faker } from '@faker-js/faker';

let primerNumeroUsado = false;

export function makeColMobileDigits(): string {
  if (!primerNumeroUsado) {
    primerNumeroUsado = true;
    return '3186013707';   // 📌 Número fijo para la primera persona
  }

  const numero = faker.number.int({ min: 0, max: 999_999_999 }).toString().padStart(9, '0');
  return `3${numero}`;
}

export interface PersonaAleatoria {
  schedulingName: string;
  schedulingPhone: string;
  codeSap: string;
  attendantName: string;
  attendantPhone: string;
  email?: string;
  city?: string;
}

export function generarPersonaAleatoria(): PersonaAleatoria {
  return {
    schedulingName: faker.person.firstName(),
    schedulingPhone: makeColMobileDigits(),
    codeSap: faker.string.numeric(6),
    attendantName: faker.person.firstName(),
    attendantPhone: makeColMobileDigits(),
    email: faker.internet.email().toLowerCase(),
    city: faker.location.city(),
  };
}

export function resetNumeroFijo() {
  primerNumeroUsado = false;
}
