export const FRAME_COUNT = 204;

export const framePath = (n: number, mobile = false) => {
  const folder = mobile ? "frames-mobile" : "frames";
  return `/${folder}/frame_${String(n).padStart(4, "0")}.jpg`;
};

export type Dialogue = {
  id: string;
  show: number;
  hide: number;
  quote: string;
  speaker: string;
  film: string;
};

export const DIALOGUES: Dialogue[] = [
  {
    id: "d1",
    show: 0.1,
    hide: 0.3,
    quote: "Console travando? A gente resolve. Diagnóstico grátis.",
    speaker: "Electro Games",
    film: "SERVIÇOS ESPECIALIZADOS",
  },
  {
    id: "d2",
    show: 0.35,
    hide: 0.55,
    quote: "PS5, Xbox Series, Switch. Os melhores consoles, os melhores preços.",
    speaker: "Electro Games",
    film: "CONSOLES — NOVOS E SEMINOVOS",
  },
  {
    id: "d3",
    show: 0.6,
    hide: 0.8,
    quote: "Cada detalhe importa. Sua experiência gamer no próximo nível.",
    speaker: "Electro Games",
    film: "LOJA GAMER — DESDE 2020",
  },
];

export const HERO_TEXT_FADE_END = 0.08;
