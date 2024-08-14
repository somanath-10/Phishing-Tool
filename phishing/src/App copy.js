import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/temp")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return <div>

    {(
      typeof data.member === 'undefined') ?(
        <p>Loading ...</p>
      ): (
        data.member.map((m,i)=>{
         return <p key={i}> {m}</p>
        })
      )
    }
  </div>;
}

export default App;
