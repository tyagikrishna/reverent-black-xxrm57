import React, { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login({ onSuccessfulLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      onSuccessfulLogin(userCredential.user.uid);
    } catch (err) {
      setError(err.message);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#F4F0FF",
      fontFamily: "system-ui, sans-serif",
    },
    card: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      width: "100%",
      maxWidth: "350px",
    },
    logo: {
      color: "#0F4C5C",
      fontSize: "32px",
      fontWeight: "bold",
      textAlign: "center",
      margin: "0 0 10px 0",
    },
    subtitle: {
      color: "#666",
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #e1e1e1",
      boxSizing: "border-box",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#0F4C5C",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    toggle: {
      color: "#FF8A65",
      cursor: "pointer",
      fontSize: "14px",
      marginTop: "20px",
      textAlign: "center",
      display: "block",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Mentisura</h1>
        <p style={styles.subtitle}>Welcome to your mental wellness journey</p>

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && (
            <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
              {error}
            </p>
          )}
          <button type="submit" style={styles.button}>
            {isRegistering ? "Create Account" : "Enter Dashboard"}
          </button>
        </form>

        <span
          style={styles.toggle}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Already have an account? Log In"
            : "Need an account? Sign Up"}
        </span>
      </div>
    </div>
  );
}
