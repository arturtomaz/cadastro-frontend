import "./style.css";
import api from "../../services/api";
import { useEffect, useRef, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/users");
    setUsers(usersFromApi.data);
  }
  async function createUsers() {
    const icon = document.querySelector(".loading-icon");
    icon.style.display = "flex";
    const usersFromApi = await api.get("/users");
    if (usersFromApi.data.length > 9) {
      icon.style.display = "none";
      setTimeout(() => {
        alert(
          "O sistema suporta no máximo 10 usuários. Tente excluir algum para adicionar um novo."
        );
      }, 100);
    } else if (
      !(
        inputName.current.value &&
        inputAge.current.value &&
        inputEmail.current.value
      )
    ) {
      icon.style.display = "none";
      setTimeout(() => {
        alert("Preencha todos os campos para adicionar um usuário!");
      }, 100);
    } else {
      await api.post("/users", {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      });

      getUsers();

      inputName.current.value = "";
      inputAge.current.value = "";
      inputEmail.current.value = "";

      icon.style.display = "none";
      setTimeout(() => {
        alert("Usuário cadastrado com sucesso!");
      }, 100);
    }
  }
  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      createUsers();
    }
  }

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input onKeyDown={handleKeyPress} type="text" name="nome" placeholder="Nome" ref={inputName} />
        <input onKeyDown={handleKeyPress} type="number" name="idade" placeholder="Idade" ref={inputAge} />
        <input onKeyDown={handleKeyPress} type="email" name="email" placeholder="Email" ref={inputEmail} />
        <button onClick={createUsers} type="button">
          Cadatrar-se
        </button>
      </form>

      <div
        className="loading-icon"
        style={{
          display: "none",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "35px",
            height: "35px",
            border: "4px solid #ccc",
            borderTop: "4px solid #8B8AE1",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      </div>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>{" "}
            </p>
            <p>
              Idade:{" "}
              <span>
                {user.age}
                {user.age > 1 ? " anos" : " ano"}
              </span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
