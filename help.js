console.log(`
=== Guía de uso de la API ===

Autenticación:
email: 'test@gmail.com',
password: '123456'

Login:
    POST http://localhost:3000/auth/login

    Body (JSON): { "email": "string", "password": "string" }
    -> Devuelve { token }

Productos:
    GET http://localhost:3000/api/products

        -> Lista todos los productos

    GET http://localhost:3000/api/products/:id

        -> Obtiene producto por ID

    POST http://localhost:3000/api/products

        Headers: { "Authorization": "Bearer <token>" }
        Body (JSON): {
            "id": "opcional",
            "name": "string",
            "price": number,
            "stock": number,
            "description": "string"
        }
        -> Crea un producto (requiere token)

    PUT http://localhost:3000/api/products/:id

        Headers: { "Authorization": "Bearer <token>" }
        Body (JSON): {
            "name": "string",
            "price": number,
            "stock": number,
            "description": "string"
        }
        -> Actualiza un producto (requiere token)

    DELETE http://localhost:3000/api/products/:id

        Headers: { "Authorization": "Bearer <token>" }
        -> Elimina producto (requiere token)
`);

