import { Text, View, Pressable, ScrollView } from "react-native";
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
          paddingTop: 55,
          padding: 24,
        }}
      >
      <View
          style={{
            marginHorizontal: 24,
            backgroundColor: colors.card,
            borderColor: colors.outline,
            borderWidth: 2,
            borderRadius: 24,
            paddingVertical: 20,
            paddingHorizontal: 18,
            alignItems: "center",
          }}
        >
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          color: colors.purple,
          marginTop: 0,
        }}
      >
        GiggleTales
      </Text>

      <Text
        style={{
          fontSize: 18,
          color: colors.primary,
          marginTop: 0,
          textAlign: "center",
        }}
      >
        Sweet stories for little listeners
      </Text>

      <Text
        style={{
          fontSize: 18,
          color: colors.text,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Turn sound on to enable “Read to me.” 🔊
      </Text>
      </View>

       <ScrollView
          style={{
            flex: 1,
            width: "100%",
            marginTop: 24,
          }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 50,
            gap: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
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
                  backgroundColor:
                    coverColors[index % coverColors.length],
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 38 }}>
                  {item.coverEmoji}
                </Text>
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
                    color: item.book
                      ? colors.text
                      : colors.primary,
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
        </ScrollView>
      </View>
    </LogoPatternBackground>
  );
}