# Desafío Coopeuch Frontend

A continuación se presenta la solución (diseño e implementación) del desafío Coopeuch correspondiente al frontend. El desafío consta de una parte en el frontend y una parte en el backend que se puede encontrar [AQUÍ](https://github.com/faqcodes/challenge-coopeuch-backend). El enunciado del desafío se encuentra [AQUÍ](docs/images/challenge.png)

## Diseño

En esta parte del frontend se diseña la interfaz de usuario que permitirá la administración de las tareas. A continuación, se presenta un esquema simple de la interfaz, además de la interacción con Redux y sus Redures/Actions para el manejo de estados:

![Diagrama de la solucion](docs/images/challenge-diagram-01.png)

```
Disclaimer: Como esto es un diseño preliminar, es posible que la interfaz de usuario final no sea como el presentado
```

## Aplicación cliente

Se ha seguido la recomentación de Redux Toolkit para la creación de la app:

``````
The recommended way to start new apps with React and Redux is by using our official Redux+TS template for Vite:

# Vite with our Redux+TS template
# (using the `degit` tool to clone and extract the template)

npx degit reduxjs/redux-templates/packages/vite-template-redux my-app

``````

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

