import { createContext } from "react";
import { colorThemeType } from "../types/ColorTheme";

export const ColorThemeContext = createContext<colorThemeType>("dark");
