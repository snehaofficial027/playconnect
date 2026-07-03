const features = [
  {
    icon: "👥",
    title: "Find Nearby Players",
    desc: "Search and connect with players near your location."
  },
  {
    icon: "🤝",
    title: "Send Match Requests",
    desc: "Challenge players and invite them to play."
  },
  {
    icon: "✅",
    title: "Accept / Reject Requests",
    desc: "Manage incoming requests easily."
  },
  {
    icon: "💬",
    title: "Real-Time Chat",
    desc: "Chat instantly with players before matches."
  },
  {
    icon: "🤖",
    title: "AI Player Suggestions",
    desc: "Get smart recommendations based on skill and location."
  },
  {
    icon: "📍",
    title: "Venue Finder",
    desc: "Discover nearby grounds, courts and sports venues."
  }
];

function FeaturesSection() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-slate-900">
          Why Choose PlayConnect?
        </h2>

        <p className="text-center text-slate-500 mt-4">
          Everything you need to find sports partners and play more games.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="text-slate-500 mt-4">
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