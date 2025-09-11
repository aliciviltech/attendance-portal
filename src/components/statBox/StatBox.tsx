
const StatBox = ({ label, value }: { label: string; value: string | number }) => {
    return(
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-6 w-44">
    <span className="text-2xl font-bold text-gray-800">{value}</span>
    <span className="text-sm text-gray-500">{label}</span>
  </div>
    )
}


export default StatBox