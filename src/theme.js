import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textAppBar: "white",
    primary: "#0366d6",
    appBarBackground: "#24292e",
    repositoryItem: "white",
    backgroundMain: "#e1e4e8",
    repositoryItemName: "black",
    errorTextColor: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      andoird: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};
export default theme;
