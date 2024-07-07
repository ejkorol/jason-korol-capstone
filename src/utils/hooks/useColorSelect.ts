import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const initialColor = "#212121";
const dark = "#212121";
const light = "#fafafa";

function useColorSelect() {

  const [ color, setColor ] = useState(initialColor);
  const { theme } = useTheme();

  useEffect(() => {
    colorSelect()
  }, [theme]);

  function colorSelect() {
    if (theme === "dark") {
      setColor(light);
    } else {
      setColor(dark)
    };
  };

  return { color };

};

export default useColorSelect;
