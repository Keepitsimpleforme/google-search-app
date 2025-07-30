// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";
// import { searchGoogle } from "./GoogleSearch"; 

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!query.trim()) return;
  
//     console.log("Search started for:", query);
//     setLoading(true);
//     try {
//       const results = await searchGoogle(query);
//       setResults(results.slice(0, 5));
//       console.log("Results fetched:", results);
//     } catch (err) {
//       console.error("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-6 font-sans">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-2xl">
//         <h2 className="text-3xl font-semibold text-blue-700 mb-4">
//           Welcome, {user?.username} 
//         </h2>

//         <button
//           onClick={logout}
//           className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
//         >
//           Logout
//         </button>

//         <div className="flex gap-3 items-center mb-6">
//           <input
//             className="flex-grow border-2 border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Search something awesome..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
//             type="button"
//           >
//             Search
//           </button>
//         </div>

//         {loading && (
//           <div className="flex justify-center items-center">
//             <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             <span className="ml-2 text-blue-700">Searching...</span>
//           </div>
//         )}

//         <div className="space-y-4">
//           {results.map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-blue-50 hover:bg-blue-100 border border-blue-200 p-4 rounded-xl shadow-sm transition"
//             >
//               <a
//                 href={item.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-lg font-medium text-blue-700 underline"
//               >
//                 {item.title}
//               </a>
//               <p className="text-gray-700 mt-1">{item.snippet}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { searchGoogle } from "./GoogleSearch";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchGoogle(query);
      setResults(results.slice(0, 5));
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex flex-col items-center px-4 py-10 font-sans">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center bg-white p-6 rounded-3xl shadow-md mb-10">
        <h2 className="text-2xl font-bold text-blue-700">
          Welcome, {user?.username || "Guest"} 👋
        </h2>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          Logout
        </button>
      </header>

      {/* Search Box */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search something awesome..."
          className="flex-grow border border-blue-300 rounded-xl px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-md w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="mt-8 flex items-center justify-center space-x-3 text-blue-700 text-base font-medium">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Searching...</span>
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="w-full max-w-3xl mt-10 space-y-5">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 border-gray-200">
            Top Results
          </h3>
          {results.map((item, idx) => (
            <div
              key={idx}
              className="bg-blue-50 hover:bg-blue-100 transition-all border border-blue-200 p-5 rounded-2xl shadow-sm"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-700 hover:underline block"
              >
                {item.title}
              </a>
              <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                {item.snippet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;