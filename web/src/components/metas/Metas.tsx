'use client'
import { Button } from "@/components/ui/button";

const Metas = () => (
  <>
  <div className="w-[960px] p-6 text-white mt-6 flex justify-between items-center gap-4">
    <h2 className="text-2xl font-bold">Minhas Metas</h2>
    <Button className="bg-[#2B402B] hover:bg-[#2B402B]/80 text-white">
      Adicionar Meta
    </Button>
  </div>
  <div className="w-[960px] p-6 text-white mt-6 flex flex-col justify-between gap-4">
    <h3 className="text-xl font-semibold">Metas Atuais</h3>
    <div className="w-[960px] text-white flex justify-between items-center gap-4">
      <div className="w-[960px] text-white flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Meta 1</h4>
          <p className="text-sm text-gray-500">Descrição da meta</p>
        </div>
        <p className="text-sm text-gray-500">R$ 100,00</p>
      </div>
    </div>
  </div>
  <div className="w-[960px] p-6 text-white mt-6 flex justify-between items-center gap-4">
    <h3 className="text-xl font-semibold">Metas Alcançadas</h3>
    
  </div>
  </>
);

export default Metas; 