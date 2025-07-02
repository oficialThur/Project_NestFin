'use client'

const Footer = () => (
  <footer className="w-full h-[200px] bg-[#122112] py-6 flex flex-col items-center">
    <div className="flex justify-center items-center gap-32 w-full max-w-4xl mb-2 p-5">
      <a href="#" className="text-[#9EBF9E] text-sm hover:underline">Política de Privacidade</a>
      <a href="#" className="text-[#9EBF9E] text-sm hover:underline">Termos de Serviço</a>
      <a href="#" className="text-[#9EBF9E] text-sm hover:underline">Contate-nos</a>
    </div>
    <div className="text-[#9EBF9E] text-xs text-center mt-2">
      ©2024 NestFin. Direitos reservados.
    </div>
  </footer>
);

export default Footer;