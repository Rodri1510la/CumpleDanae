import { Heart, Gift, Sparkles, Star, Music, X, Play, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const photos = [
  '/images/yo_y_danita.jpeg',
  '/images/comida_juntos_1.jpeg',
  '/images/comida_juntos2.jpeg',
  '/images/flores_amarillas_para_danae.jpeg',
  '/images/fogata_en_la_playa.jpeg',
  '/images/lirios.jpg',
];

const thingsILove = [
  "Tu forma de ver el lado positivo de la vida",
  "Tu risa que es contagiosa",
  "Tu bondad y generosidad",
  "Lo mucho que amas a Snoopy",
  "Cómo me haces sentir especial",
  "Tu amor por los Lirios 🌺",
  "Tu pasión por Siddhartha & Morat 🎶",
  "Tu amor por la playa 🏖️",
  "Tu ternura con los perritos 🐕",
  "Tu gusto por la mayonesa 😄",
];

export default function Home() {
  const [surprise, setSurprise] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Cuenta regresiva hasta el 16 de julio de 2026 a las 00:00
  const targetDate = new Date('2026-07-16T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isCountdownOver, setIsCountdownOver] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsCountdownOver(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    return () => clearInterval(interval);
  }, []);

  const handleConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6B7280', '#3B82F6', '#8B5CF6', '#1F2937']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6B7280', '#3B82F6', '#8B5CF6', '#1F2937']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setSurprise(!surprise);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Para desarrollo: cambia a true para saltarte la cuenta regresiva
  const SKIP_COUNTDOWN = false;
  
  // Si la cuenta regresiva no ha terminado, mostramos la pantalla de espera
  if (!isCountdownOver && !SKIP_COUNTDOWN) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 flex items-center justify-center p-4">
        <div className="text-center">
          <Heart className="mx-auto text-purple-600 mb-6 animate-pulse" size={80} />
          <h1 className="font-great-vibes text-5xl md:text-7xl text-gray-900 mb-4">
            ¡Preparando la sorpresa!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Faltan poco para el cumpleaños de Danita! 🎉
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 min-w-[100px]">
              <div className="text-4xl font-bold text-blue-600">{timeLeft.days}</div>
              <div className="text-gray-500">Días</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 min-w-[100px]">
              <div className="text-4xl font-bold text-purple-600">{timeLeft.hours}</div>
              <div className="text-gray-500">Horas</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 min-w-[100px]">
              <div className="text-4xl font-bold text-blue-600">{timeLeft.minutes}</div>
              <div className="text-gray-500">Minutos</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 min-w-[100px]">
              <div className="text-4xl font-bold text-purple-600">{timeLeft.seconds}</div>
              <div className="text-gray-500">Segundos</div>
            </div>
          </div>
          <img 
            src="/images/snoopy_cool.png" 
            alt="Snoopy" 
            className="mx-auto w-48 animate-bounce opacity-80"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Audio Element */}
      <audio ref={audioRef} src="/music/Siddhartha-Únicos-_Letra_.mp3" loop />

      {/* Floating Music Player */}
      <div className="fixed bottom-4 right-4 z-50 bg-white rounded-full shadow-2xl p-4 flex items-center gap-3 border-2 border-gray-200">
        <button 
          onClick={toggleMusic}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        {isPlaying && (
          <div className="text-sm font-semibold text-gray-700">
            Siddhartha & Morat 🎶
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Recuerdo" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 z-0">
        {/* Floating icons, Snoopy, Lilies and Beach elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-20 left-10 text-gray-400 animate-bounce" size={40} />
          <Star className="absolute top-40 right-20 text-blue-400 animate-pulse" size={30} />
          <Gift className="absolute bottom-32 left-1/4 text-purple-400 animate-bounce" style={{animationDelay: '0.5s'}} size={35} />
          <Sparkles className="absolute bottom-20 right-10 text-gray-300 animate-pulse" style={{animationDelay: '1s'}} size={45} />
          {/* Floating Snoopy Image */}
          <img 
            src="/images/snoopy_cool.png" 
            alt="Snoopy" 
            className="absolute bottom-24 left-10 w-32 animate-bounce opacity-80"
            style={{animationDuration: '3s'}}
          />
          {/* Woodstock emoji as a backup! */}
          <div 
            className="absolute top-24 right-32 text-5xl animate-pulse opacity-70"
            style={{animationDuration: '2s'}}
          >
            🐦
          </div>
          {/* Floating Lily Images */}
          <img 
            src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=200&auto=format&fit=crop" 
            alt="Lirio" 
            className="absolute top-32 left-20 w-24 rounded-full shadow-lg animate-pulse"
            style={{animationDuration: '4s'}}
          />
          <img 
            src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=200&auto=format&fit=crop" 
            alt="Lirio" 
            className="absolute bottom-40 right-20 w-20 rounded-full shadow-lg animate-bounce"
            style={{animationDuration: '3.5s'}}
          />
          {/* Beach elements */}
          <div className="absolute top-16 right-1/4 text-yellow-500 animate-pulse" style={{animationDuration: '2.5s'}}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute bottom-32 right-1/4 text-cyan-600 animate-bounce" style={{animationDuration: '2.8s'}}>
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.98 14H22V12H20C18.69 12,17.58 11.17,17.17 10H6.83C6.42 11.17,5.31 12,4 12H2V14H2.02C2.14 14.94,2.55 15.82,3.19 16.56L2 18L3.41 19.41L5 18C6.47 19.25,8.4 20,10.5 20H13.5C15.6 20,17.53 19.25,19 18L20.59 19.41L22 18L20.81 16.56C21.45 15.82,21.86 14.94,21.98 14Z" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="mb-6">
            <Sparkles className="mx-auto text-purple-600 mb-4" size={60} />
            <h1 className="font-great-vibes text-6xl md:text-8xl text-gray-900 mb-4">
              Feliz Cumpleaños
            </h1>
            <h2 className="font-great-vibes text-5xl md:text-7xl text-blue-600 mb-4">
              Danita
            </h2>
            <div className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg">
              <Sparkles size={24} />
              <span className="text-xl font-bold">¡26 años increíbles!</span>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-12 mt-8 leading-relaxed">
            Hoy es tu día, el día en que el mundo se iluminó con tu llegada. 
            Te deseo todo lo hermoso que la vida tiene para ofrecer.
          </p>

          <button 
            onClick={handleConfetti}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Gift size={24} />
            Abrir Sorpresa
          </button>
        </div>
      </section>

      {/* Surprise Message */}
      {surprise && (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Heart className="mx-auto text-purple-500 mb-6 animate-pulse" size={50} />
            <h3 className="font-great-vibes text-5xl text-gray-900 mb-6">
              ¡Te amo más de lo que las palabras pueden decir!
            </h3>
            <p className="text-xl text-gray-700">
              Eres mi sol, mi luna y todas mis estrellas. Que este día sea tan especial como tú lo eres para mí.
            </p>
          </div>
        </section>
      )}

      {/* Things I Love About You Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-great-vibes text-5xl md:text-6xl text-center text-gray-900 mb-12">
            Cosas que amo de ti
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {thingsILove.map((thing, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
              >
                <Heart className="mx-auto text-blue-500 mb-4" size={32} />
                <p className="text-lg font-semibold text-gray-700">
                  {thing}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-great-vibes text-5xl md:text-6xl text-center text-gray-900 mb-12">
            Nuestros Momentos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo} 
                  alt={`Momento ${index + 1}`} 
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-6 text-lg font-semibold">
                    Un recuerdo para siempre ❤️
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guestbook Call to Action Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="mx-auto text-purple-500 mb-6" size={60} />
          <h2 className="font-great-vibes text-5xl md:text-6xl text-gray-900 mb-4">
            Danita, lee aquí los mensajes de quienes te quieren! ❤️
          </h2>
          <div className="mt-8">
            <Link
              to="/mensajes"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Ver todos los mensajes
            </Link>
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-dashed border-gray-300">
            <Heart className="mx-auto text-blue-500 mb-6" size={40} />
            <h2 className="font-great-vibes text-5xl text-center text-gray-900 mb-8">
              Mi Carta para Ti
            </h2>
            
            <div className="text-gray-700 text-lg md:text-xl leading-loose space-y-6">
              <p>
                Mi querida Danita,
              </p>
              <p>
                Desde el momento en que te conocí, supe que eras alguien especial. Tu sonrisa ilumina mis días, 
                tu risa es la melodía más hermosa que he escuchado, y tu amor es el regalo más preciado que jamás he recibido.
              </p>
              <p>
                En este día tan especial (tus 26 años!), quiero recordarte lo increíble que eres. Tu bondad, tu generosidad, tu forma de ver 
                la vida con optimismo... todo acerca de ti me inspira a ser una persona mejor. Me encanta ver cómo tus ojos brillan 
                cuando hablas de las cosas que amas: los lirios, la música de Siddhartha y Morat, Snoopy, la playa, los perritos e incluso la mayonesa!
              </p>
              <p>
                Espero que este cumpleaños esté lleno de todo lo que te hace feliz. Que cada momento sea mágico, 
                cada sueño se haga realidad y sepas, sin lugar a dudas, cuánto te amo.
              </p>
              <p className="font-great-vibes text-3xl text-purple-600 text-right pt-6">
                Con todo mi corazón,
                <br />
                Tu rodriguito
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="mx-auto mb-4 text-gray-400" size={40} />
          <h3 className="font-great-vibes text-4xl mb-4">
            ¡Feliz Cumpleaños Danita!
          </h3>
          <p className="text-lg opacity-90">
            Con todo mi amor, hoy y siempre.
          </p>
        </div>
      </footer>
    </div>
  );
}
