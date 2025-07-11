import { createContext } from "react";
import { ColorTheme } from "../types/ColorTheme";

export const ColorThemeContext = createContext<ColorTheme>("dark");
