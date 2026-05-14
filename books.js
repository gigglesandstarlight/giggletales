import { dragonBook } from "./Book01";
import { alphabetBook } from "./AlphabetBook";
import { catBook } from "./catBook";

export const books = [
  {
    id: "abc-book",
    title: "The GiggleTales ABCs",
    subtitle: "A silly alphabet book with emojis",
    coverEmoji: "🔤",
    priceType: "free",
    productId: null,
    book: alphabetBook,
  },
  {
    id: "sleepy-dragon",
    title: "The Sleepy Dragon",
    subtitle: "A tiny tale from the Kingdom of Giggles",
    coverEmoji: "🐉",
    priceType: "free",
    productId: null,
    book: dragonBook,
  },
  {
    id: "cat-book",
    title: "The Royal Cat",
    subtitle: "A tiny tale from the Kingdom of Giggles",
    coverEmoji: "🐱",
    priceType: "free",
    productId: null,
    book: catBook,
  },
  {
    id: "princess-princess",
    title: "Princess Princess",
    subtitle: "A tiny tale from the Kingdom of Giggles",
    coverEmoji: "👑",
    priceType: "comingSoon",
    productId: null,
    book: null,
  },
];