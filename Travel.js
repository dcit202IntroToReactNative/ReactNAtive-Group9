import { FontAwesome, Octicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";

const THEME = {
  SIZES: {
    base: 16,
    font: 14,
    padding: 36,
    margin: 36,
    title: 24,
    radius: 12,
  },
  COLORS: {
    black: "#000",
    white: "#FFF",
    gray: "#DCE0E9",
    caption: "#BCCCD4",
    active: "#007BFA",
  },
};

const { width } = Dimensions.get("window");

const mockData = [
  {
    id: 1,
    user: {
      name: "Lelia Chavez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    saved: true,
    location: "Santorini, Greece",
    temperature: 34,
    title: "Santorini",
    description:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
    rating: 4.3,
    reviews: 3212,
    preview:
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 2,
    user: {
      name: "Lelia Chavez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    saved: false,
    location: "Loutraki, Greece",
    temperature: 34,
    title: "Loutraki",
    description: "This attractive small town, 80 kilometers from Athens",
    rating: 4.6,
    reviews: 3212,
    preview:
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 3,
    user: {
      name: "Lelia Chavez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    saved: true,
    location: "Santorini, Greece",
    temperature: 34,
    title: "Santorini",
    description: "Santorini - Description",
    rating: 3.2,
    reviews: 3212,
    preview:
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 4,
    user: {
      name: "Lelia Chavez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    location: "Loutraki, Greece",
    temperature: 34,
    title: "Loutraki",
    description: "This attractive small town, 80 kilometers from Athens",
    rating: 5,
    reviews: 3212,
    preview:
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

const Dots = ({ dots = [], scrollX = 0 }) => {
  const dotPosition = Animated.divide(scrollX, width);

  return (
    <View
      style={[
        styles.flex,
        styles.row,
        { justifyContent: "center", alignItems: "center", marginTop: 10 },
      ]}>
      {dots.map((item, index) => {
        const borderWidth = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 2.5, 0],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`step-${index}`}
            style={[styles.dots, styles.activeDot, { borderWidth }]}
          />
        );
      })}
    </View>
  );
};

const Rating = ({ value = 0, max = 5 }) => {
  const stars = new Array(max).fill(0);

  return stars.map((_, index) => {
    const activeStar = Math.floor(value) >= index + 1;
    return (
      <FontAwesome
        name="star"
        key={`star-${index}`}
        size={THEME.SIZES.font}
        color={THEME.COLORS[activeStar ? "active" : "gray"]}
      />
    );
  });
};

const Destination = ({ item = {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
      <ImageBackground
        style={[styles.flex, styles.destination, styles.shadow]}
        imageStyle={{ borderRadius: THEME.SIZES.radius }}
        source={{ uri: item.preview }}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ flex: 0 }}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          </View>
          <View style={[styles.column, { flex: 2, paddingHorizontal: THEME.SIZES.padding / 2 }]}>
            <Text style={{ color: THEME.COLORS.white, fontWeight: "bold" }}>{item.user.name}</Text>
            <Text style={{ color: THEME.COLORS.white }}>
              <Octicons name="location" size={THEME.SIZES.font * 0.8} color={THEME.COLORS.white} />
              <Text> {item.location}</Text>
            </Text>
          </View>
          <View
            style={{
              flex: 0,
              justifyContent: "center",
              alignItems: "flex-end",
            }}>
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
        <Text
          style={{
            fontSize: THEME.SIZES.font * 1.25,
            fontWeight: "500",
            paddingBottom: 8,
          }}>
          {item.title}
        </Text>
        <View style={[styles.row, { justifyContent: "space-between", alignItems: "flex-end" }]}>
          <Text style={{ color: THEME.COLORS.caption }}>
            {item.description.split("").slice(0, 50)}...
          </Text>
          <FontAwesome
            name="chevron-right"
            size={THEME.SIZES.font * 0.75}
            color={THEME.COLORS.caption}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Destinations = ({ destinations = mockData }) => {
  const scrollX = new Animated.Value(0);
  const dots = new Array(destinations.length).fill(0);

  return (
    <View style={[styles.column, styles.destinations]}>
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        data={destinations}
        decelerationRate={0}
        snapToAlignment="center"
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={{ overflow: "visible", height: 280 }}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        renderItem={({ item }) => <Destination item={item} />}
      />
      <Dots dots={dots} scrollX={scrollX} />
    </View>
  );
};

const Recommendation = ({ index = 0, item = {}, isLastItem = false }) => {
  return (
    <View
      style={[
        styles.flex,
        styles.column,
        styles.shadow,
        styles.recommendation,
        index === 0 ? { marginLeft: THEME.SIZES.margin } : null,
        isLastItem ? { marginRight: THEME.SIZES.margin / 2 } : null,
      ]}>
      <View style={[styles.flex, styles.recommendationHeader]}>
        <Image style={[styles.recommendationImage]} source={{ uri: item.preview }} />
        <View style={[styles.flex, styles.row, styles.recommendationOptions]}>
          <Text style={styles.recommendationTemp}>{item.temperature}℃</Text>
          <FontAwesome
            color={THEME.COLORS.white}
            size={THEME.SIZES.font * 1.25}
            name={item.saved ? "bookmark" : "bookmark-o"}
          />
        </View>
      </View>
      <View
        style={[
          styles.flex,
          styles.column,
          styles.shadow,
          { justifyContent: "space-evenly", padding: THEME.SIZES.padding / 2 },
        ]}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: THEME.SIZES.font * 1.25,
            paddingBottom: THEME.SIZES.padding / 4.5,
          }}>
          {item.title}
        </Text>
        <Text style={{ color: THEME.COLORS.caption }}>{item.location}</Text>
        <View
          style={[
            styles.row,
            {
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: THEME.SIZES.margin,
            },
          ]}>
          <Rating value={item.rating} />
          <Text style={{ color: THEME.COLORS.active }}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );
};

const Recommendations = ({ destinations = mockData }) => {
  return (
    <View style={[styles.flex, styles.column]}>
      <View style={[styles.row, styles.recommendedHeader]}>
        <Text style={{ fontSize: THEME.SIZES.font * 1.4 }}>Recommended</Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text style={{ color: THEME.COLORS.caption }}>More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          data={destinations}
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          style={[styles.shadow, { overflow: "visible" }]}
          renderItem={({ item, index }) => (
            <Recommendation
              item={item}
              index={index}
              isLastItem={index === destinations.length - 1}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Travel = ({ destinations = mockData, navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTransparent: false,
        headerTitle: () => (
          <View>
            <Text style={{ fontSize: 12, color: THEME.COLORS.caption }}>Search for place</Text>
            <Text style={{ fontSize: 16 }}>Destination</Text>
          </View>
        ),
        headerRight: () => (
          <Image
            style={styles.avatar}
            source={{
              uri: "https:randomuser.me/api/portraits/women/32.jpg",
            }}
          />
        ),
      });
    }, [])
  );

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: THEME.SIZES.padding }}>
        <Destinations destinations={destinations} />
        <Recommendations destinations={destinations} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  header: {
    backgroundColor: THEME.COLORS.white,
    paddingHorizontal: THEME.SIZES.padding,
    paddingTop: THEME.SIZES.padding * 1.33,
    paddingBottom: THEME.SIZES.padding * 0.66,
    justifyContent: "space-between",
    alignItems: "center",
  },
  destinations: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  destination: {
    width: width - THEME.SIZES.padding * 2,
    height: width * 0.6,
    marginHorizontal: THEME.SIZES.margin,
    paddingHorizontal: THEME.SIZES.padding,
    paddingVertical: THEME.SIZES.padding * 0.66,
    borderRadius: THEME.SIZES.radius,
  },
  destinationInfo: {
    position: "absolute",
    borderRadius: THEME.SIZES.radius,
    paddingHorizontal: THEME.SIZES.padding,
    paddingVertical: THEME.SIZES.padding / 2,
    bottom: 20,
    left: (width - THEME.SIZES.padding * 4) / (Platform.OS === "ios" ? 3.2 : 3),
    backgroundColor: THEME.COLORS.white,
    width: width - THEME.SIZES.padding * 4,
  },
  recommendedHeader: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: THEME.SIZES.padding,
  },
  recommendation: {
    width: (width - THEME.SIZES.padding * 2) / 2,
    marginHorizontal: 8,
    backgroundColor: THEME.COLORS.white,
    overflow: "hidden",
    borderRadius: THEME.SIZES.radius,
    marginVertical: THEME.SIZES.margin * 0.5,
  },
  recommendationHeader: {
    overflow: "hidden",
    borderTopRightRadius: THEME.SIZES.radius,
    borderTopLeftRadius: THEME.SIZES.radius,
  },
  recommendationOptions: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: THEME.SIZES.padding / 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: THEME.SIZES.font * 1.25,
    color: THEME.COLORS.white,
  },
  recommendationImage: {
    width: (width - THEME.SIZES.padding * 2) / 2,
    height: (width - THEME.SIZES.padding * 2) / 2,
  },
  avatar: {
    width: THEME.SIZES.padding,
    height: THEME.SIZES.padding,
    borderRadius: THEME.SIZES.padding / 2,
    marginRight: 12,
  },
  rating: {
    fontSize: THEME.SIZES.font * 2,
    color: THEME.COLORS.white,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: THEME.COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: THEME.COLORS.gray,
    borderColor: "transparent",
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: THEME.COLORS.active,
  },
});
