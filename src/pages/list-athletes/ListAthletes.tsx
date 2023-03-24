import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import useFirebase from "../../hooks/useFirebase";
import {
  filterByAge,
  filterByName,
  getAge,
  getIMC,
} from "../../helpers/calculateAttributes";
import { Atleta } from "../../requests/RegisterAthleteRequest";
import style from "./listAthletes.module.scss";
import { Modal } from "../../components/modal/Modal";

export default function ListAthletes() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [delAthlete, setDelAthlete] = useState<Atleta | undefined>(undefined);
  const [athletes, setAthletes] = useState<(Atleta & { age: number })[]>([]);
  const [filteredAthletes, setFilteredAthletes] = useState<
    (Atleta & { age: number })[]
  >([]);

  useEffect(() => {
    getAthletes();
  }, []);

  async function getAthletes() {
    const a = await firebase.getAll();
    if (a) {
      const mappedAthletes = a.map((athlete: Atleta) => {
        const historico = athlete.historico.map((h) => {
          const { imc, ...hist } = h;
          return { ...hist, imc: getIMC(h.estatura, h.massaCorporal) };
        });
        return {
          age: getAge(athlete.dataNascimento),
          id: athlete.id,
          nome: athlete.nome,
          dataNascimento: athlete.dataNascimento,
          historico,
        };
      });
      setAthletes(mappedAthletes);
      setFilteredAthletes(mappedAthletes);
    }
  }

  function deleteAthlete() {
    firebase.del(delAthlete!.id).then(() => {
      getAthletes();
    });
    setDelAthlete(undefined);
  }

  function filterAthletesAge(e: React.ChangeEvent<HTMLInputElement>) {
    const a = filterByAge(athletes, parseInt(e.target.value));
    setFilteredAthletes(a);
  }

  function filterAthletesName(e: React.ChangeEvent<HTMLInputElement>) {
    const a = filterByName(athletes, e.target.value);
    setFilteredAthletes(a);
  }

  function onClickAthlete(athlete: Atleta) {
    navigate("/athlete", {
      state: { athlete },
    });
  }

  function onClickEdit(athlete: Atleta) {
    navigate("/edit", {
      state: { athlete },
    });
  }

  function onClickDelete(athlete: Atleta) {
    setDelAthlete(athlete);
  }

  return (
    <main>
      <div className="row">
        <div className="col-12">
          <h1>Lista de Atletas</h1>
        </div>
      </div>
      <div className={"d-flex align-items-center " + style.filter}>
        <div>
          <div className="filter-text">Filtrar por nome do atleta:</div>
          <div className="col-12">
            <Input onChange={filterAthletesName} type="text" />
          </div>
        </div>
        <div className="ms-3">
          <div className="filter-text">Filtrar por idade:</div>
          <div className="col-12">
            <Input onChange={filterAthletesAge} type="number" />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className={"col-12 " + style.table}>
          {filteredAthletes.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Data de nascimento</th>
                  <th>Estatura</th>
                  <th>Massa corporal</th>
                  <th>Última atualização</th>
                </tr>
              </thead>
              <tbody>
                {filteredAthletes.map((athlete) => {
                  const historico = athlete.historico;
                  const last = historico.length - 1;
                  return (
                    <tr
                      key={athlete.id}
                      className={style.athleteLink}
                      onClick={() => onClickAthlete(athlete)}
                    >
                      <td>{athlete.nome}</td>
                      <td>
                        {athlete.dataNascimento?.toLocaleDateString("pt-br")}
                      </td>
                      <td>{historico[last].estatura} cm</td>
                      <td>{historico[last].massaCorporal} kg</td>
                      <td>
                        {historico[last].ultimaAtualizacao.toLocaleDateString(
                          "pt-br"
                        )}
                      </td>
                      <td>
                        <button
                          className=" btn btn-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            onClickEdit(athlete);
                          }}
                        >
                          Atualizar
                        </button>
                      </td>
                      <td>
                        <button
                          className=" btn btn-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            onClickDelete(athlete);
                          }}
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            "Nenhum resultado encontrado!"
          )}
        </div>
        {delAthlete ? (
          <Modal
            closeModal={() => setDelAthlete(undefined)}
            confirm={deleteAthlete}
            message={`Você tem certeza de que quer deletar ${delAthlete.nome}?`}
          />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
