// 'use client'
// import { assets } from '@/app/assets_admin/assets'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import React from 'react'

// const AdminNav = () => {
//    const pathname = usePathname();
//   const isAdmin = pathname === "/admin/dashboard" 

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md flex justify-between items-center border-b border-gray-300 py-3 px-4 bg-white mb-6 ">
//       {/* Logo */}
//       <div className="flex items-center gap-3">
//         <Image 
//           alt="Admin Logo" 
//           src={assets.admin_logo} 
//           className="w-10 h-10 md:w-20 object-contain" 
//         />
//         <h1 className="font-semibold text-lg text-gray-700">{isAdmin?"Admin Panel":"Doctor Panel"}</h1>
//       </div>

//       {/* Logout Button */}
//       <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2 rounded-full text-white text-sm font-medium shadow-sm cursor-pointer">
//         Logout
//       </button>
//     </div>
//   )
// }

// export default AdminNav
