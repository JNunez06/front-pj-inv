"use client";
import { useState } from "react";

export default function Home() {
  
  const [url, setUrl] = useState("");
  const [comentarios, setComentarios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", type: "success" });

  const ejecutarScraping = async () => {
    try {  
      setLoading(true);
      const res = await fetch("https://back-pj-inv.onrender.com/api/playstore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          quantity: 20,
        }),
      });

      if (!res.ok) throw new Error("Error en el scraping");
      
      setModal({
        show: true,
        message: "✅ Scraping ejecutado correctamente",
        type: "success"
      });
    } catch (error: any) { 
      setModal({
        show: true,
        message: "❌ Error: " + error.message,
        type: "error"
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setModal(prev => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  const cargarComentarios = async () => {
    setLoading(true);

    const res = await fetch(
      "https://back-pj-inv.onrender.com/api/comments"
    );
    const data = await res.json();

    setComentarios(data.data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-300">
      <div className="text-center relative">
        
        {modal.show && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            modal.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white transition-all duration-500 transform translate-y-0`}>
            {modal.message}
          </div>
        )}

        <h1 className="text-3xl font-bold">
          Scraping para comentarios de aplicaciones de Play store🚀
        </h1>
        <h1 className="text-1xl ">
          Link de aplicacion🚀
        </h1>
        <input 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          className="w-full h-10 p-2 border border-gray-300 rounded mt-4" 
          placeholder="Ingrese el link de la aplicación aquí..."
        />
        <button 
          onClick={ejecutarScraping} 
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Enviar
        </button>

        <button  
          onClick={cargarComentarios} 
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Extraer json
        </button>

        {loading && <p className="mt-4">Cargando...</p>}

        {comentarios.length > 0 && (
        <div className="mt-6">
          {/* Contenedor con altura fija y scroll */}
          <div className="max-h-64 overflow-y-auto border-2 border-black">
            <table className="w-full bg-white">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border-b-2 border-black px-4 py-2 text-left">#</th>
                  <th className="border-b-2 border-black px-4 py-2 text-left">Comentario</th>
                </tr>
              </thead>
              <tbody>
                {comentarios.map((comentario, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border-b border-black px-4 py-2 font-medium">
                      {index + 1}
                    </td>
                    <td className="border-b border-black px-4 py-2">
                      {comentario}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            
            <p className="mt-2 text-sm text-gray-600">
              Total de comentarios: {comentarios.length}
            </p>
          </div>
        )}

        {comentarios.length === 0 && !loading && (
          <div className="mt-6 p-4 border-2 border-black bg-white">
            <p className="text-gray-600">No hay comentarios aún. Haz clic en Extraer json para cargarlos.</p>
          </div>
        )}
        
      </div>
    </main>
  );
}