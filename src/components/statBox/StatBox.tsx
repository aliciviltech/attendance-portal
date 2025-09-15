import { CalendarCheck2 } from "lucide-react";

const StatBox = ({ label, value, icon, className }: { label: string; value: string | number, icon:React.ReactNode, className:string }) => {


  return (
    <div className="w-44 flex flex-col items-center justify-center gap-2 bg-yellow-300/20 rounded-xl shadow-md p-6 ">
      <span className="text-sm text-gray-500">{label}</span>
      {typeof value === "string" ?
        <span className="text-2xl font-bold text-gray-800">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
        :
        <span className="text-2xl font-bold text-gray-800">{value}</span>
      }
      <span className={`p-2 rounded-lg ${className} `}> {icon} </span>
    </div>
  )
}


export default StatBox