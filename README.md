# SIMPLE CHATBOT

A simple website where users can engage with an AI chatbot to chat and ask all kinds of questions.

## 🔹 Technologies Used
- MERN stack (MongoDB, Express, React, Node.js)
- JWT for authentication
- Groq API for AI responses
- Database stores chat history for each user

---

## 📌 API ENDPOINTS

### **1️⃣ POST /register**
Registers a new user.

#### Case: Empty Request Body

❌ **Error Response (400 Bad Request)**
📌 **Response Body:**
```json
{
  "error": "missing required fields"
}
```

#### Case: Missing Required Fields

❌ **Error Response (400 Bad Request)**

📌 **Request Body:**
```json
{
    "username": "user123"
}
```

📌 **Response Body:**
```json
{
  "error": "missing required fields"
}
```

#### Case: Username Already Exists

❌ **Error Response (409 Conflict)**

📌 **Request Body:**
```json
{
    "username": "user",
    "email": "user123@gmail.com",
    "password": "112233"
}
```
📌 **Response Body:**
```json
{
  "error": "Username already exists"
}
```
#### Case: Email Already Exists

❌ **Error Response (409 Conflict)**

📌 **Request Body:**
```json
{
    "username": "user123",
    "email": "user@gmail.com",
    "password": "112233"
}
```
📌 **Response Body:**
```json
{
  "error": "Email already exists"
}
```

#### Case: Valid Input

✅ **Success Response (201 Created)**

📌 **Request Body:** 
```json
{
    "username": "user123",
    "email": "user123@gmail.com",
    "password": "112233"
}
```

📌 **Response Headers:**
```
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
Access-Control-Allow-Credentials: true
Set-Cookie: accessToken=your-jwt-token-here; Max-Age=86400; Path=/; Expires=Sat, 08 Mar 2025 22:18:04 GMT; HttpOnly; SameSite=Lax
Content-Type: application/json; charset=utf-8
Content-Length: 54
ETag: W/"36-+7r5UdClkTD3yL/J832ZaZ+LlNE"
Date: Fri, 07 Mar 2025 22:18:04 GMT
Connection: close
```
📌 **Response Body:**
```json
{
  "message": "new user registered",
  "username": "user123"
}
```

### **2️⃣ POST /login**
Logs in an existing user.

#### Case: Empty Request Body

❌ **Error Response (400 Bad Request)**
📌 **Response Body:**
```json
{
  "error": "missing required fields"
}
```

#### Case: Missing Required Fields

❌ **Error Response (400 Bad Request)**

📌 **Request Body:**
```json
{
    "username": "user123"
}
```

📌 **Response Body:**
```json
{
  "error": "missing required fields"
}
```

#### Case: User Doesn't Exist

❌ **Error Response (401 Unauthorized)**

📌 **Request Body:**
```json
{
    "username": "new_user",
    "password": "112233"
}
```
📌 **Response Body:**
```json
{
  "error": "Invalid username or password."
}
```

#### Case: Password Not Matching

❌ **Error Response (401 Unauthorized)**

📌 **Request Body:**
```json
{
    "username": "new_user",
    "password": "password"
}
```
📌 **Response Body:**
```json
{
  "error": "Invalid username or password."
}
```

#### Case: Valid Input

✅ **Success Response (200 OK)**

📌 **Request Body:** 
```json
{
    "username": "user123",
    "password": "112233"
}
```

📌 **Response Headers:**
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
Access-Control-Allow-Credentials: true
Set-Cookie: accessToken=your-jwt-token-here; Max-Age=86400; Path=/; Expires=Sat, 08 Mar 2025 22:57:54 GMT; HttpOnly; SameSite=Lax
Content-Type: application/json; charset=utf-8
Content-Length: 49
ETag: W/"31-Qugf1uyEwXuKJ9sqkk/wrjNYOmM"
Date: Fri, 07 Mar 2025 22:57:54 GMT
Connection: close
```

📌 **Response Body:**
```json
{
  "message": "User logged in",
  "username": "user123"
}
```

### **3️⃣ GET /logout**
Clears the JWT token inside the cookie, logging the user out.

✅ **Success Response (200 OK)**

📌 **Response Headers:**
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
Access-Control-Allow-Credentials: true
Set-Cookie: accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-QmMKQ7Ehtu+p4nfPmYpM+SsKPqc"
Date: Sat, 08 Mar 2025 15:37:21 GMT
Connection: close
```

📌 **Response Body:**
```json
{
  "message": "Logged out successfully."
}
```

### **4️⃣ GET /verify**
Authenticates the user by verifying the JWT token stored in the cookies and grants access to the website for valid users.

#### Case: No Token Provided

❌ **Error Response (401 Unauthorized)**

📌 **Response Body:**
```json
{
  "error": "Unauthorized access."
}
```

#### Case: Wrong Token Provided

❌ **Error Response (401 Unauthorized)**

📌 **Request Headers:**
```
Cookie: accessToken=wrong_token
```

📌 **Response Body:**
```json
{
  "error": "Unauthorized access."
}
```

#### Case: Correct Token Provided

✅ **Success Response (200 OK)**

📌 **Request Headers:**
```
Cookie: accessToken=your_jwt_token
```

📌 **Response Body:**
```json
{
  "message": "User verified",
}
```

#### **Key Points:**
- **Authentication:** This endpoint is used to check the validity of the user's JWT token from the cookie.
- **Cookies:** The ```accessToken``` is stored as an HTTP-only cookie during login and registration.
- **Redirects:** The frontend handles the redirection to the login page if the user is not authenticated.


### **5️⃣ GET /fetch-models**
Fetch available Large Language Models (LLMs) that can be used for AI interactions.

#### Case: No Token Provided

❌ **Error Response (401 Unauthorized)**

