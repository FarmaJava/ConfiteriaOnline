import React from 'react';

function Hero() {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Banner Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ backgroundColor: 'rgb(235, 152, 152)' }}></div>
        <img
          src="https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Confitería Banner"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70"></div>
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EB9898' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Elementos decorativos */}
        <div className="absolute top-8 left-8 w-16 h-16 rounded-full blur-xl" style={{ backgroundColor: 'rgba(235, 152, 152, 0.3)' }}></div>
        <div className="absolute top-12 right-12 w-20 h-20 rounded-full blur-xl" style={{ backgroundColor: 'rgba(212, 246, 99, 0.3)' }}></div>
        <div className="absolute bottom-8 left-1/4 w-12 h-12 rounded-full blur-lg" style={{ backgroundColor: 'rgba(235, 152, 152, 0.25)' }}></div>
        <div className="absolute bottom-12 right-1/3 w-14 h-14 rounded-full blur-lg" style={{ backgroundColor: 'rgba(212, 246, 99, 0.25)' }}></div>

        {/* Título principal */}
        <div className="relative">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 relative z-10" 
              style={{ 
                fontFamily: 'Dancing Script, cursive',
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
                color: '#EB9898'
              }}>
            <span className="relative">
              Candy Crushers
              {/* Línea decorativa */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full opacity-70" style={{ backgroundColor: '#D4F663' }}></div>
            </span>
          </h1>
          
          {/* Decoraciones */}
          <div className="absolute top-4 left-1/4 text-yellow-400 text-xl animate-pulse opacity-60">✨</div>
          <div className="absolute top-8 right-1/4 text-lg animate-pulse delay-300 opacity-60" style={{ color: '#EB9898' }}>🍭</div>
          <div className="absolute bottom-4 left-1/3 text-base animate-pulse delay-700 opacity-60" style={{ color: '#D4F663' }}>🧁</div>
          <div className="absolute bottom-8 right-1/3 text-lg animate-pulse delay-500 opacity-60" style={{ color: '#EB9898' }}>🍰</div>
        </div>

        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed relative z-10 font-medium"
           style={{ fontFamily: 'Poppins, sans-serif' }}>
          Los sabores más dulces y auténticos en cada bocado. 
          Confitería artesanal hecha con amor y dedicación.
        </p>
      </div>
    </section>
  );
}

export default Hero;