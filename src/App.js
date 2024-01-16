/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import List from "./components/List";
import { data } from "./assets/data";
import Chips from "./components/Chips";

function App() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userData, setUserData] = useState(data);
  const [highlightUser, setHighlightUser] = useState(null);
  const [userString, setUserString] = useState("");

  const inputRef = useRef();
  let flag = useRef(0);

  useEffect(
    function () {
      function handleClick(e) {
        if (inputRef.current && e.key === "Backspace" && !userString) {
          setHighlightUser(selectedUsers[selectedUsers.length - 1]);
          if (flag.current === 1) flag.current = 0;
          else flag.current = 1;

          if (highlightUser && flag.current === 0) {
            deleteUser(highlightUser);
            setHighlightUser(null);
          }
        }
      }

      document.addEventListener("keydown", handleClick);

      return () => document.removeEventListener("keydown", handleClick);
    },
    [selectedUsers, highlightUser]
  );

  function deleteUser(user) {
    setSelectedUsers((state) =>
      state.filter(
        (item) => item.name.toLowerCase() !== user.name.toLowerCase()
      )
    );

    setUserData((state) => {
      const found = state.find((item) => item.name === user.name);

      if (found) {
        return [user, ...state.filter((item) => item.name !== user.name)];
      }
      return [user, ...state];
    });
  }

  function selectUser(user) {
    setSelectedUsers((state) => [...new Set([...state, user])]);
    setUserData((state) =>
      state.filter(
        (item) => item.name.toLowerCase() !== user.name.toLowerCase()
      )
    );
  }

  return (
    <div className="w-[1200px] mx-auto min-h-svh bg-gray-50">
      <h1 className="text-center text-[3rem] text-blue-400">Pick Users</h1>

      <div className="flex flex-wrap items-center border-b-2 gap-2 py-2 border-blue-950">
        <Chips
          selectedUsers={selectedUsers}
          deleteUser={deleteUser}
          highlightUser={highlightUser}
        />

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
