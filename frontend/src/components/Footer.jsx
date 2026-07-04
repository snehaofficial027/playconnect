import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-blue-500">
              🏆 PlayConnect
            </h2>

            <p className="text-slate-400 mt-4 leading-7">
              India's Smart Sports Partner Finder. Find players, book venues,
              join tournaments and grow your sports community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <div className="space-y-3">

              <Link
                to="/"
                className="block text-slate-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/venues"
                className="block text-slate-400 hover:text-white transition"
              >
                Venues
              </Link>

              <Link
                to="/players"
                className="block text-slate-400 hover:text-white transition"
              >
                Find Players
              </Link>

              <Link
                to="/tournaments"
                className="block text-slate-400 hover:text-white transition"
              >
                Tournaments
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-slate-400">

              <p>📧 support@playconnect.com</p>

              <p>📞 +91 98765 43210</p>

              <p>📍 Ahmedabad, Gujarat</p>

            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4 text-3xl">

              <a href="#" className="hover:scale-110 transition">
                📘
              </a>

              <a href="#" className="hover:scale-110 transition">
                📷
              </a>

              <a href="#" className="hover:scale-110 transition">
                🐦
              </a>

              <a href="#" className="hover:scale-110 transition">
                💼
              </a>

            </div>

          </div>

        </div>

        <hr className="my-8 border-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-center">

          <p>
            © 2026 <span className="font-semibold text-white">PlayConnect</span>.
            All Rights Reserved.
          </p>

          <p>
            Connect • Play • Grow
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;