import React from 'react'

interface TitleDashboardProps {
  title: string;
  subtitle: string;
}

const TitleDashboard: React.FC<TitleDashboardProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col justify-start gap-2 w-[960px] h-[100px] mt-10">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-[#9EBF9E]">{subtitle}</p>
    </div>
  )
}

export default TitleDashboard