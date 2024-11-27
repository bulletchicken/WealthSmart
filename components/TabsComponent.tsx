"use client";

import { useState } from "react";
import GetStarted from "@/components/GetStarted";
import ChatArea from "@/components/SummaryComponent";
import Simulation from "@/components/SimulationComponent";
import Insights from "@/components/InsightsComponent";

export default function Tabs() {
    const [activeTab, setActiveTab] = useState(0);

    // Define the components for each tab
    const tabs = [
        { title: "Get Started", icon: "🚀", component: <GetStarted /> },
        { title: "Context", icon: "💬", component: <ChatArea /> },
        { title: "Insights", icon: "📄", component: <Insights /> },
        { title: "Simulation", icon: "📊", component: <Simulation /> },
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%", // Ensures the component adapts to its container height
                maxHeight: "100vh", // Prevent overflow in the viewport
                borderRadius: "10px",
                background: "rgba(0, 0, 0, 0.8)", // Add a container background
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                overflow: "hidden", // Avoid overflow for content
                width:"40vw"
            }}
        >
            {/* Tab Navigation */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.1)",
                    padding: "10px",
                    borderRadius: "10px 10px 0 0",
                }}
            >
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        style={{
                            padding: "10px 15px",
                            background: activeTab === index ? "#f1d54e" : "transparent",
                            color: activeTab === index ? "#000" : "#fff",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "10px",
                            boxShadow:
                                activeTab === index
                                    ? "0 4px 6px rgba(0, 0, 0, 0.2)"
                                    : "none",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: "16px",
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* Active Tab Content */}
            <div
                style={{
                    flex: "1",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflowY: "auto", // Scrollable for large content
                    background: "rgba(255, 255, 255, 0.05)",
                }}
            >
                {tabs[activeTab].component}
            </div>

            {/* Footer Navigation Buttons */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 20px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "0 0 10px 10px",
                }}
            >
                <button
                    onClick={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
                    style={{
                        padding: "10px 20px",
                        background: activeTab === 0 ? "#ccc" : "#f1d54e",
                        color: "#000",
                        border: "none",
                        cursor: activeTab === 0 ? "not-allowed" : "pointer",
                        borderRadius: "5px",
                    }}
                >
                    ← Back
                </button>
                <button
                    onClick={() =>
                        setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1))
                    }
                    style={{
                        padding: "10px 20px",
                        background: activeTab === tabs.length - 1 ? "#ccc" : "#f1d54e",
                        color: "#000",
                        border: "none",
                        cursor:
                            activeTab === tabs.length - 1 ? "not-allowed" : "pointer",
                        borderRadius: "5px",
                    }}
                >
                    Next  →
                </button>
            </div>
        </div>
    );
}