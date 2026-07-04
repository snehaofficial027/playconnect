const features = [
  {
    icon: "👥",
    title: "Find Nearby Players",
    desc: "Search and connect with players near your location.",
  },
  {
    icon: "🤝",
    title: "Send Match Requests",
    desc: "Challenge players and invite them to play.",
  },
  {
    icon: "✅",
    title: "Accept / Reject Requests",
    desc: "Manage incoming requests easily.",
  },
  {
    icon: "💬",
    title: "Real-Time Chat",
    desc: "Chat instantly with players before matches.",
  },
  {
    icon: "🤖",
    title: "AI Player Suggestions",
    desc: "Get smart recommendations based on skill and location.",
  },
  {
    icon: "📍",
    title: "Venue Finder",
    desc: "Discover nearby grounds, courts and sports venues.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-14 sm:py-16 lg:py-24 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          Why Choose PlayConnect?
        </h2>

        <p className="text-center text-slate-500 mt-4 text-base sm:text-lg max-w-3xl mx-auto">
          Everything you need to find sports partners and play more games.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 lg:mt-16">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="text-5xl sm:text-6xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="text-slate-500 mt-4 text-sm sm:text-base leading-7">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturesSection;