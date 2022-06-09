import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha esse campo!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
      console.log(response.data);
    } catch {
      alert("ops");
      setInput("");
    }
  }

  const localidade = cep.localidade ? `${cep.localidade} - ${cep.uf}` : "";

  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2>{cep.cep}</h2>
        <span>{cep.logradouro}</span>

        {cep.complemento && <span>{cep.complemento}</span>}

        <span>{cep.bairro}</span>

        <span>{localidade}</span>
      </main>

)}
    </div>
  );
}


export default App;
