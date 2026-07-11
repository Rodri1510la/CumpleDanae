import { useState } from 'react';
import { Send, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function NuevoMensaje() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !mensaje.trim()) return;
    setLoading(true);

    const { error } = await supabase.from('mensajes').insert([{ nombre, mensaje }]);
    if (error) {
      console.error('Error inserting message:', error);
      alert('Ocurrió un error al enviar el mensaje: ' + error.message);
      setLoading(false);
      return;
    }
    
    setShowSuccess(true);
    setNombre('');
    setMensaje('');
    setLoading(false);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {showSuccess && (
          <div className="mb-8 p-4 bg-green-100 border-2 border-green-400 rounded-2xl text-green-800 text-center">
            <p className="text-xl font-bold">¡Mensaje enviado con éxito! 🎉</p>
            <p className="text-sm mt-2">Gracias por tu mensaje para Danita!</p>
          </div>
        )}

        <div className="text-center mb-8">
          <Heart className="mx-auto text-purple-500 mb-4" size={40} />
          <h1 className="font-great-vibes text-5xl md:text-6xl text-gray-900 mb-2">
            Deja tu mensaje
          </h1>
          <p className="text-xl text-gray-600">
            ¡Escribe un mensaje de cumpleaños para Danita! 🎉
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Tu nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="¿Cómo te llamas?"
            />
          </div>
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Tu mensaje para Danita</label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-vertical min-h-[200px] transition-colors"
              placeholder="Escribe aquí tu mensaje de cumpleaños..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
