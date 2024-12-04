import React, { useState, useEffect } from "react";

// HOC for feaching data

const FeachingData = (OldComponent, url) => {
  return function NewComponent(props) {
    const [data, setData] = useState([]);
    const [loading, setLoding] = useState(false);

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoding(true);
        })
        .catch((err) => console.error(err));
    }, [url]);

    return <OldComponent data={data} loading={loading} {...props} />;
  };
};

const User = ({ data, loading }) => {
  return (
    <div>
      {!loading ? (
        <p>loding...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FeachingUser = FeachingData(
  User,
  "https://jsonplaceholder.typicode.com/users"
);

function App() {
  return (
    <div className="App">
      <FeachingUser />
    </div>
  );
}

export default App;
