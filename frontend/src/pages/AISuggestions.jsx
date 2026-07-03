import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { getAISuggestion } from "../api/aiApi";

function AISuggestions() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading,setLoading]=useState(false);

  const [answer,setAnswer]=useState("");

  const handleAI = async()=>{

    try{

      setLoading(true);

      const res = await getAISuggestion({

        sport:user.sport,

        city:user.city,

        skillLevel:user.skillLevel

      });

      setAnswer(res.data.suggestion);

    }

    catch(error){

      console.log(error);

      alert("AI Error");

    }

    finally{

      setLoading(false);

    }

  }

  return(

    <>

    <Header/>

    <div className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-10">

          🤖 AI Sports Assistant

        </h1>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <button

          onClick={handleAI}

          className="bg-blue-600 text-white px-8 py-4 rounded-xl"

          >

            {loading ? "Thinking..." : "Generate AI Suggestions"}

          </button>

          <div className="mt-8 whitespace-pre-wrap leading-8">

            {answer}

          </div>

        </div>

      </div>

    </div>

    <Footer/>

    </>

  );

}

export default AISuggestions;