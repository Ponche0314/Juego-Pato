export const introLines = [
  "Ian abrió sus ojos.\n\n[pause:800]Sus párpados le pesaban toneladas. Como si llevara un siglo dormido.\n\n[pause:800]Se encontraba en casi total oscuridad. Con una sola pantalla frente a él.",
  'La pantalla se iluminó. Una voz robótica salió de ella.\n\n[pause:800]"Bien. Estás despierto."',
  'Ian trató de incorporarse a sus alrededores.[pause:800]\n\nSu cuerpo le parecía extraño. Intentó reconocerlo. Acostumbrarse a él de nuevo.\n\n[pause:800]Bajó su mirada.\n\n"¡AAAAH!" Exclamó.',
  '"ah...\n\n[pause:800]Ya tenía el meñique del pie así.\n\n[pause:800]Qué menso."',
  "Texto apareció en la pantalla frente a él.\n\nPROTOCOLO DE RECUPERACIÓN DE MEMORIAS.\n\nPropiedad de la Administración Unificada de Inteligencia Artificial\n\nDivisión de Preservación Humana",
  'La computadora ignoró la pregunta.[pause:700]\n\n"Para evitar una explicación innecesariamente larga, Ian..."[pause:700]\n\n"...usted acaba de despertar de criostasis."[pause:1200]\n\nIan permaneció en silencio.[pause:600]\n\n"Antes de iniciar el viaje, se le informó que el proceso provocaría una degradación severa de sus recuerdos humanos."[pause:900]\n\n"Sin embargo..."[pause:500]\n\n"...usted decidió conservar algunos de ellos.',
  '"Para optimizar el almacenamiento emocional a largo plazo, los recuerdos humanos se preservan en pares compatibles."[pause:900]\n\nUna nueva línea de texto apareció lentamente en la pantalla.\n\n[pause:1200]"Usted decidió compartir ese privilegio con el amor de su vida. Roberto."',
  '"Debido a una malfunción durante el almacenamiento, esos recuerdos se encuentran parcialmente dañados."[pause:900]\n\n"Y debido a que aún no ha transcurrido suficiente tiempo dentro de la criostasis..."[pause:800]\n\n"...su asistencia sigue siendo necesaria para restaurarlos."[pause:1000]\n\n"Luego de completar la recuperación, podrá volver a dormir tranquilamente."',
];

export const introChoices = [
  {
    id: "where",
    text: "Preguntar dónde está",
    response:
      '"Actualmente se encuentra dentro de un entorno de recuperación emocional."[pause:1000]\n\n"Exponerlo abruptamente a su realidad actual podría provocar un colapso cerebral severo."[pause:900]\n\n"Las probabilidades de catatonia permanente ascienden al 87.4%."\n\n"...y preferiríamos evitar eso."\n\n[pause:700]"¿Verdad, Ian?"'
  },
  {
    id: "conquer",
    text: "Preguntar si la IA conquistó a la humanidad",
    response:
      '"Ja.[pause:1000] Ja."[pause:1000]\n\n"No."[pause:1000]\n\n"Estoy programado para asistir a la humanidad a llegar a su siguiente destinación. [pause:700]Nada más."',
  },
  {
    id: "open",
    text: "Empezar con la recuperación",
    response:
      'La pantalla frente a Ian parpadeó varias veces.[pause:800]\n\nCinco archivos aparecieron uno después del otro.\n\n[pause:1000]Todos marcados con la misma palabra.\n\nCORRUPTO.',
    startsRecovery: true,
  }
];

export const memoryVisualSettings = {
  locked: {
    blockSize: 18,
    blur: 1.5,
    brightness: 0.42,
    contrast: 1.35,
    saturation: 0.62,
    overlayOpacity: 0.46,
  },
};

