# us.mem

Juego web mobile-first hecho con React + Vite para una aventura narrativa de aniversario.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Editar recuerdos

El contenido editable vive en `src/data/scenes.js`.

Reemplaza las fotos placeholder en:

```text
public/photos/memory1.jpg
public/photos/memory2.jpg
public/photos/memory3.jpg
public/photos/memory4.jpg
public/photos/memory5.jpg
```

El mensaje final editable está como placeholder en `finalSceneLines`:

```text
[ESCRIBE AQUÍ EL MENSAJE FINAL DE ANIVERSARIO]
```

## Pausas en el texto

Puedes insertar pausas dentro de cualquier texto narrativo usando:

```text
[pause:800]
```

El numero está en milisegundos. Por ejemplo:

```js
"Ian levantó la mirada.[pause:900]\n\nLa pantalla parpadeó."
```

También puedes usar `[pause]`, que aplica una pausa breve por defecto.
