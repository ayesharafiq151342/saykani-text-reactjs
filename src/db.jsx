// import { useState, useEffect } from "react";
// import { db } from "./confige"; // assuming confige exports your firebase config
// import {
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   updateDoc,
//   deleteDoc, // Import deleteDoc
// } from "firebase/firestore";
// import "./DB.css"; // Import the CSS file

// function DB() {
//   const [first, setFirst] = useState([]); // initialize with an empty array
//   const userCollection = collection(db, "User"); // collection reference for Firestore

//   // State for creating a new user
//   const [newname, setNewname] = useState("");
//   const [newage, setAge] = useState("");

//   // State for updating an existing user
//   const [edit, setEdit] = useState(false);
//   const [nameupdate, setNameupdate] = useState("");
//   const [updateId, setUpdateId] = useState(""); // State to store the user ID for update

//   useEffect(() => {
//     const getuser = async () => {
//       const data = await getDocs(userCollection);
//       setFirst(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };
//     getuser();
//   }, []); // run once on component mount

//   // Create function
//   const handlecreate = async () => {
//     await addDoc(userCollection, { name: newname, age: newage });
//     setNewname(""); // Clear the input field after creation
//     setAge(""); // Clear the input field after creation
//   };

//   // Start updating user
//   const handleUpdate = (user) => {
//     setEdit(true);
//     setNameupdate(user.name);
//     setUpdateId(user.id); // Store the user ID for the document you want to update
//   };

//   // Input handler for updating name
//   const handleinput = (e) => {
//     setNameupdate(e.target.value);
//   };

//   // Save the updated user data
//   const handleSave = async () => {
//     const userDoc = doc(db, "User", updateId); // Get the document reference by ID
//     await updateDoc(userDoc, { name: nameupdate }); // Update the user's name in Firestore

//     // Update the local state after Firestore update
//     setFirst(
//       first.map((data) =>
//         data.id === updateId ? { ...data, name: nameupdate } : data
//       )
//     );
//     setEdit(false); // Close the edit mode
//     setNameupdate(""); // Clear the input
//   };

//   // Delete user function
//   const handleDelete = async (id) => {
//     const userDoc = doc(db, "User", id); // Get the document reference by ID
//     await deleteDoc(userDoc); // Delete the user from Firestore

//     // Update the local state after Firestore delete
//     setFirst(first.filter((user) => user.id !== id)); // Remove the user from the state
//   };

//   return (
//     <div>
//       {/* Form for creating a new user */}
//       <input
//         type="text"
//         value={newname}
//         onChange={(e) => setNewname(e.target.value)}
//         placeholder="Enter name"
//       />
//       <input
//         type="text"
//         value={newage}
//         onChange={(e) => setAge(e.target.value)}
//         placeholder="Enter age"
//       />
//       <button onClick={handlecreate}>Create</button>

//       <div>
//         {/* Conditional rendering for edit mode */}
//         {edit && (
//           <div className="update-mode">
//             <h1>Update User</h1>
//             <input
//               type="text"
//               value={nameupdate}
//               onChange={handleinput}
//               placeholder="Enter new name"
//             />
//             <button onClick={handleSave}>Save</button>
//             <button onClick={() => setEdit(false)}>Cancel</button>
//           </div>
//         )}

//         {/* Display list of users */}
//         {first.length > 0 ? (
//           first.map((user) => {
//             return (
//               <div className="user-card" key={user.id}>
//                 <h1>Name: {user.name}</h1>
//                 <h1>Age: {user.age}</h1>
//                 <button onClick={() => handleUpdate(user)}>Update</button>
//                 <button onClick={() => handleDelete(user.id)}>
//                   Delete
//                 </button>{" "}
//                 {/* Delete button */}
//               </div>
//             );
//           })
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DB;
