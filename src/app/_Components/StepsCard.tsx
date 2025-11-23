import React from 'react'


export default function StepsCard({ title, description, icon }: { title: string; description: string; icon?: React.ReactNode; }) {
  return (
    <div className={"relative w-full h-[512px] bg-blue-500 text-white p-6 shadow-lg rounded-[5px_5px_25px_25px] transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_2rem_gray] before:content-[''] before:absolute before:top-[-18px] before:left-0 before:w-[200px] before:h-[25px] before:bg-blue-500 before:rounded-tr-[25px]"}>
      {/* Icon */}
      {icon && <div className="text-4xl mb-7">{icon}</div>}

      {/* Content */}
      <h3 className="text-4xl font-semibold mb-5">{title}</h3>
      <p className="text-xl opacity-90 leading-relaxed">{description}</p>
    </div>
  );
}
