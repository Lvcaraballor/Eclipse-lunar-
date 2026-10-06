---
name: remotion-explicador-educativo
description: 'Crea videos educativos con Remotion a partir de un README o material de investigación. Úsalo para animar diagramas históricos, explicar conceptos científicos y preparar una vista previa en Remotion Studio.'
---

# Crear un video explicativo con Remotion

## Cuándo usarlo

- Convertir un README o apuntes de investigación en una composición de video educativo.
- Crear una explicación visual de un diagrama histórico, una idea científica o un proceso.

## Procedimiento

1. Lee el material fuente y determina la audiencia, la idea principal y qué puede afirmarse con respaldo. No inventes hechos ni detalles visuales.
2. Comprueba `node --version`, `npm --version` y `git --version`. Si Node.js no está instalado, instala una versión LTS antes de continuar.
3. Comprueba si las skills de Remotion están disponibles. Si faltan y el usuario autoriza su instalación global, ejecuta `npx -y skills@latest add remotion-dev/skills -g -y` y revisa las instrucciones instaladas de creación, composición, marcado y vista previa.
4. Inspecciona el workspace, incluidos los archivos ocultos. Si contiene material del proyecto y no existe una app de Remotion, crea la app en una subcarpeta con `npx create-video@latest --yes --blank --no-tailwind <nombre>` y ejecuta `npm install` dentro de ella. No sobrescribas contenido existente.
5. Abre Remotion Studio tan pronto como el scaffold esté listo. Mantén la vista previa disponible mientras desarrollas la composición.
6. Diseña escenas legibles para video, con un foco visual por escena, zonas seguras para texto y animaciones impulsadas por `useCurrentFrame()` e `interpolate()`. Usa escenas separadas para conceptos sucesivos y atribuye las fuentes en pantalla o en los materiales del proyecto cuando corresponda.
7. Comprueba la composición en Studio y corrige errores de compilación o problemas de encuadre. Renderiza un archivo de salida solo cuando el usuario pida exportar o un video final.

## Criterios de calidad

- La secuencia comunica una idea principal y distingue contexto, explicación y conclusión.
- Los textos son legibles y no se salen del área segura.
- El movimiento se basa en el reloj de Remotion, no en animaciones CSS que no se reflejan al renderizar.
- La composición carga en Studio y su contenido respeta el material y las fuentes disponibles.