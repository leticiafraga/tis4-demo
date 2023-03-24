import { useForm } from "react-hook-form";
import Card from "../../components/card/Card";
import FormSection from "../../components/form-section/FormSection";
import Input from "../../components/input/Input";
import {
  registerAthleteSchema,
  RegisterAthleteRequest,
  Atleta,
  Historico,
} from "../../requests/RegisterAthleteRequest";
import style from "./registerAthletes.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import {
  getAge,
  getIMC,
  getVelocidade,
} from "../../helpers/calculateAttributes";
import { useState, useEffect, useMemo } from "react";

export default function RegisterAthletes() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [athlete, setAthlete] = useState<Atleta>();
  const [historico, setHistorico] = useState<Historico>();
  const [formData, setFormData] = useState<RegisterAthleteRequest>();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterAthleteRequest>({
    resolver: yupResolver(registerAthleteSchema),
    defaultValues: useMemo(() => {
      return formData;
    }, [formData]),
  });

  useEffect(() => {
    if (location?.state?.athlete) {
      const a = location.state.athlete;
      setIsEdit(true);
      const { nome, id, dataNascimento, historico } = a;
      const values = {
        nome,
        id,
        dataNascimento: dataNascimento.toISOString().substring(0, 10),
        ...historico[historico.length - 1],
      };
      reset(values);
      setFormData(values);

      setAthlete(a);
      setHistorico(a.historico[0]);
    }
  }, []);

  async function handleSuccess(data: RegisterAthleteRequest) {
    if (isEdit) {
      const { dataNascimento, nome, id, ...historico } = data;
      athlete!.nome = nome;
      athlete!.dataNascimento = data.dataNascimento;
      //@ts-ignore
      historico.ultimaAtualizacao = new Date();
      //@ts-ignore
      athlete?.historico?.push(historico);
      //@ts-ignore
      await firebase.updateAthlete(athlete?.id, athlete);
    } else {
      await firebase.create(data);
    }
    navigate("/list");
  }
  async function handleError(data: any) {
    console.log("error", data);
    console.log(errors);
  }

  const [estatura, massaCorporal, dataNascimento, distancia, tempo] = watch([
    "estatura",
    "massaCorporal",
    "dataNascimento",
    "distanciaVelocidade",
    "tempoVelocidade",
  ]);

  return (
    <main className={style.main}>
      <div className="row">
        <div className="col-12">
          <h1>
            {isEdit ? "Atualizar " + athlete?.nome : "Cadastro de Atletas"}
          </h1>
        </div>
        <div className="col-12">
          <Card>
            <form onSubmit={handleSubmit(handleSuccess, handleError)}>
              <FormSection header={"Dados pessoais"}>
                <Input
                  label="Nome"
                  {...register("nome")}
                  error={!!errors.nome}
                />
                <Input
                  label="Data de Nascimento"
                  type="date"
                  {...register("dataNascimento")}
                  error={!!errors.dataNascimento}
                />
                <Input
                  label="Idade"
                  type="number"
                  value={getAge(dataNascimento)}
                  disabled
                />
              </FormSection>
              <FormSection header={"Dados antropométricos"}>
                <Input
                  label="Estatura (cm)"
                  type="number"
                  step={0.1}
                  {...register("estatura")}
                  error={!!errors.estatura}
                />
                <Input
                  label="Massa corporal (kg)"
                  type="number"
                  step={0.1}
                  {...register("massaCorporal")}
                  error={!!errors.massaCorporal}
                />
                <Input
                  label="% Gordura corporal"
                  type="number"
                  step={0.01}
                  {...register("percentualGordura")}
                  error={!!errors.percentualGordura}
                />
                <Input
                  label="% Massa muscular"
                  type="number"
                  step={0.1}
                  {...register("percentualMassa")}
                  error={!!errors.percentualMassa}
                />
                <Input
                  label="IMC"
                  type="number"
                  value={getIMC(estatura, massaCorporal)}
                  step={0.01}
                  disabled
                />
              </FormSection>
              <FormSection header={"Desempenho"}>
                <Input
                  label="Velocidade (m/s)"
                  id="height"
                  type="number"
                  step={0.01}
                  value={getVelocidade(distancia, tempo)}
                  disabled
                />
                <Input
                  label="Distância (m)"
                  id="weight"
                  type="number"
                  step={0.01}
                  {...register("distanciaVelocidade")}
                  error={!!errors.distanciaVelocidade}
                />
                <Input
                  label="Tempo percorrido (s)"
                  id=""
                  type="number"
                  step={0.01}
                  {...register("tempoVelocidade")}
                  error={!!errors.tempoVelocidade}
                />
                <Input
                  label="Aceleração (m/s²)"
                  id=""
                  type="number"
                  step={0.01}
                  {...register("aceleracao")}
                  error={!!errors.aceleracao}
                />
                <Input
                  label="Força MMI"
                  id="mmi"
                  type="number"
                  step={0.01}
                  {...register("forcaMMI")}
                  error={!!errors.forcaMMI}
                />
                <Input
                  label="Força MMS"
                  id="mms"
                  type="number"
                  step={0.01}
                  {...register("forcaMMS")}
                  error={!!errors.forcaMMS}
                />
              </FormSection>
              <div className="row mb-3">
                <div className="col-lg-6">
                  <h3>Observações</h3>
                  <textarea
                    id="observations"
                    className="form-control"
                    {...register("observacoes")}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  {Object.keys(errors).length ? (
                    <span className={style.errorMessage}>
                      Preencha todos os campos corretamente!
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button
                    className="btn btn-primary me-3"
                    type="button"
                    onClick={() => navigate("/list")}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-primary">
                    {isEdit ? "Salvar" : "Cadastrar"}
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
