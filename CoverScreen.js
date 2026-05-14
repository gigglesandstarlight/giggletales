import { Text, View, Pressable } from "react-native";
import { colors } from "./styles";
import LogoPatternBackground from "./LogoPatternBackground";

export default function CoverScreen({ book, startStory, goHome }) {
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
          width: "100%",
          backgroundColor: colors.card,
          borderColor: colors.primary,
          borderWidth: 2,
          borderRadius: 28,
          padding: 32,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 64 }}>{book.coverEmoji}</Text>

        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: colors.text,
            textAlign: "center",
            marginTop: 16,
          }}
        >
          {book.title}
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: colors.text,
            textAlign: "center",
            marginTop: 12,
          }}
        >
          {book.subtitle}
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: colors.mutedText,
            textAlign: "center",
            marginTop: 10,
            fontStyle: "italic",
          }}
        >
          by GiggleTales
        </Text>

        <Pressable
          onPress={startStory}
          style={{
            marginTop: 32,
            backgroundColor: colors.primary,
            paddingVertical: 16,
            paddingHorizontal: 28,
            borderRadius: 18,
          }}
        >
          <Text style={{ fontSize: 18, color: "#3b2430", fontWeight: "bold" }}>
            Start Story
          </Text>
        </Pressable>

        <Pressable onPress={goHome} style={{ marginTop: 20 }}>
          <Text style={{ color: "#3b2430" }}>Back to Home</Text>
        </Pressable>
      </View>
    </View>
   </LogoPatternBackground>
  );
}