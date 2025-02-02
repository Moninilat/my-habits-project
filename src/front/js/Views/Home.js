import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { SmallHabit } from "../component/smallhabit";
import { HabitCard } from "../component/habitcard";
import { NewHabitCard } from "../component/newhabitcard";
import { User } from "../component/user";
import { UserScore } from "../component/userscore";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
        actions.getHabits();
        actions.getUser();
        actions.getUserHabits();
        actions.getRanking();
    }, []);

    return (
            <div className="containerr">
              {/* Sección Ranking con carrusel */}
              <section className="carousel-section">
                <h2>Ranking</h2>
                <div className="carousel ranking-carousel">
                  {store.ranking.map((user) => (
                    <UserScore
                      key={`${user.id}-${user.name}`}
                      name={user.first_name}
                      city={user.city}
                      score={user.score}
                    />
                  ))}
                </div>
              </section>
        
             
        
              {/* Sección Habits*/}
              <section className="small-habits-section">
                <h2>Pequeños Hábitos</h2>
                <div className="small-habits">
                  {store.habits.map((habit, index) => (
                    <SmallHabit key={index} habit={habit} />
                  ))}
                </div>
              </section>

               {/* Sección user_habits */}
               <section className="carousel-section">
                <h2>Mis Hábitos</h2>
                <div className="carousel habits-carousel">
                  {store.user_habits && store.user_habits.length > 0 ? (
                    store.user_habits.map((user_habit, index) => (
                      <HabitCard key={index} user_habit={user_habit} />
                    ))
                  ) : (
                    <div className="no-habits">¡Empieza a añadir tus hábitos!</div>
                  )}
                </div>
              </section>
            </div>
          );
        
}
