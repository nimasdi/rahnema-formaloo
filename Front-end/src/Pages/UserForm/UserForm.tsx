import React, { useState } from "react";
import axios from "axios";
import Box from "../../components/Box/Box";

const UserForm = () => {
  const [username, setUsername] = useState<string>("");
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchCards = async () => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      // Replace with your actual backend API endpoint
      const response = await axios.get(`/api/cards?username=${username}`);
      setCards([
        { id: "1", title: "Form 1" },
        { id: "2", title: "Form 2" },
        { id: "3", title: "Form 3" },
      ]); // Mock data
    } catch (err) {
      setError("Failed to fetch cards.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddForm = () => {
    // Implement the logic for adding a form
  };

  return (
    <Box
      title="User Forms"
      buttonLabel="Add Form"
      onButtonClick={handleAddForm}
      padding="px-6 py-4"
      margin="mx-auto"
      bgColor="bg-white"
      textColor="text-black"
      borderRadius="rounded-lg"
      border="border border-gray-300"
      shadow="shadow-md"
      height="auto"
      width="w-full"
      
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={handleFetchCards}
        disabled={loading}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {loading ? "Loading..." : "Fetch Cards"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {cards.map((card) => (
        <div
          key={card.id}
          className="p-4 border border-gray-300 rounded-md shadow-sm mb-2"
        >
          <div className="text-center font-semibold">{card.title}</div>
        </div>
      ))}
    </Box>
  );
};

export default UserForm;
