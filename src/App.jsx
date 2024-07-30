import { useState, useEffect } from "react";
import Pagination from "./Components/Pagination";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="app">
      <h1>User List</h1>
      <ul className="user-list">
        {currentItems.map((user) => (
          <li key={user.id} className="user-item">
            <h2>{user.name}</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>
            <p>
              <strong>Company:</strong> {user.company.name}
            </p>
            <p>
              <strong>Address:</strong>
            </p>
            <ul>
              <li>
                <strong>Street:</strong> {user.address.street}
              </li>
              <li>
                <strong>Suite:</strong> {user.address.suite}
              </li>
              <li>
                <strong>City:</strong> {user.address.city}
              </li>
              <li>
                <strong>Zipcode:</strong> {user.address.zipcode}
              </li>
              <li>
                <strong>Geo:</strong>
                Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
              </li>
            </ul>
          </li>
        ))}
      </ul>
      <Pagination
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
