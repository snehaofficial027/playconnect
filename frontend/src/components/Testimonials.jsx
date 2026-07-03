function Testimonials() {
  return (
    <section className="bg-gray-100 py-16">

      <h2 className="text-4xl font-bold text-center mb-10">
        What Players Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6 px-10">

        <div className="bg-white p-6 rounded-xl shadow">
          ⭐⭐⭐⭐⭐
          <p className="mt-3">
            Found badminton partners in just 2 days.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          ⭐⭐⭐⭐⭐
          <p className="mt-3">
            Amazing platform for local sports.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          ⭐⭐⭐⭐⭐
          <p className="mt-3">
            Easy to create matches and teams.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Testimonials;