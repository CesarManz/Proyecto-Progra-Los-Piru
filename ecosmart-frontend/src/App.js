import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/sensors')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="App">
      {data ? (
        <div>
          <h1>Datos del Sensor</h1>
          <p>Temperatura: {data.temperature}°C</p>
        </div>
      ) : <p>Cargando...</p>}
    </div>
  );
}

export default App;