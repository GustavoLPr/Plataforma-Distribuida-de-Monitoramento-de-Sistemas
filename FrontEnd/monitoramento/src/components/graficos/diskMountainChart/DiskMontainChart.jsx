import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DiskMountainChart({ metricas }) {
  const data = (metricas || []).map((item) => ({
    time: new Date(item.coletadoEm).toLocaleTimeString(),
    disco: item.discoPercent,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
         <CartesianGrid vertical={false} strokeOpacity={0.08} />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="disco"
            stroke="#F59E0B"
            fill="#F59E0B"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
