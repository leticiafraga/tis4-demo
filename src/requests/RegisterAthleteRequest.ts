import { object, string, number, date, InferType, array } from "yup";
export const registerAthleteSchema = object({
  nome: string().required(),
  dataNascimento: date().required(),
  
  percentualGordura: number().positive().required(),
  percentualMassa: number().positive().required(),
  massaCorporal: number().positive().required(),
  estatura: number().positive().required(),
  distanciaVelocidade: number().positive().default(0),
  tempoVelocidade: number().positive().default(0),
  aceleracao: number().positive().default(0),
  forcaMMI: number().positive().default(0),
  forcaMMS: number().positive().default(0),
  observacoes: string(),
  ultimaAtualizacao: string(),
});

export const historicoSchema = object({
  percentualGordura: number().positive().required(),
  percentualMassa: number().positive().required(),
  massaCorporal: number().positive().required(),
  estatura: number().positive().required(),
  distanciaVelocidade: number().positive().default(0),
  tempoVelocidade: number().positive().default(0),
  aceleracao: number().positive().default(0),
  forcaMMI: number().positive().default(0),
  forcaMMS: number().positive().default(0),
  observacoes: string(),
  ultimaAtualizacao: date(),
});

export const atletaSchema = object({
  nome: string().required(),
  dataNascimento: date().required(),
  historico: array(historicoSchema),
});

export type RegisterAthleteRequest = InferType<typeof registerAthleteSchema> & {
  id?: string;
};

export type Historico = {
  percentualGordura: number;
  percentualMassa: number;
  massaCorporal: number;
  estatura: number;
  distanciaVelocidade: number;
  tempoVelocidade: number;
  aceleracao: number;
  forcaMMI: number;
  forcaMMS: number;
  observacoes: string;
  ultimaAtualizacao: Date;
  velocidade?: number;
  imc?: number;
};
export type Atleta = {
  nome: string;
  dataNascimento: Date;
  historico: [Historico];
  id: string;
};
export type UpdateAthlete = Historico & Atleta;
