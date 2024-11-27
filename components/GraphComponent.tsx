"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";


type GraphData = {
  [key: string]: string[];
};

const LineChart = () => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>(["Net Income"]);
  const [expenseTitles, setExpenseTitles] = useState<string[]>([]);
  const [revenueTitles, setRevenueTitles] = useState<string[]>([]);

  // Fetch graph data
  useEffect(() => {
    fetch("http://localhost:8000/api/get_data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setGraphData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Fetch expense and revenue titles
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const [expenseRes, revenueRes] = await Promise.all([
          fetch("http://localhost:8000/api/expense_titles").then((res) =>
            res.json()
          ),
          fetch("http://localhost:8000/api/revenue_titles").then((res) =>
            res.json()
          ),
        ]);
        setExpenseTitles(expenseRes);
        setRevenueTitles(revenueRes);
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };

    fetchTitles();
  }, []);

  const handleDatasetChange = (dataset: string) => {
    setSelectedDatasets((prev) =>
      prev.includes(dataset)
        ? prev.filter((item) => item !== dataset) // Remove if already selected
        : [...prev, dataset] // Add if not selected
    );
  };

  if (!graphData) return <div>Loading...</div>;

  // Process selected datasets
// Automatically include all datasets in the main graph
const datasets = Object.keys(graphData).map((dataset) => {
  const data = graphData[dataset]
    .slice(0, graphData[dataset].length - 1) // Remove the last value (total)
    .map((value) => parseFloat(value.replace(/[^0-9.-]+/g, ""))); // Parse to numbers

  // Determine the graph color
  const getColor = () => {
    if (expenseTitles.includes(dataset)) {
      return {
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
      };
    } else if (revenueTitles.includes(dataset)) {
      return {
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
      };
    }
    return {
      backgroundColor: "rgba(201, 203, 207, 0.2)",
      borderColor: "rgb(201, 203, 207)",
    };
  };

  const { backgroundColor, borderColor } = getColor();

  return {
    label: dataset,
    data,
    fill: true,
    backgroundColor,
    borderColor,
    tension: 0.4,
    hidden: dataset !== "Sales" && dataset !== "Salaries & Wages",  // Hide datasets other than "Sales"
  };
});

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    datasets,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: "#FFFFFF", // Y-axis tick color
          callback: (value: number) => {
            return value.toLocaleString();
          },
        },
      },
      x: {
        ticks: {
          color: "#FFFFFF", // X-axis tick color
        },
      },
    },
    plugins: {
      legend: {
        onClick: (e, legendItem, legend) => {
          const chart = legend.chart;
          const datasetIndex = legendItem.datasetIndex;
          const dataset = chart.data.datasets[datasetIndex];
  
          // Toggle the hidden state of the dataset
          dataset.hidden = !dataset.hidden;
  
          // Update the color of the legend text based on visibility
          legendItem.fontColor = dataset.hidden ? "#ccc" : "#FFFFFF"; // Grey for hidden, white for visible
  
          chart.update();
        },
        labels: {
          usePointStyle: true, // Optional: use point style for legends
          font: {
            size: 14,
          },
          generateLabels: (chart) => {
            return chart.data.datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor,
              fontColor: dataset.hidden ? "#016aaa" : "#FFFFFF", // Set text color based on visibility
              datasetIndex: i,
            }));
          },
        },
      },
      animation: {
        duration: 500, // smooth transition duration
        easing: "easeInOutQuad", // easing function for smoothness
      },
    },
  };

  return (
    <div

    >
<div>

  {/* Dropdowns for selecting datasets */}
  <div
    style={{
      marginBottom: "20px",
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {/*
    <select
      style={{
        padding: "10px 20px",
        backgroundColor: "#002f4f",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.2s ease",
      }}
      onChange={(e) => handleDatasetChange(e.target.value)}
      multiple
    >
      {revenueTitles.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>

    <select
      style={{
        padding: "10px 20px",
        backgroundColor: "#bf3d5e",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.2s ease",
      }}
      onChange={(e) => handleDatasetChange(e.target.value)}
      multiple
    >
      {expenseTitles.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>

      */}

  </div>

  {/* Main Graph */}
  <div
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      width: "90%",
      height: "45vh",
      margin: "0 auto",
    }}
  >
    <Line data={data} options={options} />
  </div>

  {/* Mini-graphs */}
  <div
    style={{
      display: "flex",
      gap: "20px",
      marginTop: "20px",
      justifyContent: "center",
      
    }}
  >
    {["Gross Profit", "Sales", "Total Operating Expenses"].map((dataset) => {
      const miniData = {
        labels: [
          "Q1",
          "Q1",
          "Q1",
          "Q2",
          "Q2",
          "Q2",
          "Q3",
          "Q3",
          "Q3",
          "Q4",
          "Q4",
          "Q4"
        ],
        datasets: [
          {
            label: dataset,
            data: graphData[dataset]?.slice(0, graphData[dataset].length - 1).map((value) =>
              parseFloat(value.replace(/[^0-9.-]+/g, ""))
            
            ),
            fontColor: "#ffffff",
            fill: true,
            backgroundColor:
              dataset === "Gross Profit"
                ? "rgba(10, 256, 10, 0.8)"
                : dataset === "Total Operating Expenses"
                ? "rgba(255, 99, 132, 0.8)"
                : "rgba(50, 200, 207, 0.8)",
            borderColor:
              dataset === "Sales"
                ? "rgb(75, 192, 192)"
                : dataset === "Total Operating Expenses"
                ? "rgb(255, 99, 132)"
                : "rgb(201, 203, 207)",
            tension: 0.4,
          },
        ],
      };

      return (
        <div
          key={dataset}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            height:"40%",
            width: "26%",
          }}
        >
          <Bar
            data={miniData}
            options={{
              scales: {
                y: {
                  ticks: {
                    color: "#FFFFFF", // X-axis tick color
                  },
                  beginAtZero: false,
                },
                x: {
                  ticks: {
                    color: "#FFFFFF", // X-axis tick color
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: "#ffffff"
                  }
                }
              }
            }}
          />
        </div>
      );
    })}
  </div>
</div>
    </div>
  );
};

export default LineChart;