import { Text, View, Pressable } from "react-native";
import { useEffect, useRef } from "react";
import { Audio } from "expo-av";

import { colors } from "./styles";
import LogoPatternBackground from "./LogoPatternBackground";

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
  const currentPage = pages[page];
  const isLastPage = page === pages.length - 1;

  const soundRef = useRef(null);
  const playbackIdRef = useRef(0);

  async function stopReading() {
    playbackIdRef.current += 1;

    const currentSound = soundRef.current;
    soundRef.current = null;

    if (currentSound) {
      try {
        currentSound.setOnPlaybackStatusUpdate(null);
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
      } catch (error) {
        console.log("Audio stop error:", error);
      }
    }

    setIsReading(false);
  }

  async function playCurrentPageAudio() {
    const playbackId = playbackIdRef.current + 1;
    playbackIdRef.current = playbackId;

    const previousSound = soundRef.current;
    soundRef.current = null;

    if (previousSound) {
      try {
        previousSound.setOnPlaybackStatusUpdate(null);
        await previousSound.unloadAsync();
      } catch (error) {
        console.log("Previous audio cleanup error:", error);
      }
    }

    const audioFile = currentPage?.audio;

    if (!audioFile) {
      console.log("No audio found for page:", page + 1);
      setIsReading(false);
      return;
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(audioFile, {
        shouldPlay: true,
      });

      if (playbackIdRef.current !== playbackId) {
        await newSound.unloadAsync();
        return;
      }

      soundRef.current = newSound;
      setIsReading(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.error) {
          console.log(
            `Audio playback error on page ${page + 1}:`,
            status.error
          );
        }

        if (
          status.didJustFinish &&
          soundRef.current === newSound &&
          playbackIdRef.current === playbackId
        ) {
          soundRef.current = null;
          newSound.setOnPlaybackStatusUpdate(null);

          newSound.unloadAsync().catch((error) => {
            console.log("Finished audio cleanup error:", error);
          });

          setIsReading(false);
        }
      });
    } catch (error) {
      console.log(`Unable to play audio on page ${page + 1}:`, error);

      if (playbackIdRef.current === playbackId) {
        soundRef.current = null;
        setIsReading(false);
      }
    }
  }

  useEffect(() => {
    playCurrentPageAudio();

    return () => {
      playbackIdRef.current += 1;

      const currentSound = soundRef.current;
      soundRef.current = null;

      if (currentSound) {
        currentSound.setOnPlaybackStatusUpdate(null);

        currentSound.unloadAsync().catch((error) => {
          console.log("Page cleanup error:", error);
        });
      }
    };
  }, [page, book]);

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
          <Text
            style={{
              fontSize: 100,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {currentPage?.letter || ""} {currentPage?.emoji || ""}
          </Text>
        </View>

        <Pressable
          onPress={async () => {
            if (isReading) {
              await stopReading();
            } else {
              await playCurrentPageAudio();
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
          <Text
            style={{
              color: colors.text,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
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
            {currentPage?.text}
          </Text>
        </View>

        <Text
          style={{
            marginTop: 16,
            color: colors.card,
          }}
        >
          Page {page + 1} of {pages.length}
        </Text>

        {isLastPage && (
          <Pressable
            onPress={async () => {
              await stopReading();
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
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              🔁 Read Again
            </Text>
          </Pressable>
        )}

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginTop: 28,
          }}
        >
          {page > 0 && (
            <Pressable
              onPress={async () => {
                await stopReading();
                setPage(page - 1);
              }}
              style={{
                backgroundColor: colors.outline,
                padding: 16,
                borderRadius: 18,
                width: 150,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                ← Previous
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={async () => {
              await stopReading();

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
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {isLastPage ? "The End" : "Next →"}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={async () => {
            await stopReading();
            goHome();
          }}
          style={{
            marginTop: 24,
          }}
        >
          <Text style={{ 
            color: "#FFFFFF",
            fontWeight: "bold",
           }}
          >
          Back to Home 🏠</Text>
        </Pressable>
      </View>
    </LogoPatternBackground>
  );
}