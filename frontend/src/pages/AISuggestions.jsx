import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAISuggestion } from "../api/aiApi";

function AISuggestions() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [answer, setAnswer] = useState("");

  const handleAI = async () => {

    try {

      setLoading(true);

      const res = await getAISuggestion({

        sport: user.sport,

        city: user.city,

        skillLevel: user.skillLevel,

      });

      setAnswer(res.data.suggestion);

    } catch (error) {

      console.log(error);

      alert("AI Error");

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-green-50 px-4 sm:px-6 py-10">

        <div className="max-w-5xl mx-auto">

          <div className="text-center">

            <h1 className="text-3xl sm:text-5xl font-bold">

              🤖 AI Sports Assistant

            </h1>

            <p className="text-slate-500 mt-3">

              Personalized recommendations based on your profile.

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl mt-10 p-6 sm:p-8">

            <div className="flex justify-center">

              <button

                onClick={handleAI}

                disabled={loading}

                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold transition"

              >

                {loading ? "🤖 Thinking..." : "Generate AI Suggestions"}

              </button>

            </div>

            {answer && (

              <div className="mt-8 bg-slate-50 border rounded-2xl p-6">

                <h2 className="text-2xl font-bold mb-4">

                  AI Recommendation

                </h2>

                <div className="whitespace-pre-wrap leading-8 text-slate-700">

                  {answer}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default AISuggestions;