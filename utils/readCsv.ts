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
    dynamicTyping: false,
  });

  const rows = (data as ContractRecord[]).filter(r => r["Cuenta_Contrato"]);

  const randomIndex = Math.floor(Math.random() * rows.length);
  const record = rows[randomIndex];

  
  record["Cuenta_Contrato"] = String(record["Cuenta_Contrato"]).trim();
  record["Cobertura"] = String(record["Cobertura"]).trim();

  return record;
}
