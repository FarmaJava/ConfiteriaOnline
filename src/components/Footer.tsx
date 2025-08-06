import React from 'react';
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-100 py-8 text-center text-sm text-gray-700 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Contacto */}
        <div className="mb-4">
          <p className="font-semibold">Contacto</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" /> +54 9 351 123 4567
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" /> candycrushers@gmail.com
            </span>
          </div>
        </div>

        {/* Términos y derechos */}
        <div className="mb-4">
          <p className="text-gray-500">
            Términos y condiciones | Política de privacidad<br />
            Copyright © 2025 CandyCrushers S.R.L.
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center items-center gap-6 mt-4">
          <a href="#" aria-label="Instagram">
            <Instagram className="h-5 w-5 hover:text-pink-500 transition" />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook className="h-5 w-5 hover:text-blue-600 transition" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="h-5 w-5 hover:text-black transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
