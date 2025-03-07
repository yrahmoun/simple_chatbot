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

