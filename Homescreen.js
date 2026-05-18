import { Text, View, Pressable } from "react-native";
import { colors } from "./styles";
import { books } from "./books";
import LogoPatternBackground from "./LogoPatternBackground";

const coverColors = [
  colors.accent,
  colors.secondary,
  colors.tertiary,
  colors.primary,
];

export default function HomeScreen({ openBook }) {
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
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          color: colors.text,
          marginTop: 0,
        }}
      >
        GiggleTales
      </Text>

      <Text
        style={{
          fontSize: 18,
          color: colors.mutedText,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Sweet stories for little listeners{"\n"}Turn sound on to enable “Read to me.” 🔊
      </Text>

      <View style={{ marginTop: 32, width: "100%", gap: 16 }}>
        {books.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={() => {
              if (item.book) {
                openBook(item.book);
              }
            }}
            style={{
              backgroundColor: colors.card,
              borderColor: colors.outline,
              borderWidth: 2,
              borderRadius: 22,
              padding: 18,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              minHeight: 120,
              
            }}
          >
            <View
              style={{
               width: 72,
               height: 88,
               borderRadius: 14,
               backgroundColor: coverColors[index % coverColors.length],
               alignItems: "center",
               justifyContent: "center",
               marginRight: 16,
              }}
            >
              <Text style={{ fontSize: 38 }}>{item.coverEmoji}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.text,
                  fontWeight: "bold",
                  opacity: item.book ? 1 : 0.55,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  color: colors.mutedText,
                  marginTop: 4,
                  opacity: item.book ? 1 : 0.55,
                }}
              >
                {item.subtitle}
              </Text>

              <Text
               style={{
                fontSize: 14,
                color: item.book ? colors.text : colors.primary,
                marginTop: 6,
                fontWeight: "bold",               
                }}
              >
  {item.priceType === "free"
  ? "Free"
  : item.priceType === "paid"
  ? "Paid"
  : "Coming Soon"}
  
</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
    </LogoPatternBackground>
  );
}