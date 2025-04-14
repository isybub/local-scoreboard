import React, { useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import './style.css'
function Frontend() {
    
    //Public API that will echo messages sent to it back to the client
    const [socketUrl, setSocketUrl] = useState('ws://localhost:8080');
    const [teamsAndPoints, setTeamsAndPoints] = React.useState([{name: "default", points:0, id:0}]);
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    useEffect(() => {
        if(lastMessage != null){
            const toRender = JSON.parse(lastMessage.data).filter((each) => each.name.length != 0);
            setTeamsAndPoints([...toRender]);
        }
    }, [lastMessage]);



    return (
        <div id="scoreboard">
            {
                teamsAndPoints.map((input) =>  (
                <div key={input.name} id="teamContainer">
                    <div id="teamName">{input.name}</div>
                    <div id="teamPoints">{input.points}</div>
                </div>
                
                ))
            }

        </div>
    )
}

export default Frontend;