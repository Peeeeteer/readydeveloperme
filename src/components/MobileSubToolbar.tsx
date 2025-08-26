import React, { SVGProps, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { motion, AnimatePresence } from "framer-motion";

import { useStore } from "../store/store";

type SubTool = {
  id: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
  name?: string;
};

type Tool = {
  id: string;
  label: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
  items: SubTool[];
};

type SubToolColor = {
  subToolId: string;
  color: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  subToolId: string;
  tool: Tool;
  colors: SubToolColor[];
  onClickItem: (subTool: SubTool) => void;
  onChangeColor?: (color: SubToolColor) => void;
  setViewMode?: (viewMode: string) => void;
};

const MobileSubToolbar: React.FC<Props> = ({
  isOpen,
  onClose,
  subToolId,
  tool,
  colors,
  onClickItem,
  onChangeColor,
  setViewMode,
}) => {
  const [isColorPaletteShow, setIsColorPaletteShow] = useState(false);
  const [activeColorItem, setActiveColorItem] = useState<string>("");
  const theme = useStore((state) => state.theme);

  const hasColorPalette = tool.id === "tool_2";

  // Camera movement logic - same as desktop SubToolbar
  const prevToolId = useRef(tool.id);
  useEffect(() => {
    if (!setViewMode) return;

    if (tool.id === "pose") {
      if (prevToolId.current === "tool_2" || prevToolId.current === "pose" || prevToolId.current === "lights") {
        return;
      }
      setViewMode("front");
    }
    if (tool.id === "tool_2") {
      if (prevToolId.current === "tool_2" || prevToolId.current === "pose" || prevToolId.current === "lights") {
        return;
      }
      else setViewMode("front");
    }
    if (tool.id === "hair") {
      if (prevToolId.current === "hair" || prevToolId.current === "beard" || prevToolId.current === "face" || prevToolId.current === "glasses" || prevToolId.current === "hats") {
        return;
      }
      setViewMode("close_up");
    }
    if (tool.id === "beard") {
      if (prevToolId.current === "hair" || prevToolId.current === "beard" || prevToolId.current === "face" || prevToolId.current === "glasses" || prevToolId.current === "hats") {
        return;
      }
      setViewMode("close_up");
    }
    if (tool.id === "face") {
      if (prevToolId.current === "hair" || prevToolId.current === "beard" || prevToolId.current === "face" || prevToolId.current === "glasses" || prevToolId.current === "hats") {
        return;
      }
      setViewMode("close_up");
    }
    if (tool.id === "glasses") {
      if (prevToolId.current === "hair" || prevToolId.current === "beard" || prevToolId.current === "face" || prevToolId.current === "glasses" || prevToolId.current === "hats") {
        return;
      }
      setViewMode("close_up");
    }
    if (tool.id === "lights") {
      if (prevToolId.current === "tool_2" || prevToolId.current === "pose" || prevToolId.current === "lights") {
        return;
      }
      else setViewMode("front");
    }
    if (tool.id === "logo") {
      setViewMode("logo");
    }
    if (tool.id === "hats") {
      if (prevToolId.current === "hair" || prevToolId.current === "beard" || prevToolId.current === "face" || prevToolId.current === "glasses" || prevToolId.current === "hats") {
        return;
      }
      setViewMode("close_up");
    }
    prevToolId.current = tool.id;
  }, [tool.id, setViewMode]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - only for poses */}
          {tool.id === "pose" && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}
          

          
          {/* Panel */}
          <motion.div
            className={classNames(
              "fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl max-h-[80vh] overflow-hidden",
              {
                "bg-white": theme === "light",
                "bg-[#2A2B2F]": theme === "dark",
              }
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-30">
              <h3
                className={classNames("text-lg font-semibold", {
                  "text-[#121F3E]": theme === "light",
                  "text-white": theme === "dark",
                })}
              >
                {tool.label}
              </h3>
              {/* Hide X button when in color picker mode */}
              {!(isColorPaletteShow && hasColorPalette && activeColorItem) && (
                <button
                  onClick={onClose}
                  className={classNames(
                    "w-8 h-8 flex items-center justify-center rounded-full",
                    {
                      "bg-neutral-10": theme === "light",
                      "bg-neutral-80": theme === "dark",
                    }
                  )}
                >
                  <span className="text-xl leading-none">&times;</span>
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {/* Show color picker if active, otherwise show item grid */}
              {isColorPaletteShow && hasColorPalette && activeColorItem ? (
                /* Color Picker - Replaces the grid */
                <div className="flex flex-col h-full">
                  {/* Header with current color preview */}
                  <div className="flex items-center justify-between mb-6">
                    <h4
                      className={classNames("text-lg font-semibold", {
                        "text-[#121F3E]": theme === "light",
                        "text-white": theme === "dark",
                      })}
                    >
                      Choose Color
                    </h4>
                    <div
                      className="w-12 h-12 rounded-xl border-2 border-white shadow-lg"
                      style={{ backgroundColor: colors.find(c => c.subToolId === activeColorItem)?.color || "#94A3B8" }}
                    />
                  </div>
                  
                  {/* Color Picker - centered and larger */}
                  <div className="flex-1 flex flex-col items-center justify-center mb-6">
                    <div className="w-full max-w-80">
                      <HexColorPicker
                        color={colors.find(c => c.subToolId === activeColorItem)?.color || "#94A3B8"}
                        onChange={(color) => {
                          onChangeColor?.({
                            subToolId: activeColorItem,
                            color,
                          });
                        }}
                        style={{ width: "100%", height: "280px" }}
                      />
                    </div>
                  </div>
                  
                  {/* Done Button - fixed at bottom */}
                  <div className="mt-auto">
                    <button
                      onClick={() => setIsColorPaletteShow(false)}
                      className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-xl hover:bg-primary/90 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>✓ Done</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Item Grid */
                <div className="grid grid-cols-4 gap-3">
                  {tool.items.map((item) => {
                    const isLogoUpload = item.id === "logo_upload";
                    const isActive = subToolId === item.id;
                    const Icon = item.icon;

                    const color = (() => {
                      const customColor = colors.find(
                        (color) => color.subToolId === item.id
                      )?.color;

                      if (hasColorPalette) {
                        return customColor;
                      }

                      return isActive ? "#4B50EC" : "#94A3B8";
                    })();

                    return (
                      <div key={item.id} className="flex flex-col items-center">
                        <button
                          className={classNames(
                            "w-16 h-16 flex items-center justify-center rounded-2xl border",
                            {
                              "border-primary": isActive,
                              "bg-white": isActive && theme === "light",
                              "bg-[#1A1B1F]": isActive && theme === "dark",
                              "border-neutral-30": !isActive && theme === "light",
                              "border-neutral-80": !isActive && theme === "dark",
                            }
                          )}
                          type="button"
                          onClick={() => {
                            onClickItem(item);
                            if (hasColorPalette) {
                              setActiveColorItem(item.id);
                              setIsColorPaletteShow(true);
                            } else {
                              // Only auto-close for poses
                              if (tool.id === "pose") {
                                onClose();
                              }
                            }
                          }}
                        >
                          <Icon className="w-10 h-10" fill={color} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>


        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSubToolbar;
