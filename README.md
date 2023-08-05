# Arrivo Test
Management Portal Backend APIs
- NodeJS
- PostgreSQL

## Project setup
1. Run
```
npm install
```

2. Then, make a copy of .env.example under `app/config` and rename to .env file
Edit `app/config/.env` with correct DB credentials.

3. Run
```
node server.js
```

## API Reference

### index.js

```http
  GET /
```

**Response:**

"Welcome to management portal platform"

### auth.js

```http
  POST /api/auth/signup
```

| Request Body     | Type     |
| :-----------     | :------- |
| `username`       | `String` |
| `email`          | `String` |
| `password`       | `String` |
| `membershipId`   | `int` |
| `fullName`       | `String` |
| `roles`          | `[String]` |

```
  POST /api/auth/signin
```

| Request Body | Type     |
| :----------- | :------- |
| `username`   | `String` |
| `password`   | `String` |

**Response:**

```
{
  id: "int",
  username: "string",
  email: "string",
  membership: "object",
  roles: "array",
  accessToken: "string",
}
```

### category.js

```http
  POST /api/categories
```

| Request Body    | Type      |
| :-----------    | :-------  |
| `name`          | `String`  |
| `description`   | `String`  |
| `activated`     | `Boolean` |

**Response:**

```
{
  id: "int",
  name: "string",
  description: "string",
  activated: "boolean",
  updatedAt: "string",
  createdAt: "string",
}
```

```http
  GET /api/categories
```

**Response:**

```
[{
  id: "int",
  name: "string",
  description: "string",
  activated: "boolean",
  updatedAt: "string",
  createdAt: "string",
}]
```

```http
  GET /api/categories/:categoryId
```

**Response:**

```
{
  id: "int",
  name: "string",
  description: "string",
  activated: "boolean",
  updatedAt: "string",
  createdAt: "string",
}
```

```http
  PUT /api/categories/:categoryId
```

| Request Body    | Type      |
| :-----------    | :-------  |
| `name`          | `String`  |
| `description`   | `String`  |
| `activated`     | `Boolean` |

**Response:**

```
{
  id: "int",
  name: "string",
  description: "string",
  activated: "boolean",
  updatedAt: "string",
  createdAt: "string",
}
```

```http
  DELETE /api/categories
```

```http
  DELETE /api/categories/:categoryId
```

**Response:**
```
{
  id: "int",
  name: "string",
  description: "string",
  activated: "boolean",
  updatedAt: "string",
  createdAt: "string",
}
```

### payment.js

```http
  POST /api/payments
```

| Request Body        | Type      |
| :-----------        | :-------  |
| `id`                | `String`  |
| `amount`            | `Double`  |
| `paymentMethod`     | `String`  |
| `status`            | `String`  |
| `userId`            | `int`     |

**Response:**

```
{
  id: "string",
  amount: "double",
  paymentMethod: "string",
  status: "string",
  user: "object"
}
```

```http
  GET /api/payments
```

**Response:**

```
[{
  id: "string",
  amount: "double",
  paymentMethod: "string",
  status: "string",
  updatedAt: "string",
  createdAt: "string",
  user: "object"
}]
```

```http
  GET /api/payments/:paymentId
```

**Response:**

```
{
  id: "string",
  amount: "double",
  paymentMethod: "string",
  status: "string",
  updatedAt: "string",
  createdAt: "string",
  user: "object"
}
```

```http
  PUT /api/payments/:paymentId
```

| Request Body    | Type      |
| :-----------    | :-------  |
| `id`                | `String`  |
| `amount`            | `Double`  |
| `paymentMethod`     | `String`  |
| `status`            | `String`  |
| `userId`            | `int`     |

**Response:**

```
{
  id: "int",
  name: "string",
  description: "string",
  activated: "boolean",
  updatedAt: "string",
  createdAt: "string",
  user: "object"
}
```

```http
  DELETE /api/payments
```

```http
  DELETE /api/payments/:paymentId
```

**Response:**
```
{
  id: "int",
  name: "string",
  description: "string",
  activated: "boolean",
  updatedAt: "string",
  createdAt: "string",
  user: "object"
}
```

### post.js

```http
  POST /api/posts
```

| Request Body      | Type      |
| :-----------      | :-------  |
| `title`           | `String`  |
| `body`            | `String`  |
| `categoryId`      | `int`     |
| `postStatusId`    | `int`     |
| `postLabelId`     | `int`     |

**Response:**

```
{
  id: "int",
  title: "string",
  body: "string",
  category: "object",
  postStatus: "object",
  postLabel: "object"
}
```

```http
  GET /api/posts
```

**Response:**

```
[{
  id: "int",
  title: "string",
  body: "string",
  updatedAt: "string",
  createdAt: "string",
  category: "object",
  postStatus: "object",
  postLabel: "object"
}]
```

```http
  GET /api/posts/:postId
```

**Response:**

```
{
  id: "int",
  title: "string",
  body: "string",
  updatedAt: "string",
  createdAt: "string",
  category: "object",
  postStatus: "object",
  postLabel: "object"
}
```

```http
  PUT /api/posts/:postId
```

| Request Body      | Type      |
| :-----------      | :-------  |
| `title`           | `String`  |
| `body`            | `String`  |
| `categoryId`      | `int`     |
| `postStatusId`    | `int`     |
| `postLabelId`     | `int`     |

**Response:**

```
{
  id: "int",
  title: "string",
  body: "string",
  updatedAt: "string",
  createdAt: "string",
  category: "object",
  postStatus: "object",
  postLabel: "object"
}
```

```http
  DELETE /api/posts/
```

```http
  DELETE /api/posts/:postId
```

**Response:**
```
{
  id: "int",
  title: "string",
  body: "string",
  updatedAt: "string",
  createdAt: "string",
  category: "object",
  postStatus: "object",
  postLabel: "object"
}
```

### user.js

```http
  POST /api/users
```

| Request Body      | Type      |
| :-----------      | :-------  |
| `username`        | `String`  |
| `email`           | `String`  |
| `password`        | `String`  |
| `membershipId`    | `int`     |
| `fullName`        | `String`  |
| `roles`           | `[String]`  |

**Response:**

```
{
  id: "int",
  username: "string",
  password: "string",
  email: "string",
  fullName: "object",
  membership: "object",
  roles: "array"
}
```

```http
  GET /api/users
```

**Response:**

```
[{
  id: "int",
  username: "string",
  password: "string",
  email: "string",
  fullName: "object",
  updatedAt: "string",
  createdAt: "string",
  membership: "object",
  roles: "array"
}]
```

```http
  GET /api/users/:userId
```

**Response:**

```
{
  id: "int",
  username: "string",
  password: "string",
  email: "string",
  fullName: "object",
  updatedAt: "string",
  createdAt: "string",
  membership: "object",
  roles: "array"
}
```

```http
  PUT /api/users/:userId
```

| Request Body      | Type      |
| :-----------      | :-------  |
| `username`        | `String`  |
| `email`           | `String`  |
| `password`        | `String`  |
| `membershipId`    | `int`     |
| `fullName`        | `String`  |
| `roles`           | `[String]`  |

**Response:**

```
{
  id: "int",
  username: "string",
  password: "string",
  email: "string",
  fullName: "object",
  updatedAt: "string",
  createdAt: "string",
  membership: "object",
  roles: "array"
}
```

```http
  DELETE /api/users/
```

```http
  DELETE /api/users/:userId
```

**Response:**
```
{
  id: "int",
  username: "string",
  password: "string",
  email: "string",
  fullName: "object",
  updatedAt: "string",
  createdAt: "string",
  membership: "object",
  roles: "array"
}
```