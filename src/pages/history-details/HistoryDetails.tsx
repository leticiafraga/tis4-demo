import Card from "../../components/card/Card";
import FormSection from "../../components/form-section/FormSection";
import Input from "../../components/input/Input";
import { Atleta, Historico } from "../../requests/RegisterAthleteRequest";
import style from "./historyDetails.module.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAge,
  getIMC,
  getVelocidade,
} from "../../helpers/calculateAttributes";

export default function HistoryDetails() {
  const location = useLocation();
  const [athlete, setAthlete] = useState<Atleta>();
  const [historico, setHistorico] = useState<Historico>();

  let { id } = useParams();

  useEffect(() => {
    const a = location.state.athlete;
    const h = location.state.historico;
    setAthlete(a);
    setHistorico(h);
  }, []);

  return (
    <main className={style.main}>
      <div className="row">
        <div className="col-12">
          <h1>
            {athlete?.nome +
              " - " +
              historico?.ultimaAtualizacao?.toLocaleDateString("pt-br")}
          </h1>
        </div>
        <div className="col-12">
          <Card>
            <form>
              <FormSection header={"Dados pessoais"}>
                <Input value={athlete?.nome} label="Nome" disabled />
                <Input
                  value={athlete?.dataNascimento.toLocaleDateString("pt-br")}
                  label="Data de Nascimento"
                  disabled
                />
                <Input
                  label="Idade"
                  value={getAge(athlete?.dataNascimento)}
                  disabled
                />
              </FormSection>
              <FormSection header={"Dados antropométricos"}>
                <Input
                  label="Estatura (cm)"
                  disabled
                  value={historico?.estatura}
                />
                <Input
                  label="Massa corporal (kg)"
                  disabled
                  value={historico?.massaCorporal}
                />
                <Input
                  label="% Gordura corporal"
                  disabled
                  value={historico?.percentualGordura}
                />
                <Input
                  label="% Massa muscular"
                  disabled
                  value={historico?.percentualMassa}
                />
                <Input
                  label="IMC"
                  value={getIMC(historico?.estatura, historico?.massaCorporal)}
                  disabled
                />
              </FormSection>
              <FormSection header={"Desempenho"}>
                <Input
                  label="Velocidade (m/s)"
                  disabled
                  value={getVelocidade(
                    historico?.distanciaVelocidade,
                    historico?.tempoVelocidade
                  )}
                />
                <Input
                  label="Distância (m)"
                  disabled
                  value={historico?.distanciaVelocidade}
                />
                <Input
                  label="Tempo percorrido (s)"
                  disabled
                  value={historico?.tempoVelocidade}
                />
                <Input
                  label="Aceleração (m/s²)"
                  disabled
                  value={historico?.aceleracao}
                />
                <Input label="Força MMI" disabled value={historico?.forcaMMI} />
                <Input label="Força MMS" disabled value={historico?.forcaMMS} />
              </FormSection>
              <div className="row mb-4">
                <div className="col-lg-6">
                  <h3>Observações</h3>
                  <textarea
                    id="observations"
                    className="form-control"
                    disabled
                    value={historico?.observacoes}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-primary">
                    <Link className="nav-link" to={"/list"}>
                      Voltar
                    </Link>
                  </button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </main>
  );
}
