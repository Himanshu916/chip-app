function Chips({ selectedUsers, deleteUser, highlightUser }) {
  return (
    <div className="flex flex-wrap gap-2">
      {selectedUsers.length > 0 &&
        selectedUsers.map((user) => (
          <div
            key={user.email}
            className={`bg-gray-200 items-center flex gap-1 px-3 py-1 rounded-full ${
              highlightUser?.name.toLowerCase() === user.name.toLowerCase() &&
              "bg-red-300 "
            } `}
          >
            <img
              className="w-6 rounded-full"
              src={user.avatar}
              alt={user.name}
            />
            <p className="text-xs text-gray-600">{user.name}</p>
            <button onClick={() => deleteUser(user)} className="text-lg">
              &times;
            </button>
          </div>
        ))}
    </div>
  );
}

export default Chips;
