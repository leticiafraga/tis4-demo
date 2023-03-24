import { Atleta, Historico } from "../../requests/RegisterAthleteRequest";
import style from "./viewAthlete.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import Input from "../../components/input/Input";
import {
  FilterDate,
  HistoricoKeys,
  historicoKeys,
  historicoKeysDisplay,
  SelectOption,
} from "../../helpers/const";
import { useForm } from "react-hook-form";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ViewAthlete() {
  const location = useLocation();
  const [athlete, setAthlete] = useState<Atleta>();
  const [displayHistorico, setDisplayHistorico] = useState<Historico[]>();
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [option, setOption] = useState<SelectOption>({
    display: "IMC",
    value: "imc",
  });

  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: {},
  } = useForm<FilterDate>();

  const [endDate, startDate] = watch(["endDate", "startDate"]);

  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Histórico",
        data,
        backgroundColor: "#008080d8",
      },
    ],
  };
  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: option.display,
        font: { size: 20 },
      },
    },
  };

  useEffect(() => {
    const a: Atleta = location?.state?.athlete;
    if (!a) {
      navigate("/list");
      return;
    }
    setAthlete(a);
    const historico = a.historico.slice();
    historico.map(
      (h) =>
        (h.ultimaAtualizacao = new Date(h.ultimaAtualizacao.toDateString()))
    );
    setDisplayHistorico(historico);
  }, []);

  useEffect(() => {
    setChart(option.value);
  }, [displayHistorico]);

  function onChangeChart(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as HistoricoKeys;
    const index = historicoKeys.indexOf(value);
    setOption({
      display: historicoKeysDisplay[index],
      value,
    });
    setChart(e.target.value as HistoricoKeys);
  }

  function setChart(prop: HistoricoKeys) {
    const l: string[] = [];
    const data: number[] = [];
    displayHistorico?.map((h) => {
      l.push(h.ultimaAtualizacao.toLocaleDateString("pt-br"));
      //@ts-ignore
      data.push(h[prop]);
    });
    setLabels(l);
    setData(data);
  }

  function dateHasError() {
    return !!(
      startDate?.length > 0 &&
      endDate?.length > 0 &&
      startDate > endDate
    );
  }

  function onChangeDate(
    field: "startDate" | "endDate",
    e: ChangeEvent<HTMLInputElement>
  ) {
    setValue(field, e.target.value);
    handleSubmit(filterByDate)();
  }

  function filterByDate(data: FilterDate) {
    const fim = data.endDate ? new Date(data.endDate) : "";
    const inicio = data.startDate ? new Date(data.startDate) : "";
    fim ? fim.setDate(fim.getDate() + 1) : "";

    const h = athlete?.historico?.filter((h) => {
      return (
        (inicio ? h.ultimaAtualizacao >= inicio : true) &&
        (fim ? h.ultimaAtualizacao <= fim : true)
      );
    });
    setDisplayHistorico(h);
  }

  return (
    <main className={style.main}>
      <div className="row justify-content-between">
        <div className="col-12 col-md-9">
          <h1>{athlete?.nome}</h1>
        </div>
        <div className="col-12 col-md-3 text-md-end">
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/edit", {
                state: { athlete },
              })
            }
          >
            Atualizar
          </button>
        </div>
      </div>
      <div className="row">
        <div className={"d-flex align-items-center " + style.filter}>
          <div>
            <div className="filter-text">Propriedade</div>

            <select
              className={"form-select " + style.select}
              id="historico"
              onChange={onChangeChart}
            >
              {historicoKeys.map((prop, i) => (
                <option key={prop} value={prop}>
                  {historicoKeysDisplay[i]}
                </option>
              ))}
            </select>
          </div>

          <div className="ms-3">
            <div className="filter-text">Data de início</div>
            <div>
              <Input
                {...register("startDate")}
                onChange={(e) => onChangeDate("startDate", e)}
                type="date"
                error={dateHasError()}
              />
            </div>
          </div>
          <div className="ms-3">
            <div className="filter-text ">Data final</div>
            <div>
              <Input
                {...register("endDate")}
                onChange={(e) => onChangeDate("endDate", e)}
                type="date"
                error={dateHasError()}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 col-12 col-md-8 offset-md-2">
          <Bar options={options} data={chartData} />
        </div>
        <div className="col-12">
          <div className="col-12 mt-5">
            <div className={style.table}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Históricos</th>
                    <th>Atualização</th>
                  </tr>
                </thead>
                <tbody>
                  {displayHistorico?.map((h, index) => (
                    <tr
                      key={index}
                      className={style.history}
                      onClick={() =>
                        navigate(`/history/${index}`, {
                          state: { athlete, historico: h },
                        })
                      }
                    >
                      <td>{h.observacoes}</td>
                      <td>{h.ultimaAtualizacao.toLocaleDateString("pt-br")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