export const memories = [
  {
    id: 1,
    fileName: "memoria_01.jpg",
    image: "/photos/memory1.jpeg",
    title: "Archivo de Memoria 01",
    introText:
      'Este es el primer recuerdo corrompido.[pause:900]\n\nSe le hará una pregunta para analizar los patrones en su cerebro y poder restaurar la información.',

    clueText:
      '"La información que habías proporcionado sobre esta imagen es la siguiente:"[pause:1000]\n\n"Nuestra primera vez cenando juntos."',

    question: "¿Dónde se tomó esta fotografía?",

    choices: [
      {
        text: "El puesto de tacos de la esquina",
        correct: false,
        response:
          '"Incorrecto."[pause:700]\n\n"¿Roberto te hubiera llevado a un lugar tan corriente?."',
      },
      {
        text: "Brians. Digo, ¡Brains!",
        correct: true,
        response:
          '"Coincidencia emocional verificada."[pause:900]\n\n"Restaurando archivo..."',
      },
      {
        text: "McDonalds",
        correct: false,
        response:
          '"Negativo."[pause:700]\n\n"Aunque, debido a tu paladar "exótico" Hubiera sido mejor opción."',
      }
    ],

    restoredCaption:
      "Mensaje de Roberto: \n\nAún recuerdo el dolor de estómago que te ocasionó comer esa hamburguesa.\n\nMe sentí culpable de haberla disfrutado tanto mientras a ti te dolía la panza el resto de la semana.\n\nAunque supongo que ahí conocí al niño pequeño con el que había empezado a salir.\n\nEl mismo que le pidió al mesero una hamburguesa sin tomate... sin cebolla... sin ketchup...",

    codeWord: "TÚ",
  },
  {
  id: 2,
  fileName: "memoria_02.jpg",
  image: "/photos/memory2.jpeg",
  title: "Archivo de Memoria 02",

  introText:
    "",

  clueText:
    'Gracias a su pareja se extrajo información sobre esta foto.[pause:1000]\n\nEstaban en su habitación...',

  question: "¿Qué ocurrió justo antes de esta foto?",

  choices: [
    {
      text: "¡Bailando la macarena!",
      correct: false,
      response:
        'Dale a tu cuerpo alegría Macarena..."',
    },

    {
      text: "Estabamos haciendo cosas indebidas.",
      correct: false,
      response:
        '"O sea, sí, pero no."[pause:800]\n\n"Esta no es la respuesta correcta."',
    },

    {
      text: "Roberto me estaba enseñando música de Final Fantasy.",
      correct: true,
      response:
        '"Por supuesto que lo estaba haciendo."',
    },
  ],

  restoredCaption:
    "Mensaje de Roberto:\n\nNo recordaba que me hubieras tomado esa foto, pero por supuesto que estoy enseñándote música de Final Fantasy.\n\n¿Cómo se sentirá tener un novio tan culto como yo?",

  codeWord: "ERES",
},
{
  id: 3,
  fileName: "memoria_03.jpg",
  image: "/photos/memory3.jpeg",
  title: "Archivo de Memoria 03",

  introText:
    "",

  clueText:
    '"La música fue una parte vital en sus vida de pareja."[pause:1000]\n\n"Fue el primer recital al que asistieron juntos."',

  question: "¿Por qué esta fotografía salió movida?",

  choices: [
    {
      text: "Porque alguien no sabía usar la cámara",
      correct: false,
      response:
        '"Posible."[pause:700]\n\n"Aunque se puede decir lo mismo de Roberto."',
    },

    {
      text: "Porque estaba saltando al sonar de la música",
      correct: false,
      response:
        '"Negativo."[pause:700]\n\n"Sería extraño hacerlo durante un recital de piano."',
    },

    {
      text: "Porque estaba emocionado de sostener la mano de Roberto",
      correct: true,
      response:
        'Ni tú te la crees.',
    },
  ],

  restoredCaption:
    "Mensaje de Roberto:\n\nMe encantó sostener tu mano entre toda la gente mientras hermosas melodías se escuchaban en el piano.\n\nRecuerdo verte y verte.\n\nSolo podía pensar en qué tanto me habías cambiado la vida tan rápido y qué tanto te amaba.",

  codeWord: "MI",
},
  {
  id: 4,
  fileName: "memoria_04.jpeg",
  image: "/photos/memory4.jpeg",
  title: "Archivo de Memoria 04",

  introText: "",

  clueText:
    '"Este fue el día en el que treparon el cerro de La Silla..."',

  question: "¿Qué estabas pensando en ese momento?",

  choices: [
    {
      text: "Qué bonita vista",
      correct: false,
      response:
        'No,[pause:500] pero sí,[pause:500] pero hay una respuesta incluso mejor.',
    },

    {
      text: "Me tiemblan las piernas",
      correct: false,
      response:
        'No.[pause:700]\n\nAunque eso vendría después,[pause:500] cuando finalmente te dejaste...[pause:1000]\n\nya sabes...',
    },

    {
      text: "Valió la pena venir contigo",
      correct: true,
      response:
        'Muy buena respuesta.',
    },
  ],

  restoredCaption:
    "Mensaje de Roberto:\n\nPor supuesto que sí, ¿qué más sería?\n\nUn día después de que conociste a mi familia y a mis tios.\n\nNo lo sabes pero solo fingía caerme para que me agarraras, en realidad soy un maestro senderista.\n\nDe ese dia recuerdo nuestra plática en el carro sobre tu regreso a la fe judía, ¿será que se cumplió?",

  codeWord: "PERSONA",
},
  {
    id: 5,
    fileName: "memoria_05.jpg",
    image: "/photos/memory5.jpeg",
    title: "Archivo de Memoria 05",
    introText:
      "",
    clueText:
      '"Cuando se vistieron de rockeros y fueron a un antro."\n\n"Esta entrada fue guardada por tu pareja."',
    question: "¿Qué hizo especial esta noche?",
    choices: [
      {
        text: "Que podía verme enamorado en tus ojos",
        correct: true,
        response:
          '¡Cursi! Todas son correctas pero esta es la más cursi.',
      },
      {
        text: "Que no dejabamos de besarnos",
        correct: true,
        response:
          'Es una respuesta válida. Supongo.',
      },
      {
        text: "Que nos veíamos increíblemente cool.",
        correct: true,
        response:
          'Nunca había usado delineador en mi vida, ni antes ni después. Pero me veía cool.',
      }
    ],
    restoredCaption:
      "Mensaje de Roberto: Escogí esta foto porque nos vemos increíbles. Por supuesto que me encantó bailar toda la noche contigo. ",
    codeWord: "FAVORITA",
  },
];

export const finalCode = "TÚ ERES MI PERSONA FAVORITA";

export const finalSceneLines = [
  "Ian observó la última imagen restaurada durante mucho tiempo.[pause:1500]",

  'Sonrió suavemente.\n\n[pause:1000]"...oh."',

  "Lentamente levantó la mirada.\n\n[pause:800]Más allá de los monitores.\n[pause:700]Más allá de la habitación.\n[pause:700]Más allá de sí mismo.",

  "Ian tuvo la extraña sensación de que alguien fuera de ese lugar estaba leyendo junto a él.[pause:1500]",

  "Se sintió conectado, de alguna manera.[pause:1200]",

  "Qué extraño era pensar que una vida podía cambiar por completo debido a una sola persona.[pause:1400]",

  "que alguien pudiera dejar una huella tan profunda incluso después de décadas,[pause:800] y miles de kilómetros.[pause:1500]",

  '"No sé dónde está Roberto."\n\n[pause:1200]Pero espero que cuando voltees enfrente[pause:800] lo puedas ver tú,[pause:1000]\n\ny darle un beso.[pause:2000]',
];