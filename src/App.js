/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import List from "./components/List";
import { data } from "./assets/data";
import Chips from "./components/Chips";

function App() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState(data);
  const inputRef = useRef(null);

  useEffect(
    function () {
      if (selectedUser === null) return;
      setUserData((state) =>
        state.filter(
          (user) => user.name.toLowerCase() !== selectedUser.name.toLowerCase()
        )
      );
    },
    [selectedUser]
  );

  const [userString, setUserString] = useState("");

  function deleteUser(user) {
    setSelectedUsers((state) =>
      state.filter(
        (item) => item.name.toLowerCase() !== user.name.toLowerCase()
      )
    );
    setUserData((state) => [user, ...state]);
  }

  function selectUser(user) {
    setSelectedUsers((state) => [...state, user]);
    setSelectedUser(user);
  }

  return (
    <div className="w-[1200px] mx-auto min-h-svh bg-gray-100">
      <h1 className="text-center text-[3rem] text-blue-400">Pick Users</h1>

      <div className="flex flex-wrap items-center border-b-2 gap-2 py-2 border-blue-950">
        <Chips selectedUsers={selectedUsers} deleteUser={deleteUser} />

        <div className="relative">
          <input
            ref={inputRef}
            className="px-2 bg-transparent border-0 outline-none"
            placeholder="Add new user..."
            type="text"
            name=""
            id=""
            value={userString}
            onChange={(e) => {
              setUserString(e.target.value);
            }}
          />
          <List
            data={userData}
            onSelectingUser={selectUser}
            userSearchString={userString}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
