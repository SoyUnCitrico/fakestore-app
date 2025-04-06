# Fake Store App
App de Store consumiendo FakeStoreAPI

### Diseño de la página en Figma:
[Proyecto en Figma](https://www.figma.com/design/BgHESvjNbWGjyMGl2xHpxE/FakeStore-Final?node-id=1-78&t=Uv5HReghhTQNNhaJ-1)

### React + Typescript + Vite

Para correr el proyecto en local:

``` bash
git clone https://github.com/SoyUnCitrico/fakestore-app.git
cd fakestore-app
npm install
npm run dev
```

Abrir el navegador en:
http://localhost:5173
o
http://127.0.0.1:5173

El proyecto incluye:
1. Aplicación en React.js.
2. Uso de React Hooks (useState, useEffect, useMemo, useRef, custom Hooks)
3. Se usa fetch para consumir la FakeStoreAPI (ver carpeta services)
4. Manejo estados de carga y error
5. Componentes reutilizables
6. Estilizado básico con CSS.
7. Se implemeta routing con React Router.
8. Manejo del estado del carrito con Context API.


### Mejoras pendientes

* Agregar fuentes que se proponen en el diseño.
* Uso de 'localStorage' para persistencia de datos al recargar la página.
* Pantalla de pago de carrito.