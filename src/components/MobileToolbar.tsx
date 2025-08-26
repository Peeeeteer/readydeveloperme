import React, { SVGProps } from "react";
import { useStore } from "../store/store";
import classNames from "classnames";

type SubTool = {
  id: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
};

type Tool = {
  id: string;
  label: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
  items: SubTool[];
};

type Props = {
  toolId: string;
  items: Tool[];
  onClickItem: (tool: Tool) => void;
};

const MobileToolbar: React.FC<Props> = ({ toolId, items, onClickItem }) => {
  const theme = useStore((state) => state.theme);

  return (
    <div className="w-full px-6 py-5">
      <div 
        className={classNames(
          "flex items-center gap-x-5 overflow-x-auto scrollbar-hide px-5 py-5 rounded-2xl",
          {
            "bg-neutral-10": theme === "light",
            "bg-[#2A2B2F]": theme === "dark",
          }
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((tool) => {
          const isActive = toolId === tool.id;
          const Icon = tool.icon;

          return (
            <div key={tool.id} className="flex flex-col items-center flex-shrink-0">
              <button
                className={classNames(
                  "w-16 h-16 flex items-center justify-center rounded-xl border mb-2",
                  {
                    "border-primary": isActive,
                    "bg-white": isActive,
                    "border-neutral-30": !isActive && theme === "light",
                    "border-neutral-80": !isActive && theme === "dark",
                  }
                )}
                type="button"
                onClick={() => onClickItem(tool)}
              >
                <Icon
                  className="w-8 h-8"
                  fill={isActive ? "#4B50EC" : "#6D7D93"}
                />
              </button>
              <p
                className={classNames(
                  "text-xs font-medium text-center",
                  {
                    "text-[#121F3E]": theme === "light",
                    "text-white": theme === "dark",
                  }
                )}
              >
                {tool.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileToolbar;
