import "./style.css";
import api from "../../services/api";
import { useEffect, useRef, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()  

  async function getUsers() {
    const usersFromApi = await api.get("/users");
    setUsers(usersFromApi.data);
  }
  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });

    getUsers();

    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";
    
    alert('Usuário cadastrado com sucesso!')
  }
  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input type="text" name="nome" placeholder="Nome" ref={inputName} />
        <input type="number" name="idade" placeholder="Idade" ref={inputAge} />
        <input type="email" name="email" placeholder="Email" ref={inputEmail} />
        <button onClick={createUsers} type="button">Cadatrar-se</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>{" "}
            </p>
            <p>
              Idade: <span>{user.age} anos</span>
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
