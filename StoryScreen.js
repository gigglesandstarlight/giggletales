import { Text, View, Pressable } from "react-native";
import { colors } from "./styles";
import LogoPatternBackground from "./LogoPatternBackground";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export default function StoryScreen({
  book,
  page,
  setPage,
  isReading,
  setIsReading,
  goHome,
  goCover,
}) {
  const pages = book.pages;
  const isLastPage = page === pages.length - 1;

function stopReading() {
  Speech.stop();
  setIsReading(false);
}

const [sound, setSound] = useState(null);

async function playCurrentPageAudio() {
  stopReading();

  setIsReading(true);

  const { sound: newSound } = await Audio.Sound.createAsync(
    pages[page].audio
  );

  setSound(newSound);

  newSound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) {
      setIsReading(false);
      newSound.unloadAsync();
      setSound(null);
    }
  });

  await newSound.playAsync();
}

async function stopReading() {
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    setSound(null);
  }

  setIsReading(false);
}

useEffect(() => {
  let isMounted = true;
  let currentSound = null;

  async function autoPlay() {
    if (!pages[page]?.audio) return;

    setIsReading(true);

    const { sound: newSound } = await Audio.Sound.createAsync(pages[page].audio);
    currentSound = newSound;
    setSound(newSound);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish && isMounted) {
        setIsReading(false);
        newSound.unloadAsync();
        setSound(null);
      }
    });

    await newSound.playAsync();
  }

  autoPlay();

  return () => {
    isMounted = false;

    if (currentSound) {
      currentSound.unloadAsync();
    }

    setIsReading(false);
  };
}, [page]);

return (
 <LogoPatternBackground>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >

      <View
        style={{
          marginTop: 24,
          width: "100%",
          height: 220,
          backgroundColor: colors.card,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 100, fontWeight: "bold", marginRight: 16 }}>
    {pages[page].letter}  {pages[page].emoji}
  </Text>
      </View>

        <Pressable
          onPress={() => {
            if (isReading) {
              stopReading();
            } else {
              playCurrentPageAudio();
            }
          }}
          style={{
            marginTop: 18,
            backgroundColor: colors.tertiary,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}>
            {isReading ? "🔴 Stop Reading" : "🟢 Read to Me"}
          </Text>
        </Pressable>

      <View
        style={{
          marginTop: 24,
          backgroundColor: colors.outline,
          borderRadius: 24,
          padding: 24,
          width: "100%",
          minHeight: 200,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: colors.text,
            textAlign: "center",
            lineHeight: 30,
          }}
        >
          {pages[page].text}
        </Text>
      </View>

      <Text style={{ marginTop: 16, color: colors.text }}>
        Page {page + 1} of {pages.length}
      </Text>

      {isLastPage && (
        <Pressable
          onPress={() => {
            stopReading();
            setPage(0);
            goCover();
          }}
          style={{
            marginTop: 16,
            backgroundColor: colors.tertiary, 
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}>
            🔁 Read Again
          </Text>
        </Pressable>
      )}

      <View style={{ flexDirection: "row", gap: 12, marginTop: 28 }}>
        {page > 0 && (
          <Pressable
            onPress={() => {
              stopReading();
              setPage(Math.max(page - 1, 0));
            }}
            style={{
              backgroundColor: colors.outline,
              padding: 16,
              borderRadius: 18,
              width: 150,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 18 }}>
              ← Previous
            </Text>
          </Pressable>
        )}

        <Pressable
          onPress={() => {
            stopReading();

            if (isLastPage) {
              goHome();
            } else {
              setPage(page + 1);
            }
          }}
          style={{
            backgroundColor: colors.primary,
            padding: 16,
            borderRadius: 18,
            width: 150,
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 18 }}>
            {isLastPage ? "The End" : "Next →"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => {
          stopReading();
          goHome();
        }}
        style={{ marginTop: 24 }}
      >
      <Text style={{ color: "#3b2430" }}>Back to Home</Text>
    </Pressable>
    
    </View>
  </LogoPatternBackground>
  );
}