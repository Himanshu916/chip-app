// import { data } from "../assets/data";

function List({ onSelectingUser, userSearchString, data }) {
  const filterData = data.filter(
    (user) =>
      user.name
        .toLocaleLowerCase()
        .includes(userSearchString.toLocaleLowerCase()) ||
      user.email
        .toLocaleLowerCase()
        .includes(userSearchString.toLocaleLowerCase())
  );

  return (
    <ul className="absolute top-8 left-0 rounded-md  w-96 h-56 overflow-y-scroll bg-[#fff]">
      {filterData.map((user) => {
        return (
          <li
            key={user.name}
            onClick={() => {
              onSelectingUser(user);
            }}
            className="flex cursor-pointer justify-between items-center px-3 py-2 hover:bg-gray-200 mb-1 text-sm"
          >
            <div className="flex gap-2 items-center">
              <img
                className="w-8 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
              <p>{user.name}</p>
            </div>

            <p className="text-xs text-gray-400">{user.email}</p>
          </li>
        );
      })}
    </ul>
  );
}
export default List;
