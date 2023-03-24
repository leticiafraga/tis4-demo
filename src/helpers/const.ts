import { Historico } from "../requests/RegisterAthleteRequest";

export const historicoKeys: Array<keyof Historico> = [
  "imc",
  "massaCorporal",
  "estatura",
  "percentualMassa",
  "percentualGordura",
  "velocidade",
  "aceleracao", 
];
export const historicoKeysDisplay = [
  "IMC",
  "Massa corporal",
  "Estatura",
  "Percentual de massa",
  "Percentual de gordura",
  "Velocidade",
  "Aceleração"
];
export interface SelectOption {
  display: string;
  value: HistoricoKeys;
}
export type HistoricoKeys = typeof historicoKeys[number];
export type FilterDate = {
  startDate: string;
  endDate: string;
};
