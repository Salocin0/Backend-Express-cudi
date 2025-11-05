# Proyecto APIRest Express

## Estructura base

> este proyecto esta separado en capas (router,controller,service,model)

* **router**:...

* **contreller**: ...

### Patrones

![Patron layered](./img/layered.png)

---

## Proyecto complemetario a Frontend React

[Frontend React](https://github.com/Salocin0/ecommerce-react)

---

## Autores

1. user 1
2. user 2
3. user 3

## CORS

```js

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods:["GET","PUT","POST","DELETE"], //no bloquea directamente sino que es lo que responde al tirar el options
    allowedHeaders: ["Content-Type"]
}
```

> se permite unicamente las peticiones del front

> se requiere que tengan el header Content-Type

>[!WARNING]
>Es Necesario crear un .env con las siguientes configuraciones

```js
PORT=
MONGOURL=
MONGOURLEXT=
```
asdasd


```json
"parameters": [
  {
    "name": "page",
    "in": "query",
    "required": false,
    "schema": {
      "type": "integer",
      "default": 1,
      "minimum": 1
    },
    "description": "Número de página a obtener"
  },
  {
    "name": "limit",
    "in": "query",
    "required": false,
    "schema": {
      "type": "integer",
      "default": 10,
      "minimum": 1,
      "maximum": 100
    },
    "description": "Cantidad de productos por página"
  },
  {
    "name": "category",
    "in": "query",
    "required": false,
    "schema": {
      "type": "string"
    },
    "description": "Filtrar por categoría"
  }
]
```


```json

"parameters": [
  {
    "name": "Authorization",
    "in": "header",
    "required": true,
    "schema": {
      "type": "string"
    },
    "description": "Token de autenticación JWT. Ejemplo: 'eyJhbGci...'",
    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  {
    "name": "X-Request-ID",
    "in": "header",
    "required": false,
    "schema": {
      "type": "string"
    },
    "description": "Identificador único opcional del request para trazabilidad"
  }
]

```