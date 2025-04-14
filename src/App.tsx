// Frontend code 
// Filename - App.js
// Filename - App.js

import React, { useState } from 'react'
function App() {
    const [name, setName] = useState("");
    const [teamsAndPoints, setTeamsAndPoints] = useState([{name: "default", points:0, id:0}]);

    const handleUpdate = async (toSend) => {
      console.log(JSON.stringify(toSend))
      let result = await fetch(
      'http://localhost:5000/update', {
          method: "post",
          body: JSON.stringify(toSend),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      result = await result.json();
      console.log(result)
  }

    const handleNameChange = async (e, element) => {
      const toName = e.target.value;
      let toOutput = teamsAndPoints;
      toOutput[element].name = toName;
      toOutput = toOutput.filter((team) => team.name.length != 0);
      toOutput = toOutput.map((team, index) => {return {name: team.name, points: team.points, id: index}});
      if(toOutput.pop.name.length != 0){
        toOutput.push({name:"", points:0, id:toOutput.length})
      }
      setTeamsAndPoints(toOutput)
      handleUpdate(toOutput);
    }

    const addPoint = async (e, id) => {
      e.preventDefault()
      let toOutput = teamsAndPoints;
      toOutput[id].points++;
      setTeamsAndPoints([...toOutput]);
      handleUpdate(toOutput);
    }
    const takePoint = async (e, id) => {
      e.preventDefault()
      let toOutput = teamsAndPoints;
      toOutput[id].points--;
      setTeamsAndPoints([...toOutput]);
      handleUpdate(toOutput);
    }

    return (
        <>
            <form action="">
                {
                  teamsAndPoints.map((input) =>  (
                    <div>
                      <input type="text" placeholder="name" 
                    value={input.name} onChange={(e) => handleNameChange(e, input.id)} />
                      {input.points}
                      <button onClick={(e) => addPoint(e, input.id)}> + </button>
                      <button onClick={(e) => takePoint(e, input.id)}> - </button>
                    </div>
                    
                  ))
                }
            </form>

        </>
    );
}

export default App;
