import React, { useContext, useEffect } from "react";
import { UserScore } from '../component/userscore'
import "../../styles/Ranking.css"
import { Winners_cuate } from "../../img/Winners_cuate.png"
import { Context } from "../store/appContext";


export const Ranking = () => {

  const { store, actions} = useContext(Context);
  

   useEffect(() => {
      if (!localStorage.getItem("token")) {
      navigate("/")
  }
          actions.getRanking();
      }, []);

      console.log(store.ranking)
  return (
    <div className="ranking-wrap">
      <div className='ranking-img-header'>
        <img src="Winners_cuate.png" style={{ width:'150px' }}/>        
      </div>
      <div className="ranking-box-cont">
      <div className='ranking-box'>
        {
        store.ranking.map((user) => {
          return(
            <UserScore 
              key={`${user.id} + ${user.name}`}
              name={user.first_name}
              city={user.city}
              score={user.score}
            />
          )
        
        })
        }
        <UserScore/>
        <UserScore/>
        <UserScore/>
        <UserScore/>
        <UserScore/>
        </div>
    </div>
  </div>
  )
}