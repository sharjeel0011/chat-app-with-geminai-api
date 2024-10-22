
// import React, { useState } from 'react'; // Importing necessary modules from React
// import axios from 'axios'; // Importing Axios for making HTTP requests

// function App() {
//   // State to manage the user's input text and chat messages
//   const [inputText, setInputText] = useState(''); // inputText stores the current input from the user
//   const [messages, setMessages] = useState([{ text: 'Hello! How can I help you?' }]); // messages stores the chat history

//   // Function to handle the changes in the input field (user typing a message)
//   const handleInputChange = (e) => {
//     setInputText(e.target.value); // Updating inputText state whenever user types something
//   };

//   // Function to handle sending messages and fetching AI response
//   const handleSendMessage = async () => {
//     // Return if input is empty (do nothing)
//     if (inputText.trim() === '') return;

//     // Add the user's message to the messages array
//     setMessages((prevMessages) => [...prevMessages, { text: inputText, sender: 'user' }]);

//     // Clear the input field after sending the message
//     setInputText('');

//     try {
//       // Make a POST request to the Gemini API to get AI-generated response
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCAakcJI5E7UbfYGXOu71mkCXqwpD004cY`,
//         {
//           contents: [
//             {
//               parts: [
//                 { text: inputText } // Send the user's message as input to the API
//               ]
//             }
//           ]
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json', // API expects JSON format in request
//           }
//         }
//       );

//       // Log the response to see its structure for debugging purposes
//       console.log('API response:', response.data);

//       // Check if the response contains valid AI-generated content
//       if (response.data.candidates && response.data.candidates[0].content.parts) {
//         const aiResponse = response.data.candidates[0].content.parts[0].text; // Extract the AI's response

//         // Add the AI's response to the chat
//         setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'bot' }]);
//       } else {
//         // Throw an error if the response structure is not as expected
//         throw new Error('Unexpected response structure');
//       }
//     } catch (error) {
//       // Handle any errors that occur during the API call
//       console.error('Error calling the Gemini API', error);
//     }
//   };

//   return (
//     <div className="App" style={{ padding: '20px' }}>
//       <h1>Chat App</h1>

//       {/* Chat window to display messages */}
//       <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '20px' }}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               textAlign: msg.sender === 'user' ? 'right' : 'left', // Right-align user messages, left-align AI messages
//               marginBottom: '10px'
//             }}
//           >
//             {/* Displaying the sender and the text of each message */}
//             <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Input field to type the message */}
//       <input
//         type="text"
//         value={inputText} // Controlled input: value is linked to state
//         onChange={handleInputChange} // Update state on input change
//         placeholder="Type your message..."
//         style={{ width: '80%', padding: '10px' }}
//       />

//       {/* Send button to submit the message */}
//       <button onClick={handleSendMessage} style={{ padding: '10px 20px' }}>
//         Send
//       </button>
//     </div>
//   );
// }

// export default App;

















import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([{ text: 'Hello! How can I help you?' }]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    setMessages((prevMessages) => [...prevMessages, { text: inputText, sender: 'user' }]);
    setInputText('');

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCAakcJI5E7UbfYGXOu71mkCXqwpD004cY`,
        {
          contents: [
            {
              parts: [
                { text: inputText }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('API response:', response.data);

      if (response.data.candidates && response.data.candidates[0].content.parts) {
        const aiResponse = response.data.candidates[0].content.parts[0].text;

        setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'bot' }]);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error calling the Gemini API', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Chat App</h1>

        {/* Chat Window */}
        <div className="overflow-y-auto h-96 border border-gray-300 rounded-md mb-4 p-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg w-3/4 ${
                msg.sender === 'user' ? 'ml-auto bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Input and Send Button */}
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
