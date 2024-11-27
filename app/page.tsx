'use client';
import { useRouter } from 'next/navigation';
import { useState } from "react";


const Page = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");
  const router = useRouter();

  // Fetch function now uses the state `url` from the form input
  const fetchData = async () => {
    try {
      const response = await fetch("/api/py/post_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // Use the `url` passed as argument
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message); // Set the message from the backend
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("An error occurred while fetching data.");
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(); // Pass the `url` from state to fetchData
    router.push('/dashboard');
  };

  return (
    <div
      style={{
        margin:"0",
        minHeight: "100vh",
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ 
        marginTop:"-10vh",
        marginBottom: "0px", 
        fontSize: "80px", 
        maxWidth: "60%", 
        color: "#ffffff", 
        textAlign: "center"
      }}>
        <span style ={{textDecoration: "line-through", textDecorationThickness: "10px"}}> <span style={{ color: "#f1d54e", textDecorationThickness: "10px"}}>Wealth</span> Simple?</span><br/>
        <span style={{ color: "#f1d54e" }}> Wealth </span> 
        <span style={{ color: "#ffffff" }}> Smart.</span>
      </h1>
      <b style={{marginBottom: "10px"}}>
        A Quanto Christmas Project Speed Run🎄
      </b>
      
      {/* Display message returned from FastAPI */}
      <p
        style={{
          background: "rgba(0, 64, 128, 0.8)", // Slightly transparent background
          backdropFilter: "blur(2px)", // Frosted glass effect
          WebkitBackdropFilter: "blur(2px)", // For Safari support
          padding: "10px 20px",
          borderRadius: "5px",
          maxWidth: "500px",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)", // Add a soft shadow
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='rgba(255,255,255,0.05)'/%3E%3Ccircle cx='25' cy='25' r='4' fill='rgba(255,255,255,0.08)'/%3E%3Ccircle cx='75' cy='75' r='4' fill='rgba(255,255,255,0.08)'/%3E%3Ccircle cx='50' cy='50' r='2' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`, // Subtle texture
          backgroundSize: "cover", // Scale the texture
        }}
      >
        {message || "Let's see that income statement!"}
      </p>

      {/* Form with input field */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#002f4f",
            padding: "20px",
            borderRadius: "10px",
            width: "450px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid #0066cc",
              borderRadius: "5px",
              overflow: "hidden", // Ensures the input and button look seamless
              backgroundColor: "#003366",
            }}
          >
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Google Sheets URL"
              required
              style={{
                flex: 1,
                backgroundColor: "#003366",
                color: "white",
                border: "none",
                padding: "12px",
                fontSize: "16px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "12px 20px",
                backgroundColor: "#e9c959",
                color: "white",
                border: "none",
                borderRadius: "0px", // Removed radius for a seamless design
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                width:"120px",
                transition: "background-color 0.2s ease, transform 0.4s ease", // Smooth transi
              }}
            
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#bf9f3d";
                e.currentTarget.style.transform = "scale(1.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#e9c959";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;