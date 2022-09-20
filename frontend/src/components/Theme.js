import { themeChange } from "theme-change";
import { useEffect } from "react";

const Theme = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <select className="select select-bordered" data-choose-theme>
      <option value="cupcake" className="bg-base-100">
        Cupcake
      </option>
      <option value="retro" className="bg-base-100">
        Retro
      </option>
      <option value="dracula" className="bg-base-100">
        Dracula
      </option>
      <option value="valentine" className="bg-base-100">
        Valentine
      </option>
      <option value="luxury" className="bg-base-100">
        Luxury
      </option>
      <option value="night" className="bg-base-100">
        Night
      </option>
    </select>
  );
};

export default Theme;
