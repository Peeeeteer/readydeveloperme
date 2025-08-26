import React from "react";
import { useStore } from "../store/store";
import classNames from "classnames";

import IconCamera from "../assets/icons/IconCamera";

type Mode = "front" | "side" | "close_up" | "free";

type Props = {
  mode: Mode;
  onClickMode: (mode: Mode) => void;
};

const MobileViewMode: React.FC<Props> = ({ mode, onClickMode }) => {
  const theme = useStore((state) => state.theme);

  const modes = [
    { id: "front" as Mode, label: "Front" },
    { id: "side" as Mode, label: "Side" },
    { id: "close_up" as Mode, label: "Close Up" },
  ];

  return (
    <div className="flex items-center justify-center space-x-2 px-4">
      {modes.map((modeOption) => (
        <button
          key={modeOption.id}
          className={classNames(
            "flex items-center space-x-2 px-3 py-2 rounded-full border text-sm font-medium transition-all",
            {
              "bg-primary": mode === modeOption.id,
              "border-primary": mode === modeOption.id,
              "text-white": mode === modeOption.id,
              "border-neutral-30": mode !== modeOption.id && theme === "light",
              "border-neutral-80": mode !== modeOption.id && theme === "dark",
              "text-[#121F3E]": mode !== modeOption.id && theme === "light",
              "text-white": mode !== modeOption.id && theme === "dark",
              "bg-white": mode !== modeOption.id && theme === "light",
              "bg-[#2A2B2F]": mode !== modeOption.id && theme === "dark",
            }
          )}
          type="button"
          onClick={() => onClickMode(modeOption.id)}
        >
          <IconCamera
            className="w-4 h-4"
            fill={mode === modeOption.id ? "white" : "#6D7D93"}
          />
          <span>{modeOption.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileViewMode;
