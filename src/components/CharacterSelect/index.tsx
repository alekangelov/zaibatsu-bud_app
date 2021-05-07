import * as React from "react";
import useAppSelector from "../../global/helpers/useAppSelector";
import { Character } from "../../global/reducers/mainReducerTypes";
import clsx from "clsx";
import { useHistory } from "react-router";
import { useTransition, a } from "@react-spring/web";
import getPublic from "../../utils/getPublic";

const CharacterSelect: React.FC = () => {
  const characters = useAppSelector((state) => state.characters);
  const [selectedCharacter, setSelectedCharacter] = React.useState<Character>(
    characters[0]
  );
  const { push } = useHistory();
  const handleClick = React.useCallback(
    (id) => {
      return () => push(`/character/${id}`);
    },
    [push]
  );
  const transition = useTransition(selectedCharacter, {
    keys: selectedCharacter.id,
    initial: null,
    expires: true,
    from: {
      opacity: 0,
      transform: `translate(-50%, 0%)`,
    },
    enter: {
      opacity: 1,
      transform: `translate(0%, 0%)`,
    },
    leave: {
      opacity: 0,
      transform: `translate(50%, 0%)`,
    },
  });
  return (
    <div className="c-select">
      {transition((style, item, t, i) => {
        return (
          <div className="c-select_bg">
            <div className="c-select_title">
              <a.h1 className="impact" style={{ opacity: style.opacity }}>
                {item && item.name}
              </a.h1>
            </div>
            <a.div
              style={{ opacity: style.opacity }}
              className="c-select_bg--overlay"
            ></a.div>
            {item && (
              <a.img
                style={style}
                src={getPublic(item?.image)}
                alt={item?.name}
              />
            )}
          </div>
        );
      })}
      <div className="c-select_inner">
        {characters.map((singleCharacter) => {
          const isSelected = singleCharacter.id === selectedCharacter?.id;
          return (
            <div
              key={`singleChar__${singleCharacter.id}`}
              className={clsx("c-select_single", isSelected && "selected")}
              onMouseEnter={() => setSelectedCharacter(singleCharacter)}
              onClick={handleClick(singleCharacter.id)}
            >
              <div className="c-select_single--container">
                <div className="c-select_single--bg"></div>
                <div className="c-select_single--inner">
                  <div className="c-select_single--inner__overlay"></div>
                  {singleCharacter.thumb &&
                    singleCharacter.thumb !== "/images/characters/" && (
                      <img
                        src={getPublic(singleCharacter.thumb)}
                        alt={singleCharacter.name}
                      />
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterSelect;
