import { Quote } from '../types';

export const MOTIVATIONAL_QUOTES: Quote[] = [
  {
    id: 1,
    text: "La disciplina tarde o temprano vencerá a la inteligencia.",
    author: "Proverbio Japonés",
  },
  {
    id: 2,
    text: "No cuentes los días, haz que los días cuenten.",
    author: "Muhammad Ali",
  },
  {
    id: 3,
    text: "Somos lo que hacemos día a día. La excelencia, no es un acto, sino un hábito.",
    author: "Aristóteles",
  },
  {
    id: 4,
    text: "Un pequeño avance cada día suma grandes resultados al final del año.",
    author: "James Clear",
  },
  {
    id: 5,
    text: "El dolor de la disciplina pesa onzas; el dolor del arrepentimiento pesa toneladas.",
    author: "Jim Rohn",
  },
  {
    id: 6,
    text: "No tienes que ser extremo, solo tienes que ser consistente.",
    author: "Anónimo",
  },
  {
    id: 7,
    text: "El estudio no es una obligación, sino una oportunidad para penetrar en el bello mundo del saber.",
    author: "Albert Einstein",
  },
  {
    id: 8,
    text: "La suerte favorece a la mente preparada.",
    author: "Louis Pasteur",
  },
  {
    id: 9,
    text: "No temas avanzar despacio; teme únicamente quedarte quieto.",
    author: "Proverbio Chino",
  },
  {
    id: 10,
    text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    author: "Robert Collier",
  },
  {
    id: 11,
    text: "Cada página que lees hoy construye tu libertad de mañana.",
    author: "RACHA Motivación",
  },
  {
    id: 12,
    text: "La diferencia entre quien eres y quien quieres ser es lo que haces hoy.",
    author: "Bill Phillips",
  },
  {
    id: 13,
    text: "Primero hacemos nuestros hábitos, y luego nuestros hábitos nos hacen a nosotros.",
    author: "John Dryden",
  },
  {
    id: 14,
    text: "La perseverancia puede transformar el fracaso en un logro extraordinario.",
    author: "Matt Biondi",
  },
  {
    id: 15,
    text: "Tu futuro se decide por lo que haces en este momento, no mañana.",
    author: "Robert Kiyosaki",
  },
  {
    id: 16,
    text: "Si te cansas, aprende a descansar, no a renunciar.",
    author: "Banksy",
  },
  {
    id: 17,
    text: "La motivación te pone en marcha; el hábito te mantiene avanzando.",
    author: "Jim Ryun",
  },
  {
    id: 18,
    text: "El conocimiento es la única riqueza de la que los tiranos no pueden despojarte.",
    author: "Antístenes",
  },
  {
    id: 19,
    text: "Un día o el día uno. Tú decides.",
    author: "Paulo Coelho",
  },
  {
    id: 20,
    text: "No te compares con los demás; compárate con quien eras ayer.",
    author: "Jordan Peterson",
  },
  {
    id: 21,
    text: "La energía y la persistencia conquistan todas las cosas.",
    author: "Benjamin Franklin",
  },
  {
    id: 22,
    text: "Cada sesión de estudio es un voto a favor de la persona en la que te quieres convertir.",
    author: "James Clear",
  },
  {
    id: 23,
    text: "El fuego no se apaga mientras sigas alimentando la llama.",
    author: "RACHA Motivación",
  },
  {
    id: 24,
    text: "Trabaja en silencio, deja que tu éxito haga todo el ruido.",
    author: "Frank Ocean",
  },
  {
    id: 25,
    text: "Invertir en conocimiento siempre produce los mejores intereses.",
    author: "Benjamin Franklin",
  },
  {
    id: 26,
    text: "Lo que se hace con paciencia y constancia se graba para siempre.",
    author: "Séneca",
  },
  {
    id: 27,
    text: "La mente que se abre a una nueva idea jamás vuelve a su tamaño original.",
    author: "Oliver Wendell Holmes",
  },
  {
    id: 28,
    text: "Mantener la racha no es suerte, es una decisión diaria.",
    author: "RACHA",
  }
];

export function getRandomQuote(excludeId?: number): Quote {
  const available = excludeId !== undefined 
    ? MOTIVATIONAL_QUOTES.filter(q => q.id !== excludeId)
    : MOTIVATIONAL_QUOTES;
  
  if (available.length === 0) return MOTIVATIONAL_QUOTES[0];
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}
