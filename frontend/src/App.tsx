import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const API_URL = 'http://localhost:4000/api';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const fetchHistoricalData = async (coin: string, days: number) => {
  const response = await axios.get(`${API_URL}/historical`, {
    params: { coin, days }
  });
  return response.data;
};

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [historicalData, setHistoricalData] = useState<[string, number][]>([]);

  const getCachedData = (coin: string) => {
    const cacheKey = `${coin}_historicalData`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const isCacheValid = (Date.now() - timestamp) < CACHE_DURATION;
      if (isCacheValid) {
        return data;
      }
    }
    return null;
  };

  const setCachedData = (coin: string, data: [string, number][]) => {
    const cacheKey = `${coin}_historicalData`;
    const cacheValue = { data, timestamp: Date.now() };
    localStorage.setItem(cacheKey, JSON.stringify(cacheValue));
  };

  useEffect(() => {
    const getData = async () => {
      const cachedData = getCachedData(selectedCoin);
      if (cachedData) {
        setHistoricalData(cachedData);
      } else {
        try {
          const data = await fetchHistoricalData(selectedCoin, 30);
          setHistoricalData(data);
          setCachedData(selectedCoin, data);
        } catch (error) {
          console.error('Error fetching historical data:', error);
        }
      }
    };
    getData();
  }, [selectedCoin]);

  const chartData = {
    labels: historicalData.map(data => data[0]), // Date strings for labels
    datasets: [
      {
        label: `${selectedCoin} Price`,
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: historicalData.map(data => ({ x: data[0], y: data[1] })), // Use x and y for date and price
      }
    ],
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cryptocurrency Dashboard</h1>
        <select
            className="p-2 border border-gray-300 rounded mb-4"
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="solana">Solana</option>
          <option value="tether">Tether</option>
        </select>
        <div className="bg-white p-4 rounded shadow">
          <Line data={chartData}/>
        </div>
      </div>
  );
};

export default App;
