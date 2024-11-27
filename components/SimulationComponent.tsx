import React, { useState } from "react";

// Function to format the response dynamically
const formatResponse = (text: string) => {
  let formattedText = text.replace(/###\s(.+)/g, "<h3>$1</h3>");
  formattedText = formattedText.replace(/^(\d+)\.\s(.+)$/gm, "<li>$2</li>");
  formattedText = formattedText.replace(/<li>/, "<ol><li>");
  formattedText = formattedText.replace(
    /<\/li>(?![\s\S]*<\/li>)/,
    "</li></ol>"
  );
  formattedText = formattedText.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  formattedText = formattedText.replace(/\*(.+?)\*/g, "<i>$1</i>");
  formattedText = formattedText.replace(/\n/g, "<p></p>");
  return formattedText;
};

const Simulation = () => {
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    if (!question) return;

    setLoading(true);
    setError(null);
    try {
      const url = new URL("http://localhost:8000/api/gpt_simulation");
      url.searchParams.append("prompt", question);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error: Unable to get a response from the server");
      }
      const result = await response.json();

      setResponse(result.response);
    } catch (err: any) {
      setError(err.message || "Error: Unable to get a response from the server");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const blob = new Blob([response], { type: "text/plain" });
    element.href = URL.createObjectURL(blob);
    element.download = "financial_simulation_analysis.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div
      style={{
        margin: "0",
        color: "#ffffff",
        fontFamily: "'Roboto', sans-serif",
        display: "flex",
        justifyContent: "center",
        padding: "3%",
        gap: "20px",
      }}
    >
      <div
        style={{
          padding: "20px",
          width: "100%",
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: "rgba(255, 255, 255, 1)",
            marginBottom: "20px",
            fontSize: "30px",
            textAlign: "center",
          }}
        >
          Financial Simulation
        </h1>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="What if I lower the salaries by 20%?"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            color: "#000",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#ffd700",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "calculating every alternative timeline..." : "Run Simulation"}
        </button>

        {loading && (
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="/calculating.gif"
              alt="Loading..."
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        )}

        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
            {error}
          </p>
        )}

        {response && (
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "10px",
              color: "#ffffff",
            }}
          >
            <h3>Analysis:</h3>
            <div
              style={{
                padding: "10px",
                borderRadius: "4px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "#ffffff",
                maxHeight: "300px", // Limit the height of the content
                overflowY: "auto", // Add scroll bar if content exceeds maxHeight
              }}
              dangerouslySetInnerHTML={{ __html: formatResponse(response) }}
            ></div>

            {/* Download Button with Circle and Custom Icon */}
            <button
              onClick={handleDownload}
              style={{
                backgroundColor: "#ffd700",
                border: "none",
                borderRadius: "50%",
                padding: "20px",
                fontSize: "24px",
                color: "#000",
                cursor: "pointer",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/download-icon.png" // Path to your download icon
                alt="Download"
                style={{ width: "30px", height: "30px" }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulation;