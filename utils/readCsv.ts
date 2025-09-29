import fs from 'fs';
import * as Papa from 'papaparse';

export interface ContractRecord {
  "Cuenta_Contrato": string;
  "Cobertura": string;
}

export function pickRandomContract(filePath: string): ContractRecord {
  const csv = fs.readFileSync(filePath, 'utf8');

  const { data } = Papa.parse<ContractRecord>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = (data as ContractRecord[]).filter(r => r["Cuenta_Contrato"]);
  const randomIndex = Math.floor(Math.random() * rows.length);

  return rows[randomIndex];
}
