export default function Land() {
  return (
    <div
      style={{
        overflow: "hidden",  // Prevent scrollbars from showing
      }}
    >
      <h1
        style={{
          color: "rgba(255, 255, 255, 1)",
          marginLeft: "20px",
          fontSize: "50px",
          textAlign: "center",
        }}
      >
        Let's get <span style={{ color: "#f1d54e" }}>Rich 💸</span> <br />
      </h1>

      <h2
        style={{
          margin: "40px",
        }}
      >
        <span style={{ fontSize: "40px" }}>Step 1.</span>
        <br /> → Tell us about yourself. <br />
        <br />
        <img
          src="/how-it-works.gif"
          style={{ borderRadius: "10px", width: "260px" }}
        />
      </h2>
    </div>
  );
}