import { useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

function AI() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const getSuggestion = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await axios.post(

        "http://localhost:5000/api/ai/suggestion",

        {

          sport: user.sport,

          city: user.city,

          skillLevel: user.skillLevel,

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      setResult(response.data);

    }

    catch(error){

      console.log(error);

      alert("AI Error");

    }

    finally{

      setLoading(false);

    }

  };

  return (

    <>

      <Header/>

      <div className="min-h-screen bg-slate-100 p-10">

        <div className="max-w-6xl mx-auto">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h1 className="text-4xl font-bold text-center mb-8">

              🤖 Smart AI Sports Recommendation

            </h1>

            <button

              onClick={getSuggestion}

              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold w-full"

            >

              {loading ?

              "Generating..."

              :

              "Generate AI Suggestions"}

            </button>

            {

              result &&

              <>

                <h2 className="text-3xl font-bold mt-10 mb-5">

                  🏆 Best Matching Players

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  {

                    result.players.map(

                      (player,index)=>(

                        <div

                        key={index}

                        className="border rounded-2xl p-6 shadow"

                        >

                          <h2 className="text-2xl font-bold">

                            {player.name}

                          </h2>

                          <p>

                            📍 {player.city}

                          </p>

                          <p>

                            🏏 {player.sport}

                          </p>

                          <p>

                            ⭐ {player.skillLevel}

                          </p>

                          <p className="mt-3 font-bold text-green-600">

                            Compatibility :

                            {player.score}%

                          </p>

                          <div className="w-full bg-gray-300 rounded-full h-3 mt-2">

                            <div

                            className="bg-green-500 h-3 rounded-full"

                            style={{

                              width:

                              `${player.score}%`

                            }}

                            >

                            </div>

                          </div>

                        </div>

                      )

                    )

                  }

                </div>

                <div className="bg-slate-900 text-white rounded-3xl p-8 mt-10 whitespace-pre-line">

                  <h2 className="text-3xl font-bold mb-5">

                    🤖 AI Coach Advice

                  </h2>

                  {result.suggestion}

                </div>

              </>

            }

          </div>

        </div>

      </div>

      <Footer/>

    </>

  );

}

export default AI;