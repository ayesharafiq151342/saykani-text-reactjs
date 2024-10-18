import { useState, useEffect } from "react";
import { db } from "./confige"; // Assuming confige exports your Firebase config
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "./DB.css"; // Import the CSS file

function Post() {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const userCollection = collection(db, "User"); // Collection reference for Firestore

  // State for creating a new user
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState(""); // New state for description
  const [newImage, setNewImage] = useState(""); // State for the new image URL

  // State for updating an existing user
  const [edit, setEdit] = useState(false);
  const [nameUpdate, setNameUpdate] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState(""); // State for updating description
  const [imageUpdate, setImageUpdate] = useState(""); // State for updating image URL
  const [updateId, setUpdateId] = useState(""); // State to store the user ID for update

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []); // Run once on component mount

  // Create function
  const handleCreate = async () => {
    // Check if a valid image URL is present
    if (!newImage) {
      alert("Please upload an image!");
      return;
    }

    await addDoc(userCollection, { 
      name: newName, 
      description: newDescription, // Add description to Firestore
      image: newImage 
    });
    
    setNewName(""); // Clear the input field after creation
    setNewDescription(""); // Clear the input field after creation
    setNewImage(""); // Clear the input field after creation
  };

  // Start updating user
  const handleUpdate = (user) => {
    setEdit(true);
    setNameUpdate(user.name);
    setDescriptionUpdate(user.description); // Set the description for update
    setImageUpdate(user.image); // Set the image URL for update
    setUpdateId(user.id); // Store the user ID for the document you want to update
  };

  // Input handler for updating name
  const handleNameInput = (e) => {
    setNameUpdate(e.target.value);
  };

  // Input handler for updating description
  const handleDescriptionInput = (e) => {
    setDescriptionUpdate(e.target.value);
  };

  // Input handler for updating image
  const handleImageInput = (e) => {
    setImageUpdate(e.target.value);
  };

  // Save the updated user data
  const handleSave = async () => {
    const userDoc = doc(db, "User", updateId); // Get the document reference by ID
    await updateDoc(userDoc, { 
      name: nameUpdate, 
      description: descriptionUpdate, // Update description
      image: imageUpdate // Update image
    });

    // Update the local state after Firestore update
    setUsers(
      users.map((user) =>
        user.id === updateId 
          ? { ...user, name: nameUpdate, description: descriptionUpdate, image: imageUpdate } 
          : user
      )
    );
    setEdit(false); // Close the edit mode
    setNameUpdate(""); // Clear the input
    setDescriptionUpdate(""); // Clear the input
    setImageUpdate(""); // Clear the input
  };

  // Delete user function
  const handleDelete = async (id) => {
    const userDoc = doc(db, "User", id); // Get the document reference by ID
    await deleteDoc(userDoc); // Delete the user from Firestore

    // Update the local state after Firestore delete
    setUsers(users.filter((user) => user.id !== id)); // Remove the user from the state
  };

  return (
    <div>
      {/* Form for creating a new user */}
    
      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)} // Update new description
        placeholder="Enter description"
      />
      <input
        type="text"
        value={newImage}
        onChange={(e) => setNewImage(e.target.value)}
        placeholder="Enter image URL"
      />
      <button onClick={handleCreate}>Create</button>

      <div>
        {/* Conditional rendering for edit mode */}
        {edit && (
          <div className="update-mode">
            <h1>Update User</h1>
            <input
              type="text"
              value={imageUpdate}
              onChange={handleImageInput}
              placeholder="Enter new image URL"
            />
            <input
              type="text"
              value={nameUpdate}
              onChange={handleNameInput}
              placeholder="Enter new name"
            />
            <input
              type="text"
              value={descriptionUpdate}
              onChange={handleDescriptionInput} // Update description input
              placeholder="Enter new description"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEdit(false)}>Cancel</button>
          </div>
        )}

        {/* Display list of users */}
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <div className="user-card" key={user.id}>
                {user.image && (
                  <img
                    src={user.image}
                    alt={user.name}
                    style={{ width: '100%', height: '100%' }} // Use a consistent size for the image
                  />
                )} {/* Display user image */}
                <p>Description: {user.description}</p> {/* Show user description */}
                <button onClick={() => handleUpdate(user)}>Update</button>
                <button onClick={() => handleDelete(user.id)}> Delete</button>
              </div>
            );
          })
        ) : (
          <p className="loading">Loading...</p> // Use the loading class for styling
        )}
      </div>
    </div>
  );
}

export default Post;
