import React, { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import useFirebase from "../../hooks/useFirebase";
import {
  filterByAge,
  filterByName,
  getAge,
  getIMC,
} from "../../helpers/calculateAttributes";
import { Atleta } from "../../requests/RegisterAthleteRequest";
import style from "./dashboard.module.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import {
  HistoricoKeys,
  historicoKeys,
  historicoKeysDisplay,
  SelectOption,
} from "../../helpers/const";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const firebase = useFirebase();
  const [athletes, setAthletes] = useState<(Atleta & { age: number })[]>([]);
  const [filteredAthletes, setFilteredAthletes] = useState<
    (Atleta & { age: number })[]
  >([]);
  const [data, setData] = useState<{ label: string; value: number }[][]>([]);
  const [chartData, setChartData] = useState<ChartData<"bar">[]>([]);
  const [options, setOption] = useState<ChartOptions[]>([]);

  useEffect(() => {
    setAthletesData();
  }, [filteredAthletes]);

  function setAthletesData() {
    const newData: { label: string; value: number }[][] = [];
    const mappedAthletes = filteredAthletes?.map((athlete) => {
      const h = athlete.historico[athlete.historico.length - 1];
      h.velocidade = h.distanciaVelocidade / h.tempoVelocidade;
      return { nome: athlete.nome, h };
    });
    historicoKeys.forEach((key) => {
      const c: { label: string; value: any }[] = [];
      mappedAthletes?.map((athlete) => {
        c.push({ label: athlete.nome, value: athlete.h[key] ?? 0 });
      });
      c.sort((a, b) => a.value - b.value);

      newData.push(c);
    });
    console.log(newData);

    setData(newData);
    loadChartData(newData);
  }

  function loadChartData(data: { label: string; value: number }[][]) {
    const chartData: ChartData<"bar">[] = [];
    const options: ChartOptions[] = [];
    data.forEach((chart, i) => {
      chartData.push({
        labels: chart.map((d) => d.label),
        datasets: [
          {
            label: "Histórico",
            data: chart.map((d) => d.value),
            backgroundColor: "#008080d8",
          },
        ],
      });
      options.push({
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: historicoKeysDisplay[i],
            font: { size: 20 },
          },
        },
      });
    });
    setChartData(chartData);
    setOption(options);
  }

  useEffect(() => {
    getAtletas();
  }, []);

  async function getAtletas() {
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

  function filterAthletesAge(e: React.ChangeEvent<HTMLInputElement>) {
    setFilteredAthletes(filterByAge(athletes, parseInt(e.target.value)));
  }

  function filterAthletesName(e: React.ChangeEvent<HTMLInputElement>) {
    setFilteredAthletes(filterByName(athletes, e.target.value));
  }

  return (
    <main>
      <div className="row">
        <div className="col-12">
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className={"d-flex align-items-center " + style.filter}>
        <div className="ms-3">
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
        {chartData.map((chart, i) => (
          <div className="col col-md-6 mt-2">
            <Bar options={options[i]} data={chart} />
          </div>
        ))}
      </div>
    </main>
  );
}
