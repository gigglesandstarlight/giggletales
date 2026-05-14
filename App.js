import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import {princessBook} from "./GiggleTales/Book01";
import {alphabetBook} from "./GiggleTales/AlphabetBook"
import HomeScreen from "./GiggleTales/Homescreen";
import CoverScreen from "./GiggleTales/CoverScreen";
import StoryScreen from "./GiggleTales/StoryScreen";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [page, setPage] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(princessBook);

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
        setIsReading();
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