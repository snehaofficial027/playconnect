function DownloadApp() {
  return (
    <section className="bg-white py-20">

      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-10 shadow-2xl">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Left Side */}
            <div className="text-white">

              <h2 className="text-5xl font-bold mb-5">
                Download Mobile App
              </h2>

              <p className="text-lg text-blue-100 mb-6">
                Install PlayConnect on your mobile and connect with sports players anytime, anywhere.
              </p>

              <div className="space-y-3">

                <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl">
                  ⚡ Find Players Near You
                </div>

                <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl">
                  🏆 Join Matches & Tournaments
                </div>

                <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl">
                  💬 Chat With Sports Enthusiasts
                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="flex justify-center">

              <div className="bg-white p-6 rounded-3xl shadow-xl text-center">

                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://playconnect.com"
                  alt="QR Code"
                  className="mx-auto"
                />

                <p className="mt-4 text-slate-600 font-medium">
                  Scan QR Code
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DownloadApp;