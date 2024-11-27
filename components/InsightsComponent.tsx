import React, { useState } from "react";

const formatResponse = (text: string) => {
  // Replace headers starting with ### into <h3>
  let formattedText = text.replace(/###\s(.+)/g, "<h3>$1</h3>");

  // Format numbered lists (e.g., 1. Item) into <ol>
  formattedText = formattedText.replace(/^(\d+)\.\s(.+)$/gm, "<li>$2</li>");
  formattedText = formattedText.replace(/<li>/, "<ol><li>"); // Start <ol> for the first list item
  formattedText = formattedText.replace(
    /<\/li>(?![\s\S]*<\/li>)/,
    "</li></ol>"
  ); // End <ol> after the last list item

  // Format bold text (e.g., **bold**)
  formattedText = formattedText.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");

  // Format italic text (e.g., *italic*)
  formattedText = formattedText.replace(/\*(.+?)\*/g, "<i>$1</i>");

  // Replace newlines with <p> for paragraphs
  formattedText = formattedText.replace(/\n/g, "<p></p>");

  // Return formatted text
  return formattedText;
};

const Insights = () => {
  const [insights, setInsights] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null); // Reset error before fetch

    try {
      const url = new URL("http://localhost:8000/api/py/gpt_trends");
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
      console.log(result);
      setInsights(result.response);
    } catch (err) {
      setError(
        (err as Error).message || "Error: Unable to get a response from the server"
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadInsights = () => {
    const blob = new Blob([insights], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "insights.txt";
    link.click();
  };

  return (
    <div
      style={{
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
            marginBottom: "20px",
            fontSize: "30px",
            textAlign: "center",
          }}
        >
          Trends & Insights
        </h1>

        <button
          onClick={fetchInsights}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            color: "#000",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#ffd700",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          disabled={loading}
        >
          {loading ? "Doing airflares to analyze data..." : "Begin Analyzing"}
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
              src="/page-loader.gif"
              alt="Loading..."
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "20px",
              }}
            />
          </div>
        )}

        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
            {error}
          </p>
        )}

        {insights && (
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "10px",
              color: "#ffffff",
            }}
          >
            <h3>Insights:</h3>
            <div
              style={{
                padding: "10px",
                borderRadius: "4px",
                maxHeight: "300px",  // Limiting height
                overflowY: "auto",   // Enable scroll if content overflows
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "#ffffff",
              }}
              dangerouslySetInnerHTML={{ __html: formatResponse(insights) }}
            ></div>
            <button
              onClick={downloadInsights}
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
              {/* Use the image from the public folder */}
              <img
                src="/download-icon.png" // Ensure this path matches the location of your image
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

export default Insights;