📌 **Response Body:**
```json
{
  "error": "Unauthorized access.",
  "unauthorized": true
}
```

#### Case: Wrong Token Provided

❌ **Error Response (401 Unauthorized)**

📌 **Request Headers:**
```
Cookie: accessToken=wrong_token
```

📌 **Response Body:**
```json
{
  "error": "Invalid or expired token.",
  "unauthorized": true
}
```

#### Case: Correct Token Provided

✅ **Success Response (200 OK)**

📌 **Request Headers:**
```
Cookie: accessToken=your_jwt_token
```

📌 **Response Body:**
```json
[
  {
    "id": "llama-guard-3-8b",
    "owned_by": "Meta"
  },
  {
    "id": "gemma2-9b-it",
    "owned_by": "Google"
  },
  {
    "id": "llama3-70b-8192",
    "owned_by": "Meta"
  },
  {
    "id": "whisper-large-v3-turbo",
    "owned_by": "OpenAI"
  },
  {
    "id": "deepseek-r1-distill-llama-70b",
    "owned_by": "DeepSeek / Meta"
  },
  {
    "id": "llama-3.1-8b-instant",
    "owned_by": "Meta"
  },
  {
    "id": "llama-3.2-3b-preview",
    "owned_by": "Meta"
  },
  {
    "id": "llama-3.2-90b-vision-preview",
    "owned_by": "Meta"
  },
  {
    "id": "deepseek-r1-distill-qwen-32b",
    "owned_by": "DeepSeek / Alibaba Cloud"
  },
  {
    "id": "llama-3.3-70b-specdec",
    "owned_by": "Meta"
  },
  {
    "id": "distil-whisper-large-v3-en",
    "owned_by": "Hugging Face"
  },
  {
    "id": "llama-3.2-11b-vision-preview",
    "owned_by": "Meta"
  },
  {
    "id": "whisper-large-v3",
    "owned_by": "OpenAI"
  },
  {
    "id": "llama-3.3-70b-versatile",
    "owned_by": "Meta"
  },
  {
    "id": "llama3-8b-8192",
    "owned_by": "Meta"
  },
  {
    "id": "qwen-2.5-coder-32b",
    "owned_by": "Alibaba Cloud"
  },
  {
    "id": "qwen-qwq-32b",
    "owned_by": "Alibaba Cloud"
  },
  {
    "id": "qwen-2.5-32b",
    "owned_by": "Alibaba Cloud"
  },
  {
    "id": "mistral-saba-24b",
    "owned_by": "Mistral AI"
  },
  {
    "id": "llama-3.2-1b-preview",
    "owned_by": "Meta"
  },
  {
    "id": "mixtral-8x7b-32768",
    "owned_by": "Mistral AI"
  }
]
```


### **6️⃣ GET /fetch-messages**
Fetch the messages stored in the database.

#### Case: No Token Provided

❌ **Error Response (401 Unauthorized)**

📌 **Response Body:**
```json
{
  "error": "Unauthorized access.",
  "unauthorized": true
}
```

#### Case: Wrong Token Provided

❌ **Error Response (401 Unauthorized)**

📌 **Request Headers:**
```
Cookie: accessToken=wrong_token
```

📌 **Response Body:**
```json
{
  "error": "Invalid or expired token.",
  "unauthorized": true
}
```

#### Case: Correct Token Provided

✅ **Success Response (200 OK)**

📌 **Request Headers:**
```
Cookie: accessToken=your_jwt_token
```

📌 **Response Body:**
```json
[
  {
    "role": "system",
    "content": "Only use tools when the user sends JSON data or asks specific questions about them. Otherwise you're just an AI chatbot here to chat and answer questions.",
    "_id": "67cc82e52e12b83b7e38f622"
  },
  {
    "role": "user",
    "content": "hey there!",
    "_id": "67cc82e52e12b83b7e38f623"
  },
  {
    "role": "assistant",
    "content": "Hi! It's nice to meet you. How's your day going so far?",
    "_id": "67cc82e52e12b83b7e38f625"
  }
]
```


### **7️⃣ POST /chatbot-reply**
Get a reply for the chatbot.

#### Case: No Token Provided

❌ **Error Response (401 Unauthorized)**

📌 **Response Body:**
```json
{
  "error": "Unauthorized access.",
  "unauthorized": true
}
```

#### Case: No Prompt Provided

❌ **Error Response (400 Bad Request)**

📌 **Request Headers:**
```
Cookie: accessToken=your_jwt_token
```

📌 **Response Body:**
```json
{
  "error": "Please send a prompt."
}
```

#### Case: No Model Provided

❌ **Error Response (400 Bad Request)**

📌 **Request Headers:**
```
Cookie: accessToken=your_jwt_token
```

📌 **Request Body:**
```json
{
    "prompt": "hey there!"
}
```

📌 **Response Body:**
```json
{
  "error": "Please choose a model."
}
```

#### Case: Prompt and Model Provided

✅ **Success Response (200 OK)**

📌 **Request Headers:**
```
Cookie: accessToken=your_jwt_token
```

📌 **Request Body:**
```json
{
    "prompt": "hey there!",
    "botModel": "llama3-70b-8192"
}
```

📌 **Response Body:**
```json
{
  "reply": "Hey! How's it going?"
}
```


### **8️⃣ GET /clear-chat**
Clear chat history.

#### Case: No Token Provided

❌ **Error Response (401 Unauthorized)**

📌 **Response Body:**
```json
{
  "error": "Unauthorized access.",
  "unauthorized": true
}
```

#### Case: Token Provided

✅ **Success Response (200 OK)**

📌 **Request Headers:**
```
Cookie: accessToken=your_jwt_token
```

📌 **Response Body:**
```json
{
  "message": "chat cleared successfully"
}
```