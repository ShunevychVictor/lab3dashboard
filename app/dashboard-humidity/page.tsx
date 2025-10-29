"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Reading {
  time: string;
  value: number;
}

export default function DashboardHumidityPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrlRaw = process.env.NEXT_PUBLIC_API_URL;
  // Remove trailing slash if present to avoid double-slash in requests
  const apiUrl = apiUrlRaw ? apiUrlRaw.replace(/\/+$/, "") : "";

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL не визначено. Перевір .env.local");
      setLoading(false);
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiUrl}/humidity-sensors`);
        if (!res.ok) throw new Error(`HTTP помилка: ${res.status}`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("API повернув невірний формат даних");
        }

        const formatted = data.map((item: Reading) => ({
          time: new Date(item.time).toLocaleTimeString("uk-UA", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          value: item.value,
        }));

        setReadings(formatted);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Невідома помилка при отриманні даних");
        console.error("Fetching data error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, [apiUrl]);

  if (loading) return <p>Завантаження даних...</p>;
  if (error) return <p className="text-red-500">Помилка: {error}</p>;

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={readings}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
