import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { dragonBook } from "./DragonBook.js";
import {alphabetBook} from "./AlphabetBook.js"
import {catBook} from "./catBook.js"
import HomeScreen from "./Homescreen.js";
import CoverScreen from "./CoverScreen.js";
import StoryScreen from "./StoryScreen.js";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [page, setPage] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(dragonBook);

if (screen === "cover") {
  return (
    <CoverScreen
      book={selectedBook}
      startStory={() => {
        setIsReading(false);
        setPage(0);
        setScreen("story");
      }}
      goHome={() => {
        setIsReading(false);
        setPage(0);
        setScreen("home");
      }}
    />
  );
}

if (screen === "story") {
  return (
    <StoryScreen
      book={selectedBook}
      page={page}
      setPage={setPage}
      isReading={isReading}
      setIsReading={setIsReading}
      goHome={() => {
        setIsReading(false);
        setPage(0);
        setScreen("home");
      }}
      goCover={() => {
        setIsReading(false);
        setScreen("cover");
      }}
    />
  );
}

return (
  <HomeScreen
    openBook={(book) => {
      setSelectedBook(book);
      setIsReading(false);
      setPage(0);
      setScreen("cover");
    }}
  />
);
}