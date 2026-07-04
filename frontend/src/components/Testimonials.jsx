function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      sport: "Badminton Player",
      review: "Found badminton partners in just 2 days.",
    },
    {
      name: "Priya Patel",
      sport: "Football Player",
      review: "Amazing platform for local sports.",
    },
    {
      name: "Amit Verma",
      sport: "Cricket Player",
      review: "Easy to create matches and teams.",
    },
  ];

  return (
    <section className="bg-gray-100 py-14 sm:py-16 lg:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          What Players Say
        </h2>

        <p className="text-center text-slate-500 mt-4 text-base sm:text-lg">
          Trusted by thousands of sports enthusiasts across India.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 lg:mt-14">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="text-yellow-500 text-2xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-slate-600 leading-7">
                "{item.review}"
              </p>

              <div className="mt-6 border-t pt-4">

                <h3 className="font-bold text-lg text-slate-900">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.sport}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;