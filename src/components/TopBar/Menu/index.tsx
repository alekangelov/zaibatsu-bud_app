import * as React from "react";

interface SingleMenu {
  title: string | JSX.Element;
  onClick?: (event: React.MouseEvent) => any;
  disabled?: boolean;
  children?: SingleMenu[];
}

interface MenuProps {
  menu: Array<SingleMenu | null>;
}

const Menu: React.FC<MenuProps> = ({ menu }) => {
  return (
    <div className="topbar-menu">
      {menu.map((singleMenu, index) => {
        if (!singleMenu) return null;
        return (
          <button
            disabled={singleMenu.disabled}
            onClick={singleMenu.onClick}
            key={`thisIsbadButWhatever-${index}`}
            className="topbar-menu_item"
          >
            {singleMenu.title}
          </button>
        );
      })}
    </div>
  );
};

export default Menu;
