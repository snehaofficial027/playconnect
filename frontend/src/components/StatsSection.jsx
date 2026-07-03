function StatsSection() {
  return (
    <section className="bg-blue-600 text-white py-20">

      <div className="grid md:grid-cols-4 gap-10 text-center">

        <div>
          <h1 className="text-6xl font-bold">10K+</h1>
          <p className="text-xl mt-2">Players</p>
        </div>

        <div>
          <h1 className="text-6xl font-bold">500+</h1>
          <p className="text-xl mt-2">Matches</p>
        </div>

        <div>
          <h1 className="text-6xl font-bold">100+</h1>
          <p className="text-xl mt-2">Venues</p>
        </div>

        <div>
          <h1 className="text-6xl font-bold">50+</h1>
          <p className="text-xl mt-2">Cities</p>
        </div>

      </div>

    </section>
  );
}

export default StatsSection;    