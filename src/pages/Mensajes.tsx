import { useState, useEffect } from 'react';
import { Heart, Plus, Sparkles, ArrowLeft, Gift, Cake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Mensaje = {
  id: number;
  nombre: string;
  mensaje: string;
  fecha: string;
};

export default function Mensajes() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMensajes = async () => {
      const { data, error } = await supabase
        .from('mensajes')
        .select('*')
        .order('fecha', { ascending: false });
      if (error) {
        console.error('Error fetching messages:', error);
        alert('Ocurrió un error al cargar los mensajes: ' + error.message);
      }
      if (data) setMensajes(data);
      setLoading(false);
    };
    fetchMensajes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 py-12 px-4 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-16 left-10 text-gray-400 animate-bounce" size={40} />
        <Sparkles className="absolute top-32 right-20 text-blue-400 animate-pulse" size={30} />
        <Gift className="absolute bottom-24 left-1/4 text-purple-400 animate-bounce" style={{animationDelay: '0.5s'}} size={35} />
        <Cake className="absolute bottom-16 right-10 text-gray-300 animate-pulse" style={{animationDelay: '1s'}} size={45} />
        <div 
          className="absolute top-24 right-32 text-5xl animate-pulse opacity-70"
          style={{animationDuration: '2s'}}
        >
          🐦
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium">
            <ArrowLeft size={24} />
            <span>Volver al inicio</span>
          </Link>
          <Link to="/nuevo-mensaje" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg">
            <Plus size={24} />
            <span>Agregar mensaje</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <Sparkles className="mx-auto text-purple-600 mb-4 animate-pulse" size={50} />
          <h1 className="font-great-vibes text-5xl md:text-7xl text-gray-900 mb-2">
            Mensajes de cumpleaños
          </h1>
          <p className="text-2xl text-gray-700">
            Todos los mensajes para Danita! 🎉
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 py-20 text-xl font-medium">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              Cargando mensajes...
            </div>
          </div>
        ) : mensajes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-xl border-2 border-gray-100">
            <Heart className="mx-auto text-purple-400 mb-4" size={64} />
            <p className="text-2xl text-gray-600 mb-6 font-medium">¡Aún no hay mensajes!</p>
            <Link to="/nuevo-mensaje" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg">
              <Plus size={24} />
              <span>Ser el primero en dejar un mensaje</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {mensajes.map((m) => (
              <div key={m.id} className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 border-2 border-purple-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-full">
                    <Heart className="text-purple-600" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{m.nombre}</h3>
                </div>
                <p className="text-gray-700 mb-4 text-xl leading-relaxed">{m.mensaje}</p>
                {m.fecha && (
                  <p className="text-sm text-gray-500 font-medium">
                    {new Date(m.fecha).toLocaleString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-purple-900 text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <Heart className="text-purple-400 animate-pulse" size={40} />
            <Sparkles className="text-blue-400 animate-pulse" style={{animationDelay: '0.2s'}} size={40} />
            <Gift className="text-purple-400 animate-pulse" style={{animationDelay: '0.4s'}} size={40} />
          </div>
          <h3 className="font-great-vibes text-5xl md:text-6xl mb-4">
            ¡Feliz Cumpleaños Danita!
          </h3>
          <p className="text-xl opacity-90">
            Con todo mi amor, hoy y siempre.
          </p>
        </div>
      </footer>
    </div>
  );
}
