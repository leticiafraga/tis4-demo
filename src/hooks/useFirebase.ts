import { get, getDatabase, push, ref, remove, update } from "firebase/database";
import {
  Atleta,
  RegisterAthleteRequest,
  UpdateAthlete,
} from "../requests/RegisterAthleteRequest";

export default function useFirebase() {
  const db = getDatabase();
  async function getAll(): Promise<any> {
    return await get(ref(db, "/athletes")).then((snapshot) => {
      if (snapshot.exists()) {
        const athletes: Atleta[] = snapshot.val();
        const keys = Object.keys(athletes);
        const athletesList = Object.values(athletes);
        for (let i = 0; i < athletesList.length; i++) {
          athletesList[i].id = keys[i];
          athletesList[i].dataNascimento = new Date(
            athletesList[i].dataNascimento
          );
          athletesList[i].historico!.forEach((h) => {
            h.ultimaAtualizacao = new Date(h.ultimaAtualizacao);
          });
        }

        return athletesList;
      } else {
        console.log("No data available");
      }
    });
  }

  async function getAthlete(id?: string): Promise<any> {
    if (!id) {
      console.log("erro");
      return;
    }

    return await get(ref(db, "athletes/" + id)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }

  function create(athlete: RegisterAthleteRequest) {
    const { dataNascimento, nome, ...historico } = athlete;
    historico.ultimaAtualizacao = new Date().toISOString();
    const a = {
      dataNascimento: dataNascimento.toISOString(),
      nome,
      historico: [historico],
    };
    push(ref(db, "athletes/"), {
      ...a,
    }).then((res) => console.log(res));
  }

  function updateAthlete(key: string, value: RegisterAthleteRequest) {
    update(ref(db, `athletes/${key}`), value).then(console.log);
  }

  async function del(key: string) {
    if (!key) return;
    return remove(ref(db, "athletes/" + key)).then((res) => res);
  }
  return { getAll, getAthlete, create, updateAthlete, del };
}
