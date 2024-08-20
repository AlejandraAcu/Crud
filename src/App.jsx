import { useEffect, useState } from "react";
import "./App.css";
import useCrud from "./hooks/useCrud";
import UserCard from "./components/UserCard";
import FormUser from "./components/FormUser";

function App() {
  const [users, getUsers, createUsers, deleteUsers, updatedUsers] =
    useCrud("/users/");

  const [userSelected, setUserSelected] = useState();
  const [formIsOpen, setFormIsOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpenForm = () => {
    setFormIsOpen(true);
  };

  return (
    <div className="app">
      <header className="user__header">
        <h1 className="">Users Crud</h1>
        <button onClick={handleOpenForm} className="new__user__btn">
          New User +
        </button>
      </header>
      <FormUser
        createUsers={createUsers}
        userSelected={userSelected}
        setUserSelected={setUserSelected}
        updatedUsers={updatedUsers}
        setFormIsOpen={setFormIsOpen}
        formIsOpen={formIsOpen}
      />
      <section className="user__container flex-container">
        {users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            deleteUsers={deleteUsers}
            setUserSelected={setUserSelected}
            setFormIsOpen={setFormIsOpen}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
