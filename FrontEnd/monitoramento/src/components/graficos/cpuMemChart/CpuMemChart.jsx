import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function CpuMemChart({ metricas }) {
  // 🔄 transforma seu JSON direto aqui dentro
  const data = (metricas || []).map((item) => ({
    time: new Date(item.coletadoEm).toLocaleTimeString(),
    cpu: item.cpuPercent,
    memoria: item.memoriaPercent,
  }));

  return (
    <div style={{ width: "100%", height: 300 , }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid vertical={false} strokeOpacity={0.08}  />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          

          {/* CPU */}
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
          />

          {/* MEMÓRIA */}
          <Line
            type="monotone"
            dataKey="memoria"
            stroke="#10B981"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
