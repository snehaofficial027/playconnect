function DownloadApp() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left Side */}
            <div className="text-white">

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Download PlayConnect App
              </h2>

              <p className="text-base sm:text-lg text-blue-100 mb-8 leading-7">
                Install PlayConnect on your mobile and connect with sports
                players anytime, anywhere.
              </p>

              <div className="space-y-4">

                <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl text-sm sm:text-base">
                  ⚡ Find Players Near You
                </div>

                <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl text-sm sm:text-base">
                  🏆 Join Matches & Tournaments
                </div>

                <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl text-sm sm:text-base">
                  💬 Chat With Sports Enthusiasts
                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="flex justify-center">

              <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-xl text-center w-full max-w-sm">

               <img
  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    "https://playconnect-oh39.vercel.app"
  )}`}
  alt="QR Code"
  className="mx-auto w-44 h-44 sm:w-56 sm:h-56 object-contain"
/>

<a
  href="https://playconnect-oh39.vercel.app"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
>
  🌐 Open Website
</a>
                <p className="mt-4 text-slate-600 font-semibold text-base sm:text-lg">
                  Scan QR Code
                </p>

                <p className="text-slate-500 text-sm mt-2">
                  Install PlayConnect App
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