"use client"
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const apiEndpoint = 'https://taste-trios-back-end.vercel.app/api/neo4j-data';

  function runQuery() {
    console.log('Running a query');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiEndpoint);
    xhr.onload = function () {
      if (xhr.status === 200) {
        setResult(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <button onClick={runQuery}>
        Run a query
      </button>
      <div>
        {result && (
          <div>
            <h2>Query Result</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
