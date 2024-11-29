## Authentication

#### Register(POST)

```
  http://localhost:3000/api/register
```

| Arguments               | Type     | Description                              |
| :---------------------- | :------- | :--------------------------------------- |
| `name`                  | `string` | **Required** / mauk                      |
| `email`                 | `string` | **Required** / userone@gmail.com         |
| `password`              | `string` | **Required** / min:8 password            |
| `confirm_password`      | `string` | **Required** / min:8 password            |

```
{
	"success": true,
	"message": "Create user successfully",
	"userResponse": {
		"_id": "674a2cf94dd46b69ab54e712",
		"name": "userone",
		"email": "usernine@gmail.com",
		"createdAt": "2024-11-29T21:07:05.149Z",
		"updatedAt": "2024-11-29T21:07:05.149Z",
		"__v": 0
	}
}
```

### Login(POST)

```
 http://localhost:3000/api/login
```

| Arguments  | Type     | Description                      |
| :--------- | :------- | :----------------------------    |
| `email`    | `string` | **Required** / userone@gmail.com |
| `password` | `string` | **Required** / min:8 password    |

```
{
	"success": true,
	"message": "Logged in successfully",
	"user": {
		"userId": "6748bd5b197f49fbf0a29e14",
		"email": "userone@gmail.com",
		"name": "userone",
		"createdAt": "2024-11-28T18:58:35.094Z",
		"updatedAt": "2024-11-28T18:58:35.094Z"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ4YmQ1YjE5N2Y0OWZiZjBhMjllMTQiLCJpYXQiOjE3MzI4MjM4OTEsImV4cCI6MTczMjkxMDI5MX0.ZybtGkaFWyYFygQUgFrdRFULv3rdyeZ06lPDBO8r4JA"
}
```

### Logout (POST)

```
    http://localhost:3000/api/logut
```

```
{
	"success": true,
	"message": "Logged out successfully"
}
```

## Item

#### Item Create(POST)

```
  http://localhost:3000/api/create
```

| Arguments               | Type     | Description                              |
| :---------------------- | :------- | :--------------------------------------- |
| `title`                 | `string` | **Required** / Hello                     |
| `description`           | `string` | **Required** / Hello                     |
| `category`              | `string` | **Required** / Hello                     |

```
{
	"success": true,
	"message": "Item created successfully by userone",
	"data": {
		"title": "Hello",
		"description": "hello",
		"category": "Hello",
		"_id": "674a42a84dd46b69ab54e7e8",
		"createdAt": "2024-11-29T22:39:36.505Z",
		"updatedAt": "2024-11-29T22:39:36.505Z",
		"__v": 0
	}
}
```

### Get Item(GET)

```
http://localhost:3000/api/get
```
```
{
	"success": true,
	"message": "Items retrieved successfully",
	"data": [
		{
			"_id": "6748ca9d7d0c629136476e55",
			"title": "Hello",
			"description": "hello",
			"category": "Hello",
			"createdAt": "2024-11-28T19:55:09.162Z",
			"updatedAt": "2024-11-28T19:55:09.162Z",
			"__v": 0
		}
	]
}
```

### GET ITEM ID (GET)

```
    http://localhost:3000/api/get/{id}
```

```
{
	"success": true,
	"message": "A Item get",
	"data": {
		"_id": "6748c8cd6b4235b1955ebd1c",
		"title": "Hello",
		"description": "hello",
		"category": "Hello",
		"createdAt": "2024-11-28T19:47:25.432Z",
		"updatedAt": "2024-11-28T19:47:25.432Z",
		"__v": 0
	}
}
```

 ### Update ITEM (PATCH)

    http://localhost:3000/api/update/{id}
```
```

| Arguments               | Type     | Description                              |
| :---------------------- | :------- | :--------------------------------------- |
| `title`                 | `string` | **Required** / Hi                        |
| `description`           | `string` | **Required** / Hi                        |
| `category`              | `string` | **Required** /san kyi thar update        |

```
{
	"success": true,
	"message": "Item update successfully",
	"data": {
		"_id": "6748c8cd6b4235b1955ebd1c",
		"title": "Hi",
		"description": "Hi",
		"category": "san kyi thar update",
		"createdAt": "2024-11-28T19:47:25.432Z",
		"updatedAt": "2024-11-29T17:44:23.331Z",
		"__v": 0
	}
}
```
### DELETE ITEM ID (DELETE)

```
    http://localhost:3000/api/delete/{id}
```

```
{
	"success": true,
	"message": "Item delete successfully",
}
```
