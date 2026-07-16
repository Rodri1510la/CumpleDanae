import { Heart, Gift, Sparkles, Star, Music, X, Play, Pause, Camera, MessageCircle, Quote, ArrowUp } from 'lucide-react';
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
  '/images/maquis.jpeg',
];

const photoCaptions = [
  'Uno de esos recuerdos que quisiera repetir contigo mil veces.',
  'Comidas contigo que siempre terminan sabiendo mejor.',
  'Momentos simples que se volvieron importantes por estar contigo.',
  'Flores bonitas para alguien todavia mas bonita.',
  'Atardeceres, fuego y la paz de tenerte cerca.',
  'Tus lirios, porque tambien merecen su lugar especial aqui.',
  'Nuestro compañero favorito que siempre está con nosotros.',
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
  const [modalFadingOut, setModalFadingOut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [countdownFadingOut, setCountdownFadingOut] = useState(false);
  const [homeFadingIn, setHomeFadingIn] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
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

  // Cuando la cuenta regresiva termine: ejecutar confetti, música y transición
  useEffect(() => {
    if (isCountdownOver && !SKIP_COUNTDOWN) {
      // Primero: desvanecer la pantalla de countdown
      setCountdownFadingOut(true);
      
      setTimeout(() => {
        // Luego: activar todo lo demás
        handleConfetti();
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
          setIsPlaying(true);
        }
        // Mostrar la página principal con fade in
        setHomeFadingIn(true);
      }, 600); // Tiempo de fade out del countdown
    }
  }, [isCountdownOver]);

  // Controlar visibilidad del botón de volver arriba
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const openPhotoModal = (photo: string) => {
    setSelectedPhoto(photo);
    setModalFadingOut(false);
  };

  const closePhotoModal = () => {
    setModalFadingOut(true);
    setTimeout(() => {
      setSelectedPhoto(null);
    }, 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Para desarrollo: cambia a true para saltarte la cuenta regresiva
  // Para producción (Vercel): déjalo en false para que la cuenta regresiva salga hasta el 16 de julio
  const SKIP_COUNTDOWN = false;
  
  // Si la cuenta regresiva no ha terminado, mostramos la pantalla de espera
  if (!isCountdownOver && !SKIP_COUNTDOWN) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 flex items-center justify-center p-4 transition-all duration-600 ${countdownFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
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
    <div className={`min-h-screen bg-white transition-all duration-800 ${(SKIP_COUNTDOWN || homeFadingIn) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
          className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-all duration-300 ${modalFadingOut ? 'opacity-0' : 'opacity-100'}`}
          onClick={closePhotoModal}
        >
          <button 
            className="absolute top-4 right-4 text-white"
            onClick={closePhotoModal}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Recuerdo" 
            className={`max-w-full max-h-[90vh] rounded-lg shadow-2xl transition-all duration-300 ${modalFadingOut ? 'scale-90' : 'scale-100'}`}
          />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-blue-100 to-purple-200 z-0">
        {/* Floating icons, Snoopy, Lilies and Beach elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-12 left-4 md:top-20 md:left-10 text-gray-400 animate-float-slow" size={24} />
          <Star className="absolute top-24 right-4 md:top-40 md:right-20 text-blue-400 animate-float-fast" size={20} />
          <Gift className="absolute bottom-24 left-4 md:bottom-32 md:left-1/4 text-purple-400 animate-float-medium" style={{animationDelay: '0.5s'}} size={24} />
          <Sparkles className="absolute bottom-12 right-4 md:bottom-20 md:right-10 text-gray-300 animate-float-slow" style={{animationDelay: '1s'}} size={32} />
          {/* Floating Snoopy Image */}
          <img 
            src="/images/snoopy_cool.png" 
            alt="Snoopy" 
            className="absolute bottom-16 left-4 w-20 md:w-32 animate-float-medium opacity-80"
          />
          {/* Woodstock emoji as a backup! */}
          <div 
            className="absolute top-16 right-8 text-3xl md:text-5xl animate-float-fast opacity-70"
          >
            🐦
          </div>
          {/* Floating Lily Images */}
          <img 
            src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=200&auto=format&fit=crop" 
            alt="Lirio" 
            className="absolute top-20 left-8 w-16 md:w-24 rounded-full shadow-lg animate-float-slow"
          />
          <img 
            src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=200&auto=format&fit=crop" 
            alt="Lirio" 
            className="absolute bottom-32 right-8 w-16 md:w-20 rounded-full shadow-lg animate-float-medium"
          />
          {/* Beach elements */}
          <div className="absolute top-8 right-16 md:top-16 md:right-1/4 text-yellow-500 animate-float-fast">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
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
          <div className="absolute bottom-24 right-16 md:bottom-32 md:right-1/4 text-cyan-600 animate-float-medium">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.98 14H22V12H20C18.69 12,17.58 11.17,17.17 10H6.83C6.42 11.17,5.31 12,4 12H2V14H2.02C2.14 14.94,2.55 15.82,3.19 16.56L2 18L3.41 19.41L5 18C6.47 19.25,8.4 20,10.5 20H13.5C15.6 20,17.53 19.25,19 18L20.59 19.41L22 18L20.81 16.56C21.45 15.82,21.86 14.94,21.98 14Z" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-5 py-2 text-sm font-semibold text-gray-700 shadow-lg backdrop-blur">
              <Sparkles size={16} className="text-purple-600" />
              Un rinconcito hecho solo para ti
            </div>

            <div className="rounded-[2rem] border border-white/60 bg-white/60 px-6 py-10 shadow-[0_30px_80px_rgba(76,29,149,0.15)] backdrop-blur-xl md:px-10 md:py-14">
              <Sparkles className="mx-auto mb-4 text-purple-600" size={60} />
              <h1 className="font-great-vibes text-6xl text-gray-900 md:text-8xl mb-4">
                Feliz Cumpleaños
              </h1>
              <h2 className="font-great-vibes text-5xl text-blue-600 md:text-7xl mb-6">
                Danita
              </h2>
              <div className="inline-flex items-center gap-3 rounded-full bg-gray-900 px-6 py-3 text-white shadow-lg">
                <Sparkles size={24} />
                <span className="text-xl font-bold">¡26 años increibles!</span>
              </div>

              <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl">
                Hoy celebro tu vida, tu luz y la manera tan bonita en la que haces
                que todo se sienta mas especial. Quise convertir esta pagina en una
                pequeña experiencia que se sintiera tan tuya como mis recuerdos contigo.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <div className="rounded-full border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  Snoopy, playa y flores favoritas
                </div>
                <div className="rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  Una sorpresa hecha con mucho amor
                </div>
                <div className="rounded-full border border-purple-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                  Recuerdos, mensajes y una carta para ti
                </div>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={handleConfetti}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Gift size={24} />
                  Abrir Sorpresa
                </button>
                <Link
                  to="/mensajes"
                  className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-10 py-4 font-semibold text-gray-800 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <MessageCircle size={22} />
                  Leer mensajes
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/60 bg-white/65 p-5 shadow-lg backdrop-blur">
              <Heart className="mb-3 text-purple-600" size={28} />
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Esencia</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Una portada mas romantica, suave y especial para ti.
              </p>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/65 p-5 shadow-lg backdrop-blur">
              <Camera className="mb-3 text-blue-600" size={28} />
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Recuerdos</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Fotos y momentos que cuentan poquito a poquito nuestra historia.
              </p>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/65 p-5 shadow-lg backdrop-blur">
              <MessageCircle className="mb-3 text-purple-600" size={28} />
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Cariño</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Un espacio para que todos puedan dejarte amor en forma de mensajes.
              </p>
            </div>
          </div>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-great-vibes text-5xl md:text-6xl text-center text-gray-900 mb-12">
            Cosas que amo de ti
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600 md:text-xl">
            Hay detalles tuyos que se quedan conmigo todo el tiempo. Esta es una
            pequeña lista de muchas razones por las que tu existencia se siente tan bonita.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {thingsILove.map((thing, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-70" />
                <Heart className="mx-auto mb-4 text-blue-500 transition-transform duration-300 group-hover:scale-110" size={32} />
                <p className="text-lg font-semibold text-gray-700">
                  {thing}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-great-vibes text-5xl md:text-6xl text-center text-gray-900 mb-12">
            Nuestros Momentos
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600 md:text-xl">
            Una galeria mas viva para que cada foto se sienta como una postal de nosotros.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden border-2 border-gray-200 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl ${
                  index === 0 ? 'rounded-[2rem] md:col-span-2 md:h-[32rem]' : 'rounded-[2rem] h-80'
                }`}
                onClick={() => openPhotoModal(photo)}
              >
                <img 
                  src={photo} 
                  alt={`Momento ${index + 1}`} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-100 flex items-end">
                  <div className="p-6 text-white">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
                      <Camera size={16} />
                      {index === 0 ? 'Recuerdo favorito' : 'Momento especial'}
                    </div>
                    <p className="text-lg font-semibold leading-relaxed md:text-xl">
                      {photoCaptions[index]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guestbook Call to Action Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] border border-purple-100 bg-white/70 px-6 py-12 text-center shadow-[0_24px_60px_rgba(59,130,246,0.12)] backdrop-blur md:px-10">
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-purple-200/50 blur-3xl" />
            <div className="relative z-10">
              <Heart className="mx-auto mb-6 text-purple-500" size={60} />
              <h2 className="font-great-vibes text-5xl text-gray-900 md:text-6xl mb-4">
                Danita, lee aqui los mensajes de quienes te quieren
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
                Aqui quedaran guardadas las palabras bonitas, los buenos deseos y el cariño
                de las personas que quieren acompañarte en tu dia.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/nuevo-mensaje"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Gift size={20} />
                  Dejar un mensaje
                </Link>
                <Link
                  to="/mensajes"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-purple-200 bg-white px-10 py-4 font-semibold text-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <MessageCircle size={20} />
                  Ver todos los mensajes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] border border-purple-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 shadow-2xl md:p-12">
            <div className="absolute right-6 top-6 opacity-10">
              <Quote size={120} className="text-purple-900" />
            </div>
            <div className="relative z-10">
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow">
                  <Quote size={16} className="text-purple-600" />
                  Una carta escrita con el corazon
                </div>
              </div>
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
                <p className="pt-6 text-right font-great-vibes text-3xl text-purple-600">
                  Con todo mi corazón,
                  <br />
                  Tu rodriguito
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <ArrowUp size={28} />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-purple-900 text-white py-16">
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
