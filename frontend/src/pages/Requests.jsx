import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  getRequests,
  acceptRequest,
} from "../api/connectionApi";

function Requests() {

  const [requests, setRequests] =
    useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {

      const res =
        await getRequests();

      setRequests(
        res.data.requests
      );

    } catch (error) {

      console.log(error);

    }
  };

  const handleAccept =
    async (id) => {

      try {

        await acceptRequest(id);

        alert(
          "Request Accepted ✅"
        );

        loadRequests();

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-green-50 py-8 sm:py-10 lg:py-12 px-4 sm:px-6">

        <div className="max-w-6xl mx-auto">

          {/* Heading */}

          <div className="text-center mb-10">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">

              Match Requests

            </h1>

            <p className="text-slate-500 mt-3 text-sm sm:text-lg">

              Accept requests and connect with players

            </p>

          </div>

          {requests.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center">

              <div className="text-6xl sm:text-7xl mb-4">
                📭
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">

                No Requests Yet

              </h2>

              <p className="text-slate-500 mt-3">

                When someone sends you a request,
                it will appear here.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

              {requests.map((req) => (

                <div
                  key={req._id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                >

                  {/* Banner */}

                  <div className="h-24 bg-gradient-to-r from-blue-600 to-green-500"></div>

                  <div className="p-6 -mt-12">

                    <img
                      src={
                        req.sender?.profileImage ||
                        `https://ui-avatars.com/api/?name=${req.sender?.name}`
                      }
                      alt=""
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white mx-auto object-cover"
                    />

                    <div className="text-center mt-4">

                      <h2 className="text-xl sm:text-2xl font-bold text-slate-800">

                        {req.sender?.name}

                      </h2>

                      <p className="text-slate-500 mt-1">

                        📍 {req.sender?.city || "City Not Added"}

                      </p>

                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mt-4">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                        {req.sender?.sport || "Sport"}

                      </span>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        {req.sender?.skillLevel || "Level"}

                      </span>

                    </div>

                    <p className="text-center text-gray-600 mt-5 min-h-[50px] text-sm sm:text-base">

                      {req.sender?.bio ||
                        "Sports enthusiast looking to connect."}

                    </p>

                    <button
                      onClick={() =>
                        handleAccept(req._id)
                      }
                      className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition"
                    >

                      ✅ Accept Request

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Requests;