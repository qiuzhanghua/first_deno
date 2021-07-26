# First_Deno

## 安装Deno

https://deno.land/#installation

## 安装SQLite3

https://sqlite.org/

## 安装HTTPie

https://httpie.io/

## 初始化数据库

```bash
deno run --allow-read --allow-env --allow-write init-sqlite3.ts
```

## 运行服务端

```bash
deno run --allow-read --allow-env --allow-write --allow-net server.ts
```

## 检验数据处理操作是否正常

### 插入数据

```bash
http POST :8080/users name=admin email=admin@example.com
```

```text
HTTP/1.1 200 OK
content-length: 78
content-type: application/json; charset=utf-8

{
    "affectedRows": 1,
    "email": "admin@example.com",
    "lastInsertId": 1,
    "name": "admin"
}
```

```bash
http POST :8080/users name=Daniel email=qiuzhanghua@icloud.com
```

```text
HTTP/1.1 200 OK
content-length: 84
content-type: application/json; charset=utf-8

{
    "affectedRows": 1,
    "email": "qiuzhanghua@icloud.com",
    "lastInsertId": 2,
    "name": "Daniel"
}
```

```bash
http POST :8080/users name=Daniel email=qiuzhanghua@icloud.com
```

```text
content-length: 42
content-type: application/json; charset=utf-8

{
    "error": {
        "code": 19,
        "name": "SqliteError"
    }
}
```

### 查询数据

```bash
http :8080/users
```

```text
HTTP/1.1 200 OK
content-length: 247
content-type: application/json; charset=utf-8

[
    {
        "createdAt": "2021-07-26 02:39:26",
        "email": "admin@example.com",
        "id": 1,
        "name": "admin",
        "updatedAt": "2021-07-26 02:39:26"
    },
    {
        "createdAt": "2021-07-26 02:40:35",
        "email": "qiuzhanghua@icloud.com",
        "id": 2,
        "name": "Daniel",
        "updatedAt": "2021-07-26 02:40:35"
    }
]
```

```bash
http :8080/users/1
```

```text
content-length: 119
content-type: application/json; charset=utf-8

{
    "createdAt": "2021-07-26 02:39:26",
    "email": "admin@example.com",
    "id": 1,
    "name": "admin",
    "updatedAt": "2021-07-26 02:39:26"
}
```

```bash
http :8080/users/99
```

```text
HTTP/1.1 404 Not Found
content-length: 15
content-type: application/json; charset=utf-8

{
    "userId": "99"
}
```

### PUT

```bash
http PUT :8080/users/2 name=邱张华 email=qiuzhanghua@icloud.com
```

```text
HTTP/1.1 200 OK
content-length: 128
content-type: application/json; charset=utf-8

{
    "createdAt": "2021-07-26 02:40:35",
    "email": "qiuzhanghua@icloud.com",
    "id": 2,
    "name": "邱张华",
    "updatedAt": "2021-07-26 02:40:35"
}
```

```bash
http PUT :8080/users/99 name=邱张华 email=qiuzhanghua@icloud.com
```

```text
HTTP/1.1 500 Internal Server Error
content-length: 42
content-type: application/json; charset=utf-8

{
    "error": {
        "code": 19,
        "name": "SqliteError"
    }
}
```

```bash
http PUT :8080/users/99 name=qiuzhanghua email=qiuzhanghua99@icloud.com
```

仅仅为了测试，一般情况下PUT应该提供正确的ID

```text
HTTP/1.1 200 OK
content-length: 91
content-type: application/json; charset=utf-8

{
    "affectedRows": 1,
    "email": "qiuzhanghua99@icloud.com",
    "lastInsertId": 3,
    "name": "qiuzhanghua"
}
```

```bash
http :8080/users
```

```text
HTTP/1.1 200 OK
content-length: 387
content-type: application/json; charset=utf-8

[
    {
        "createdAt": "2021-07-26 02:39:26",
        "email": "admin@example.com",
        "id": 1,
        "name": "admin",
        "updatedAt": "2021-07-26 02:39:26"
    },
    {
        "createdAt": "2021-07-26 02:40:35",
        "email": "qiuzhanghua@icloud.com",
        "id": 2,
        "name": "邱张华",
        "updatedAt": "2021-07-26 10:47:40.719"
    },
    {
        "createdAt": "2021-07-26 02:53:05",
        "email": "qiuzhanghua99@icloud.com",
        "id": 3,
        "name": "qiuzhanghua",
        "updatedAt": "2021-07-26 02:53:05"
    }
]
```

### DELETE

```bash
http DELETE :8080/users/99
```

```text
HTTP/1.1 404 Not Found
content-length: 0
```

```bash
http DELETE :8080/users/3
```

```text
HTTP/1.1 200 OK
content-length: 14
content-type: application/json; charset=utf-8

{
    "userId": "3"
}
```

### 再检验

```nashorn js
http :8080/users
```

```text
HTTP/1.1 200 OK
content-length: 254
content-type: application/json; charset=utf-8

[
    {
        "createdAt": "2021-07-26 02:39:26",
        "email": "admin@example.com",
        "id": 1,
        "name": "admin",
        "updatedAt": "2021-07-26 02:39:26"
    },
    {
        "createdAt": "2021-07-26 02:40:35",
        "email": "qiuzhanghua@icloud.com",
        "id": 2,
        "name": "邱张华",
        "updatedAt": "2021-07-26 10:47:40.719"
    }
]
```
