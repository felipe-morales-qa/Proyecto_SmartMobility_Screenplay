import { fakerES as faker } from '@faker-js/faker'; 

let firstNumberUsed = false;

export function makeColMobileDigits(): string {
  if (!firstNumberUsed) {
    firstNumberUsed = true;
    return '3102047999';   // Número fijo para la primera persona
  }

  const number = faker.number.int({ min: 0, max: 999_999_999 }).toString().padStart(9, '0');
  return `3${number}`;
}

export interface RandomPerson {
  schedulingName: string;
  schedulingPhone: string;
  codeSap: string;
  attendantName: string;
  attendantPhone: string;
  email?: string;
  city?: string;
}

export function generateRandomPerson(): RandomPerson {
  // Usamos nombres y ciudades en español
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;

  const attendantFirst = faker.person.firstName();
  const attendantLast = faker.person.lastName();
  const attendantFullName = `${attendantFirst} ${attendantLast}`;

  return {
    schedulingName: fullName,
    schedulingPhone: makeColMobileDigits(),
    codeSap: faker.string.numeric(6),
    attendantName: attendantFullName,
    attendantPhone: makeColMobileDigits(),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    city: faker.location.city(),
  };
}

export function resetFixedNumber() {
  firstNumberUsed = false;
}
