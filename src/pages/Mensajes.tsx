import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Plus } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </Link>
          <Link to="/nuevo-mensaje" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
            <Plus size={20} />
            <span>Agregar mensaje</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <Heart className="mx-auto text-purple-500 mb-4" size={40} />
          <h1 className="font-great-vibes text-5xl md:text-6xl text-gray-900 mb-2">
            Mensajes de cumpleaños
          </h1>
          <p className="text-xl text-gray-600">
            Todos los mensajes para Danita! 🎉
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-12">Cargando mensajes...</div>
        ) : mensajes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
            <p className="text-lg text-gray-500 mb-4">¡Aún no hay mensajes!</p>
            <Link to="/nuevo-mensaje" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300">
              <Plus size={20} />
              <span>Ser el primero en dejar un mensaje</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {mensajes.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="text-purple-500" size={20} />
                  <h3 className="text-xl font-bold text-gray-900">{m.nombre}</h3>
                </div>
                <p className="text-gray-700 mb-3 text-lg leading-relaxed">{m.mensaje}</p>
                <p className="text-sm text-gray-400">
          {new Date(m.fecha || Date.now()).toLocaleString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
