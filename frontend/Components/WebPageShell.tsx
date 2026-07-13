import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

export default function WebPageShell({title,description,children}:{title:string;description:string;children:React.ReactNode}){
  return <div className="flex min-h-screen bg-[#F5F6FA]"><Sidebar/><main className="flex-1 min-w-0 p-7"><Header/><div className="mt-8"><h1 className="text-4xl font-bold text-[#151930]">{title}</h1><p className="text-gray-500 mt-2">{description}</p><div className="mt-8">{children}</div></div></main></div>
}
