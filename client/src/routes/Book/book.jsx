import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function book() {
  const baseUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        let url = baseUrl;
        if (selectedCategory) {
          url += `?category=${selectedCategory}`
        }
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);
  return (
    <div>
      <h1>Books</h1>
      <p>Here lies the books I want to read!</p>
      <div className="filters">
        <label>Categories</label>
        <select onChange={(e)=>setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="crime">Crime</option>
          <option value="food">Food</option>
          <option value="adventure">Adventure</option>
          <option value="thriller">Thriller</option>
          <option value="fiction">Fiction</option>
          <option value="other">Other</option>
        </select>
      </div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : fetchError ? (
        <p>{fetchError}</p>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img
                  src={`http://localhost:8000/uploads/${item.thumbnail}`}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default book;
