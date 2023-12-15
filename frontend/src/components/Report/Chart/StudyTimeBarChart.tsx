import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const StudyTimeBarChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // コンポーネントがクライアントサイドでマウントされたことを示す
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // クライアントサイドでのみレンダリング
  }

  const data = [
    { month: "1月", studyHours: 20 },
    { month: "2月", studyHours: 25 },
    { month: "3月", studyHours: 22 },
    { month: "4月", studyHours: 26 },
    { month: "5月", studyHours: 28 },
    { month: "6月", studyHours: 30 },
    { month: "7月", studyHours: 32 },
    { month: "8月", studyHours: 35 },
    { month: "9月", studyHours: 60 },
    { month: "10月", studyHours: 35 },
    { month: "11月", studyHours: 28 },
    { month: "12月", studyHours: 30 },
  ];

  const targetStudyHours = 25; // 目標勉強時間

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 80, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor="var(--pink)" stopOpacity={0.4} />
            <stop
              offset="95%"
              stopColor="var(--main-color)"
              stopOpacity={0.6}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, "dataMax + 5"]} />
        <Tooltip />
        <Legend />
        <ReferenceLine
          y={targetStudyHours}
          label={{
            value: "目標",
            position: "right",
            style: {
              fill: "red",
              textAnchor: "start",
              fontSize: 14,
            },
          }}
          stroke="red"
        />
        <Area
          type="monotone"
          dataKey="studyHours"
          stroke="rgb(33, 150, 243)"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StudyTimeBarChart;
