import { Link } from "react-router-dom";

function UICustomisation() {
  return (
    <div>
        <Link
          to="/customisation"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Start
        </Link>
        <p>Yo family.</p>
    </div>
  )
}
export default UICustomisation;
