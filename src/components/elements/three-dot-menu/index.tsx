import React, { useState, useEffect } from "react";
import "./styles.scss";

type PropType = {
  items: string[];
  handleClick: (text: string) => void;
};

const ThreeDotMenu: React.FC<PropType> = (props) => {
  const { items, handleClick } = props;

  const [menuOpen, setMenuOpen] = useState(false);

  const onMenuItemClick = (item: string) => {
    handleClick(item);
    setMenuOpen(false);
  };

  useEffect(() => {
    const listener = (evt: any) => {
      const menu: any = document.querySelector(".three-dot-menu_items");
      const insideMenu = menu ? menu.contains(evt.target) : null;
      if (!insideMenu && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);

  return (
    <div className="three-dot-menu">
        <button
          className="three-dot-menu_button"
          onClick={() => setMenuOpen(!menuOpen)}
        ></button>
        {menuOpen ? (
          <div className="three-dot-menu_items">
            {items.map((item) => (
              <div
                className="three-dot-menu_items_item"
                key={item}
                onClick={() => onMenuItemClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}
    </div>
  );
};

export default ThreeDotMenu;
