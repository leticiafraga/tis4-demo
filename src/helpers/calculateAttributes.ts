import { Atleta } from "../requests/RegisterAthleteRequest";

export function getIMC(estatura?: number, massaCorporal?: number) {
  if (estatura && massaCorporal)
    return (massaCorporal / ((estatura / 100) * (estatura / 100))).toFixed(1);
  return undefined;
}

export function getAge(dataNascimento?: Date) {
  if (!dataNascimento) return undefined;
  const today = new Date();
  const age = today.getFullYear() - new Date(dataNascimento).getFullYear();
  if (
    new Date(dataNascimento).getMonth() > today.getMonth() ||
    (new Date(dataNascimento).getMonth() == today.getMonth() &&
      new Date(dataNascimento).getDate() >= today.getDate())
  )
    return age - 1;
  return age > 0 ? age : 0;
}

export function getVelocidade(
  distancia?: number | null,
  tempo?: number | null
) {
  if (distancia && tempo) return distancia / tempo;
  return undefined;
}

export function filterByAge(
  athletes: (Atleta & { age: number })[],
  age: number
) {
  return age <= 0 ? athletes : athletes.filter((a) => a.age == age);
}

export function filterByName(
  athletes: (Atleta & { age: number })[],
  name: string
) {
  return athletes.filter((a) => normalize(a.nome).includes(normalize(name)));
}

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
