import React, { useState } from "react";
import axios from "axios";
import Box from "../../components/Box/Box";
import { Link, useNavigate } from "react-router-dom";

const UserForm = () => {
  const [username, setUsername] = useState<string>("");
  const [cards, setCards] = useState<CardData[]>([
    {
      _id: "66abdda19de51eb10069cc56",
      fields: [
        {
          _id: "66abdda19de51eb10069cc53",
          name: "Second Field",
          validations: {
            minLength: "5",
          },
          type: "string",
          options: ["OptionA", "OptionB"],
          __v: 0,
        },
        {
          _id: "66abdda19de51eb10069cc52",
          name: "First Field",
          validations: {
            required: true,
          },
          type: "string",
          options: ["Option1", "Option2"],
          __v: 0,
        },
      ],
      publish: true,
      url: "http://localhost:3000/forms/e8f01f3b-fc9d-4377-91c8-b9bb3979a5da",
      user_username: "hooo",
      form_id: "e8f01f3b-fc9d-4377-91c8-b9bb3979a5da",
      title: "test",
      __v: 0,
    },
    {
      _id: "66ad2ece269eca203f4bf0ec",
      fields: [
        {
          _id: "66ad2ece269eca203f4bf0e8",
          name: "First Field",
          validations: {
            required: true,
          },
          type: "string",
          options: ["Option1", "Option2"],
          __v: 0,
        },
        {
          _id: "66ad2ece269eca203f4bf0e9",
          name: "Second Field",
          validations: {
            minLength: "5",
          },
          type: "string",
          options: ["OptionA", "OptionB"],
          __v: 0,
        },
      ],
      publish: false,
      url: "http://localhost:3000/forms/12305103-4642-4dc2-ad46-9a15ee5e8298",
      user_username: "hooo",
      form_id: "12305103-4642-4dc2-ad46-9a15ee5e8298",
      title: "test",
      __v: 0,
    },
    {
      _id: "66ad2ed4269eca203f4bf0f4",
      fields: [
        {
          _id: "66ad2ed4269eca203f4bf0f1",
          name: "Second Field",
          validations: {
            minLength: "5",
          },
          type: "string",
          options: ["OptionA", "OptionB"],
          __v: 0,
        },
        {
          _id: "66ad2ed4269eca203f4bf0f0",
          name: "second Field",
          validations: {
            required: true,
          },
          type: "string",
          options: ["Option1", "Option2"],
          __v: 0,
        },
      ],
      publish: false,
      url: "http://localhost:3000/forms/6e26aa9c-6ca0-4c82-b23f-08833c40e7e4",
      user_username: "hooo",
      form_id: "6e26aa9c-6ca0-4c82-b23f-08833c40e7e4",
      title: "test",
      __v: 0,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleFetchCards = async () => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      // Replace with your actual backend API endpoint
      const response = await axios.get(`http://localhost:3002/user/hoosh/forms`);
      
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
    navigate("/create-forms"); // Navigate to     // Implement the logic for adding a form
  };

  return (
    <Box
      title="User Forms"
      onButtonClick={handleAddForm}
      padding="px-6 py-6"
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
      <div className="grid grid-cols-3 gap-4 mt-4">
        {cards.map((card) => (
          <Link
            to={`/create-forms/${card._id}`}
            key={card.id}
            className="p-4 border border-gray-300 rounded-md shadow-sm mb-2"
          >
            <div className="text-center font-semibold">{card.title}</div>
          </Link>
        ))}
      </div>
    </Box>
  );
};

export default UserForm;
