import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function MachineRadarChart({ mediaGeral, maquinaSelecionada }) {
  const data = [
    {
      metrica: "CPU",
      maquina: maquinaSelecionada.cpuPercent,
      media: mediaGeral.cpuPercent,
    },
    {
      metrica: "Memória",
      maquina: maquinaSelecionada.memoriaPercent,
      media: mediaGeral.memoriaPercent,
    },
    {
      metrica: "Disco",
      maquina: maquinaSelecionada.discoPercent,
      media: mediaGeral.discoPercent,
    },
  ];

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />

          <PolarAngleAxis dataKey="metrica" />

          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{
              fontSize: 0,
              fill: "#64748b",
            }}
          />

          <Radar
            name="Máquina"
            dataKey="maquina"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.4}
          />

          <Radar
            name="Média Geral"
            dataKey="media"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.5}
            strokeDasharray="5 5"
          />

          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
