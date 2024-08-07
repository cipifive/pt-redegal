# **Web Marvel Challenge**

## _Para ejecutar el proyecto_

- **npm i.**
  Para instalar las librerías necesarias para el correcto funcionamiento del código
- **npm start.**
  Para iniciar el proyecto en modo desarrollo, sin minimizar los assets. Se podrá acceder al mismo a través de la url http://localhost:5173
- **npm run build.**
  Para generar la versión de producción, donde se minimizan los assets que componen la aplicación, creando una versión optimizada del proyecto en la carpeta `dist`.
- **npm run production.**
  Para ejecutar el modo producción, donde se recogen los assets previamente concatenados y minimizados por el comando `build`, y se sirven de la carpeta `dist` generada. Se puede acceder a través de la url http://localhost:3000
- **npm run test.**
  Para ejecutar los test planteados y comprobar si estos pasan o hay alguna falla en la funcionalidad.

## _Solución propuesta para Web Marvel Challenge_

La aplicación desarrollada consta de la siguiente estructura, obviando los archivos propios de la configuración base del proyecto:

- **`/public`**: Contiene archivos estáticos como `index.html`, que es el punto de entrada HTML de la aplicación. También incluye otros recursos estáticos como las fuentes.

- **`/src`**: Código fuente de la aplicación.
- - **`/assets`**: Contiene arhivos estáticos utilizados por los Componentes de la aplicación.
  - **`/components`**: Componentes reutilizables que forman la UI de la aplicación.
  - **`/config`**: Incluye configuraciones generales de la aplicación. En este caso, la configuración de `axios` para hacer las peticiones a la API
  - **`/constants`**: Incluye constantes utilizadas en la aplicación. En este caso, define los endpoints para cada una de las peticiones realizadas
  - **`/context`**: Configuración del contex de React para la gestión de estados globales.
  - **`/layouts`**: Incluye el componente que envuelve el resto de módulos de la aplicación.
  - **`/models`**: Configuración del tipado de todos las variables de la aplicación (complejos y primitivos).
  - **`/services`**: Arhivos que incluyen las funciones que utilizan axios para llamar a los servicios de la API.
  - **`/pages`**: Componentes que representan páginas completas en la aplicación.
  - **`/styles`**: Archivos CSS para aplicar estilos a la aplicación.
  - **`/utils`**: Utilidades y funciones auxiliares.
  - **`App.tsx`**: Componente raíz que configura el enrutamiento y la estructura general.
  - **`main.tsx`**: Punto de entrada para el código React, renderiza el componente `App` en el DOM.
- **`.env`**: Contiene la API KEY necesaria para hacer peticiones a la API.

A continuación, se detallan las casuísticas más relevantes que han surgido durante el desarrollo del a aplicación:

- Se ha utilizado `react-router-dom` para implementar la parte del routing de la aplicación. Así, se han generado dos paths bien diferenciados : `/` que renderiza la visualización de todos los personaes y `character/:id`, que muestra la información asociada a un personaje en particular.
- Además, tal y como se requería en la prueba, se ha utilizado `ContextAPI` de `React` para la gestión de estados globales. En este caso, gestión de vista de favoritos, obtención y filtrado de personajes.
- El estado global se ha definido con la siguiente estructura:
  - `filteredCharacters` : Almacena el conjunto de personajes filtrados por el buscador de texto
  - `characters`: Total de personajes obtenidos desde la API
  - `favorites` : Almacena los personajes que se van marcando como favoritos
  - `favView`: Indica si en la pantalla principal, el usuario se encuentra en el modo buscador, o modo favoritos
- El archivo `theme.css` dentro del directorio `styles` contiene `Custom Properties` que facilitan la implementación del `CSS` en el código.
- Durante el desarrollo, he experimentado un funcionamiento pésimo de la API de Marvel, obteniendo tiempos de espera muy largos para hacer consultas simples. Es por ello que, se ha implementado una funcionalidad extra, que almacena en el `localStorage` los resultados obtenidos, junto con la fecha y hora en la que se realizó la petición. Se ha configurado la aplicación para que, tan solo se vuelvan a pedir los datos a la API cuando pase un día natural desde la última llamada realizada. De esta manera, se mantiene el dato hidratado y no se realizan tantas peticiones para obtener datos practicamente `estáticos`.
- Se ha configurado axios para introducir en todas las peticiones la `API KEY` de Marvel de manera automática, al final de los query params. De tal manera que si, por algún casual hubiese más de uno en la url, lo añadiría al final con un `&`. En caso contrario, colocaría el símbolo `?`
- Los largos tiempos de respuesta de la API de Marvel han imposibilitado realizar el filtro apoyándose en ella. Con lo que el filtrado se ha realizado plenamente desde el lado del cliente.
- Todas las funciones de apoyo (gestión de peticiones según hidratación del dato y gestión de favoritos) se han almacenado en el directorio `/utils/functions.tsx`. De este modo, se trata de modularizar y reutilizar al máximo el código.
- Para la implementación de los test unitarios se ha utilizado `vitest` y `@testing-library/react`
