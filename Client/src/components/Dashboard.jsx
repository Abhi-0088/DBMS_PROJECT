// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = ({ user }) => {
//   const navigate = useNavigate()
//   if(!user)
//   {
//     navigate('/login')
//   }
//     console.log("priting user=>",user)
//   const { name, email, department, isAdmin, clubs, walletId } = user;

//   // Generate avatar URL based on the user's initials (using the DiceBear Avatars API)
//   const initials = name ? name.split(" ").map((n) => n[0]).join("") : "";
//   console.log("priting initials=>",initials)
//   const avatarUrl = `https://ui-avatars.com/api/?name=${initials}background=random`;

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
//       {/* User Avatar */}
//       <div className="w-24 h-24 mb-4">
//         <img
//           src={avatarUrl}
//           alt="User Avatar"
//           className="w-full h-full rounded-full border-4 border-blue-500"
//         />
//       </div>

//       {/* User Information */}
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Dashboard</h2>
        
//         <div className="text-gray-700">
//           <p className="mb-2"><span className="font-semibold">Name:</span> {name}</p>
//           <p className="mb-2"><span className="font-semibold">Email:</span> {email}</p>
//           <p className="mb-2"><span className="font-semibold">Department:</span> {department}</p>
//           <p className="mb-2">
//             <span className="font-semibold">Admin:</span> {isAdmin ? "Yes" : "No"}
//           </p>
//           <p className="mb-2"><span className="font-semibold">Wallet ID:</span> {walletId}</p>
//           <p className="mb-2">
//             <span className="font-semibold">Clubs:</span> {clubs.join(", ")}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// -------------------------------------------------------
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user }) => {
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null; 
    }

    const { name, email, department, isAdmin, clubs, walletId } = user;
    const initials = name ? name.split(" ").map((n) => n[0]).join("") : "";
    const avatarUrl = `https://ui-avatars.com/api/?name=${initials}&background=random`;


    return (
        <div className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 min-h-screen flex flex-col items-center justify-center p-6">
            {/* Avatar with improved styling */}
            <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white"> 
                <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
            </div>

            {/* Dashboard Card with enhanced styling */}
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User Dashboard</h2> {/* Title change */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div><span className="font-semibold">Name:</span> {name}</div>
                    <div><span className="font-semibold">Email:</span> {email}</div>
                    <div><span className="font-semibold">Department:</span> {department}</div>
                    <div><span className="font-semibold">Admin:</span> {isAdmin ? "Yes" : "No"}</div>
                    <div><span className="font-semibold">Wallet ID:</span> {walletId}</div>
                    <div><span className="font-semibold">Clubs:</span> {clubs.join(", ")}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;