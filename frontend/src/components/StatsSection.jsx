function StatsSection() {
  return (
    <section className="bg-blue-600 text-white py-14 sm:py-16 lg:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center">

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              10K+
            </h1>

            <p className="text-base sm:text-lg lg:text-xl mt-2">
              Players
            </p>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              500+
            </h1>

            <p className="text-base sm:text-lg lg:text-xl mt-2">
              Matches
            </p>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              100+
            </h1>

            <p className="text-base sm:text-lg lg:text-xl mt-2">
              Venues
            </p>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              50+
            </h1>

            <p className="text-base sm:text-lg lg:text-xl mt-2">
              Cities
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default StatsSection;