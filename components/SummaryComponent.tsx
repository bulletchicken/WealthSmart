import React, { useState, useEffect } from "react";

const ChatArea = () => {
  const [topicKeys, setTopicKeys] = useState<string>(""); // New form state
  const [companySummary, setCompanySummary] = useState<string>("");
  const [sourcesFound, setSourcesFound] = useState<number>(0); // Final source count
  const [displayedSources, setDisplayedSources] = useState<number>(0); // Animated count
  const [loading, setLoading] = useState<boolean>(false); // State for loading status

  // Handle input changes for both fields
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicKeys(event.target.value);
  };

  const handleSummaryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCompanySummary(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/py/post_context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key_words: topicKeys, summary: companySummary }), // Include both inputs
      });

      if (response.ok) {
        const data = await response.json();
        setSourcesFound(data); // Set final source count
      } else {
        console.error("Error: API returned an error status.");
        setSourcesFound(0); // Default to 0 if an error occurs
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setSourcesFound(0);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Animate the count up when `sourcesFound` changes
  useEffect(() => {
    if (sourcesFound > 0) {
      let count = 0;
      const increment = Math.ceil(sourcesFound / 50); // Determine step size (50 steps)
      const interval = setInterval(() => {
        count += increment;
        if (count >= sourcesFound) {
          setDisplayedSources(sourcesFound); // Ensure it ends at the exact value
          clearInterval(interval);
        } else {
          setDisplayedSources(count);
        }
      }, 20); // 20ms per step for smooth animation

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [sourcesFound]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h3
        style={{
          color: "rgba(255, 255, 255, 0.5)",
          textAlign: "left",
        }}
      >
        AI models don't know everything on the news, so let's give it some newspapers about you! (A DIY RAG framework)
      </h3>
      {/* New form for company name */}
      <h1 style={{ fontSize: "1.3rem", textAlign: "left" }}>
        Describe your company in 1-3 generic keywords
      </h1>
      <input
        type="text"
        value={topicKeys}
        onChange={handleNameChange}
        placeholder="Social Media Influencer"
        style={{
          width: "90%",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          fontFamily: "'Arial', sans-serif",
          marginBottom: "20px",
        }}
      />

      {/* Existing form for company summary */}
      <h1 style={{ fontSize: "1.3rem", textAlign: "left" }}>
        (optional) Explain your business model
      </h1>
      <textarea
        value={companySummary}
        onChange={handleSummaryChange}
        placeholder="I make comedic TikTok and Youtube short videos..."
        rows={8}
        style={{
          width: "90%",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          resize: "none",
          fontSize: "1rem",
          fontFamily: "'Arial', sans-serif",
        }}
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !topicKeys} // Disable if any field is empty
        style={{
          padding: "10px 20px",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: loading || !topicKeys ? "not-allowed" : "pointer",
          fontSize: "1rem",
          transition: "background-color 0.3s ease",
          backgroundColor: loading || !topicKeys ? "#888" : "#f1d54e",
        }}
      >
        {loading ? "Loading..." : "Submit"}
      </button>

      {/* Display the sourcesFound below the forms */}
      {sourcesFound > 0 && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "left",
            color: "#28a745",
            
          }}
        >
          <div style={{ fontSize: "1.2rem" }}>🧠 Beefing up the AI with</div>
          <div
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
            }}
          >
            {displayedSources} {/* Animated count */}
          </div>
          <div style={{ fontSize: "1.2rem" }}>News Articles Found</div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;