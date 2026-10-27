# AGENTS.md

## Visión general

Este repositorio documenta y materializa un video educativo sobre el diagrama lunar atribuido a Abu Rayhan al-Biruni, en el marco del libro *100 Diagrams That Changed the World* de Scott Christianson. El objetivo principal es explicar, de forma visual y didáctica, cómo un diagrama geométrico puede funcionar como herramienta para comprender la Luna, la geometría y el conocimiento científico.

El proyecto combina:

- un marco documental y narrativo en español,
- una referencia visual histórica sobre el manuscrito de al-Biruni,
- y una implementación técnica en Remotion para generar un video vertical de estilo editorial y educativo.

## Resumen del proyecto

El repositorio está organizado en dos niveles:

1. La raíz del repositorio contiene documentación general y material de referencia.
2. La carpeta `albiruni-lunar-video` contiene la implementación real del video en Remotion.

El proyecto produce un video explicativo en formato vertical 9:16 (1080 × 1920), con una duración aproximada de 55,5 segundos, dividida en cinco escenas:

- apertura,
- contexto histórico de al-Biruni,
- esquema orbital,
- fases lunares,
- cierre con idea principal y fuente.

## Estructura del repositorio

```text
Eclipse-lunar-/
├── AGENTS.md                     # Instrucciones para agentes y contexto del proyecto
├── README.md                    # Resumen general del proyecto y contexto histórico
├── Docs/
│   ├── Guion.md                 # Guion de la locución y estructura narrativa
│   ├── Locucion1.mp3            # Archivo de audio original preservado
│   └── diagrama-lunar-al-biruni-contexto.png
│                               # Imagen de referencia del contexto visual
├── albiruni-lunar-video/
│   ├── README.md                # Documentación técnica del proyecto Remotion
│   ├── package.json             # Dependencias y scripts de ejecución
│   ├── package-lock.json
│   ├── remotion.config.ts       # Configuración de Remotion
│   ├── tsconfig.json
│   ├── .gitignore
│   ├── .prettierrc
│   ├── public/
│   │   ├── locucion1.mp3        # Audio final usado por el video
│   │   └── lunar-phases-al-biruni-reference.jpg
│   │                             # Referencia visual de fases lunares
│   ├── src/
│   │   ├── Composition.tsx      # Secuencias y composición principal
│   │   ├── ManuscriptScenes.tsx # Escenas visuales principales
│   │   ├── Root.tsx             # Registro de composiciones en Remotion
│   │   ├── Scenes.tsx           # Utilidades visuales y estilo compartido
│   │   └── index.ts             # Entrada de la app Remotion
│   ├── build/                   # Salida de compilación local
│   ├── out/                     # Exportaciones de vídeo y previews generados
│   └── node_modules/            # Dependencias instaladas
```

## Propósito y enfoque editorial

El proyecto no pretende ser un facsímil histórico ni una reconstrucción literal de manuscritos antiguos. Es una recreación gráfica educativa inspirada en la estética de manuscritos, con un tratamiento visual sobrio y una narrativa clara.

Puntos clave:

- la composición se apoya en un fondo pergamino, tipografía serif y composición editorial,
- las fases lunares se representan como diagramas geométricos,
- se valoran la claridad, la didáctica y la fidelidad a la idea científica,
- la atribución del diagrama se mantiene con cautela y contexto histórico.

## Stack tecnológico

El proyecto principal de video se implementa con:

- Remotion 4
- React 19
- TypeScript
- ESLint
- Prettier

## Cómo ejecutar el proyecto

Desde la carpeta `albiruni-lunar-video`:

```bash
npm install
npm run dev
```

Esto abre Remotion Studio para previsualizar la composición. La composición principal es:

- `DiagramaLunarDeAlBiruni`

También se registran escenas individuales como:

- `Apertura`
- `AlBiruni`
- `EsquemaOrbital`
- `FasesLunares`
- `IdeaYFuente`

## Cómo exportar el video

Para renderizar una exportación MP4:

```bash
npx remotion render DiagramaLunarDeAlBiruni out/diagrama-lunar-al-biruni-vertical.mp4
```

El proyecto ya incluye archivos renderizados en `albiruni-lunar-video/out/`.

## Scripts disponibles

En `albiruni-lunar-video/package.json`:

```json
{
  "scripts": {
    "dev": "remotion studio",
    "build": "remotion bundle",
    "upgrade": "remotion upgrade",
    "lint": "eslint src && tsc"
  }
}
```

## Documentación relevante

- `README.md` en la raíz: contexto histórico y presentación general.
- `albiruni-lunar-video/README.md`: guía de vista previa y exportación del video.
- `Docs/Guion.md`: texto y estructura de la locución.
- `Docs/diagrama-lunar-al-biruni-contexto.png`: referencia visual del proyecto.

## Normas para modificaciones

Cuando trabajes en este repositorio, procura:

- mantener el tono educativo y visual del proyecto,
- preservar referencias históricas y atribuciones cautelosas,
- no alterar el audio original de la locución salvo que se indique específicamente,
- mantener la estética de manuscrito y la composición vertical 9:16,
- usar el lenguaje español del proyecto y evitar cambios innecesarios de estilo o narrativa,
- validar cambios visuales con Remotion Studio y la comprobación de lint cuando proceda.

## Observaciones técnicas

- La duración total del video está encajada en 1665 frames a 30 fps, equivalente aproximadamente a 55,5 segundos.
- Se usa `Audio` de Remotion con `public/locucion1.mp3`.
- La interactividad principal del proyecto se basa en la composición de secuencias de Remotion y no en lógica compleja de estado.
- No hay una suite de tests tradicional configurada; la validación principal es visual y de compilación/lint.

## Ideas de mantenimiento

Si se quiere ampliar o revisar el proyecto en el futuro, los puntos más relevantes son:

- ajustar la secuencia narrativa o el guion,
- mejorar la composición visual de las escenas,
- refinar la sincronización con la locución,
- sustituir o añadir nuevas referencias históricas,
- exportar versiones alternativas (por ejemplo, versión más larga o con distinta paleta).

## Conclusión

Este repositorio es un proyecto de comunicación visual y educativa centrado en la relación entre ciencia, geometría y diagramas. Su valor principal está en convertir un conocimiento técnico y antiguo en una experiencia visual comprensible, moderna y atractiva para el público contemporáneo.
