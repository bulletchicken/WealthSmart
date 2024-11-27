"use client";

import GraphComponent from "@/components/GraphComponent";
import Tabs from "@/components/TabsComponent";

const HomePage = () => {
  return (
    <div
      style={{
        margin: "0",
        backgroundColor: "#787aff",
        backgroundImage: `
          linear-gradient(to bottom, #486bed, #6583f0), 
          linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px), 
          linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 100px 100px, 100px 100px",
        backgroundBlendMode: "overlay",
        color: "#ffffff",
        fontFamily: "'Roboto', sans-serif",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "3%",
        maxHeight:"150vh"
      }}
    >
      {/* Header and Graph Section */}
      <div>
        <h1
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            marginLeft: "20px",
            fontSize: "50px",
            textAlign: "left",
            marginBottom: "10px",
            marginTop: "-3vh",
          }}
        >
          Your <span style={{ color: "#f1d54e" }}>Money,</span> <br />
          <span style={{ fontStyle: "italic" }}>At a Glance 👀</span>
        </h1>

        <div
          style={{
            background: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(2px)",
            borderRadius: "10px",
            padding: "10px",
            paddingTop: "1px",
            paddingBottom: "20px",
            width: "50vw",
            minHeight: "40vh",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <GraphComponent />
        </div>
      </div>

      {/* Tabs Section */}
      <div
        style={{
          borderRadius: "10px",
          minHeight: "40vh",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          display: "flex",
        }}
      >
        {/* Tab Navigation */}
        <Tabs/>
      </div>
    </div>
  );
};

export default HomePage;