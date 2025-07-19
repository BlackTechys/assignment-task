import type { ThemeConfig } from "antd";

/**
 * Custom Hook - useTheme
 * Provides theme configurations for different parts of the application.
 *
 * @returns {{ themeConfig: ThemeConfig }} Theme configurations.
 */
export const useTheme = () => {
  const themeConfig: ThemeConfig = {
    components: {
      Radio: {
        colorPrimary: "#2332c4",
      },
    },
  };

  return { themeConfig };
};
