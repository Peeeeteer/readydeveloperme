import { ChangeEvent, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from 'three'

import ThemeToggle from "./components/ThemeToggle";
import ViewMode from "./components/ViewMode";
import { useStore } from "./store/store";
import classNames from "classnames";
import Logo from "./assets/icons/Logo";
import Toolbar from "./components/Toolbar";
import { getToolbarData } from "./helpers/data";
import SubToolbar from "./components/SubToolbar";
import IconMenu from "./assets/icons/IconMenu";
import ManualPopup from "./components/ManualPopup";
import Camera from "./components/Camera";
import Character from "./components/Character";
import Loader from "./components/Loader";
import Ground from "./components/Ground";
import { useControls } from "leva";
import Lights from "./components/Lights";
import { Analytics } from "@vercel/analytics/react";
import { Leva } from 'leva'
import MobileToolbar from "./components/MobileToolbar";
import MobileSubToolbar from "./components/MobileSubToolbar";
import MobileViewMode from "./components/MobileViewMode";

type Mode = "front" | "side" | "close_up" | "free";



export default function App() {


  // Change to "false" if you want hide/reveal version of the toolbar.
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<Mode>("front");
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isMobileSubToolbarOpen, setIsMobileSubToolbarOpen] = useState(false);
  const theme = useStore((state) => state.theme);
  const isDesktop = useMediaQuery({ query: "(min-width: 960px)" });
  const refLogoInput = useRef<HTMLInputElement>(null);

  const [debuggerVisible, setDebuggerVisible] = useState(true)


  const [visible, setVisible] = useState(true)
  const tools = getToolbarData();

  const [tool, setTool] = useState(tools[0]);

  const { opacity, blur, scale, far } =
    useControls('Ground Shadows', {
      opacity: { value: 0.7, step: 0.05 },
      scale: { value: 2, step: 0.05 },
      blur: { value: 3.5, step: 0.05 },
      far: { value: 1.2, step: 0.05 },
    })



  // It has this format (you can see data.ts):
  // tool.id: tool.items.id
  const [selected, setSelected] = useState<Record<string, string>>({})

  // Tool 2 subtool colors. Set default color state here.
  const [subToolColors, setSubToolColors] = useState(
    tools[1].items.map((item) => {
      if (item.id === "tool_2_item_1") {
        return {
          subToolId: item.id,
          color: "#131313",
        };
      }
      if (item.id === "tool_2_item_2") {
        return {
          subToolId: item.id,
          color: "#131313",
        };
      }
      if (item.id === "tool_2_item_3") {
        return {
          subToolId: item.id,
          color: "#d8d8d8",
        };
      }

      if (item.id === "tool_2_item_4") {
        return {
          subToolId: item.id,
          color: "#ffffff",
        };
      }
      if (item.id === "tool_2_item_5") {
        return {
          subToolId: item.id,
          color: "#aabef9",
        };
      }
      if (item.id === "tool_2_item_6") {
        return {
          subToolId: item.id,
          color: "#768bca",
        };
      }

      if (item.id === "tool_2_item_8") {
        return {
          subToolId: item.id,
          color: "#ffffff",
        };
      }

      if (item.id === "tool_2_item_9") {
        return {
          subToolId: item.id,
          color: "#4e5a87",
        };
      }

      if (item.id === "tool_2_item_10") {
        return {
          subToolId: item.id,
          color: "#3a4673",
        };
      }

      if (item.id === "tool_2_item_11") {
        return {
          subToolId: item.id,
          color: "#ffffff",
        };
      }

      if (item.id === "tool_2_item_12") {
        return {
          subToolId: item.id,
          color: "#3a4673",
        };
      }

      return {
        subToolId: item.id,
        color: "#141414",
      };


    })
  );

  const toolItems = useMemo(() => {

    return tools.map((tool) => {
      if (tool.id === "tool_2") {
        return tool;
      }

      const subToolId = selected[tool.id];

      const icon =
        tool.items.find((item) => item.id === subToolId)?.icon || tool.icon;

      return { ...tool, icon };
    });
  }, [selected, tools]);

  const trayWidth = 3.5 * tools.length + 1 * (tools.length - 1);



  //Logo Section
  const defaultLogo = new THREE.TextureLoader().load("images/logo.png")
  const [logo, setLogo] = useState(defaultLogo)

  const handlePickedLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];


    if (!file) {
      return;
    } else if (file.type !== "image/png") {
      alert("Only .png files are allowed");
      return;
    }

    // // if all is good, setLogo to the new logo
    setLogo(new THREE.TextureLoader().load(URL.createObjectURL(file)))

    if (refLogoInput.current) {
      refLogoInput.current.value = ''
    }

    setSelected({
      ...selected,
      logo: 'logo_1'
    })
  }

  // Initialize selected tool. Select what you want to be selected by default.
  useEffect(() => {
    const newSelected: Record<string, string> = {}

    for (const tool of tools) {

      if (tool.id === "hair") {
        newSelected[tool.id] = "hair_1"
        continue
      }

      if (tool.id === "glasses") {
        newSelected[tool.id] = "glasses_1"
        continue
      }

      if (tool.id === "beard") {
        newSelected[tool.id] = "beard_1"
        continue
      }

      if (tool.id === "logo") {
        newSelected[tool.id] = "logo_1"
        continue
      }

      if (tool.id === "lights") {
        newSelected[tool.id] = "lights_1"
        continue
      }

      if (tool.id === "pose") {
        newSelected[tool.id] = "pose_crossed_arm"
        continue
      }


      newSelected[tool.id] = tool.items[0].id
    }

    setSelected(newSelected)
  }, [])


  // Download pose as png
  const DownloadPose = () => {


    setVisible(false)
    // Set view mode to "front" and wait for 1 second
    setViewMode("front")
    setTimeout((

    ) => {
      const canvas = document.querySelector("canvas");

      if (!canvas) {
        return;
      }
      // const image = canvas.toDataURL("image/png", 1).replace("image/png", "image/octet-stream");
      const image = canvas.toDataURL("image/png", 1)

      // Upscale the image

      const link = document.createElement('a');
      link.download = "pose.png";
      link.href = image;
      link.click();

      setVisible(true)
    }, 1000);
  };

  // Mobile breakpoints
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 769px) and (max-width: 1023px)" });
  return (

    <div
      className={classNames("w-full h-screen relative overflow-hidden", {
        "bg-white": theme === "light",
        "bg-neutral-100": theme === "dark",
      })}
    >
      <Analytics mode="production" debug={true} />
      <Loader />

      {/* 3D Canvas - Full height on mobile, adjusted for controls */}
      <div 
        className={classNames("w-full", {
          "h-screen": isDesktop,
          "h-[calc(100vh-90px)]": isMobile,
          "h-[calc(100vh-120px)]": isTablet,
        })}
      >
        <Canvas gl={{ preserveDrawingBuffer: true, antialias: true }} shadows camera={{ fov: isMobile ? 25 : 20 }} linear={false} dpr={1.5}>
          <Ground theme={theme} visible={visible} />
          <Character colors={subToolColors} selected={selected} logo={logo} />
          <Camera viewMode={viewMode} setViewMode={setViewMode} />
          <ContactShadows opacity={opacity} scale={scale} blur={blur} far={far} />
          <Lights selected={selected} />
        </Canvas>
      </div>

      {/* Desktop Header */}
      {isDesktop && (
        <>
          <div className="absolute top-8 left-8">
            <Logo className="w-44" fill={theme === "light" ? "#121F3E" : "white"} />
          </div>

          <div className="flex items-center absolute top-8 right-8">
            <button
              className="text-sm text-white font-medium h-11 px-4 bg-primary rounded-full ml-auto"
              type="button"
              onClick={() => {
                DownloadPose();
              }}
            >
              Export
            </button>
            <button
              className="text-sm text-white w-11 h-11 flex items-center justify-center bg-neutral-20 rounded-full ml-4"
              type="button"
              onClick={() => setIsManualOpen(true)}
            >
              <IconMenu className="w-5 h-5" fill="#4B50EC" />
            </button>
          </div>

          <div className="absolute top-1/2 left-8 -translate-y-1/2">
            <ViewMode mode={viewMode} onClickMode={setViewMode} />
          </div>
        </>
      )}

      {/* Mobile Header */}
      {(isMobile || isTablet) && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/20 to-transparent">
          <Logo className="w-32" fill="white" />
          <div className="flex items-center space-x-2">
            <button
              className="text-sm text-white font-medium h-10 px-4 bg-primary rounded-full"
              type="button"
              onClick={() => {
                DownloadPose();
              }}
            >
              Export
            </button>
            <button
              className="text-white w-10 h-10 flex items-center justify-center bg-black/30 rounded-full"
              type="button"
              onClick={() => setIsManualOpen(true)}
            >
              <IconMenu className="w-5 h-5" fill="white" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile View Mode - positioned above toolbar (only on tablet, not mobile) */}
      {isTablet && (
        <div className="absolute bottom-20 left-0 right-0 z-10 bg-gradient-to-t from-black/20 to-transparent pb-2">
          <MobileViewMode mode={viewMode} onClickMode={setViewMode} />
        </div>
      )}

      {/* Desktop Controls */}
      {isDesktop && (
        <>
          <div className="flex items-center mr-auto absolute bottom-8 left-8">
            <ThemeToggle />
            <button className="text-[#8D98AF] text-xs font-medium ml-5">
              {
                debuggerVisible ? (
                  <span onClick={() => setDebuggerVisible(!debuggerVisible)}>Show Debugger</span>
                ) : (
                  <span onClick={() => setDebuggerVisible(!debuggerVisible)}>Hide Debugger</span>
                )

              }


            </button>
            <p className="text-[#8D98AF] text-xs font-medium ml-5" >
              © 2025,
              <a href="https://github.com/Peeeeteer" target="_blank">
                {" "}by Peter
              </a>
            </p>
          </div>

          <div className="absolute bottom-8 right-8">
            <SubToolbar
              subToolId={selected[tool.id]}
              tool={tool}
              colors={subToolColors}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onClickItem={(item) => {
                setSelected({
                  ...selected,
                  [tool.id]: item.id
                })

                if (item.id === 'logo_upload') {
                  refLogoInput.current?.click();
                }

              }}
              // Uncomment below if you want hide/reveal version of the toolbar.
              // onHoverTool={setIsToolbarOpen}
              onChangeColor={(subToolColor) => {
                const newSubToolColors = subToolColors.map((color) => {
                  if (color.subToolId === selected[tool.id]) {
                    return {
                      ...color,
                      color: subToolColor.color,
                    };
                  }

                  return color;
                });

                setSubToolColors(newSubToolColors);

              }}
            />
          </div>

          <div
            className="absolute right-32 bottom-10"
          // Uncomment below if you want hide/reveal version of the toolbar.
          // onMouseEnter={() => setIsToolbarOpen(true)}
          // onMouseLeave={() => setIsToolbarOpen(false)}
          >
            <AnimatePresence>
              {isToolbarOpen && (
                <motion.div
                  className="overflow-hidden h-24 flex items-end"
                  initial={{ width: 0 }}
                  animate={{ width: `${trayWidth}rem` }}
                  exit={{ width: 0 }}
                >
                  <Toolbar
                    toolId={tool.id}
                    items={toolItems}
                    onClickItem={(tool) => {
                      const newTool = (() => {
                        if (tool.id === 'tool_2') {
                          return {
                            ...tool,
                            items: tool.items.map((item) => {
                              const byId = (id: string) => {
                                return (item: typeof tools[0]) => item.id === id
                              }

                              const icon = (() => {
                                switch (item.id) {
                                  case "tool_2_item_1":
                                    return toolItems.find(byId('hair'))?.icon;

                                  case "tool_2_item_2":
                                    return toolItems.find(byId('beard'))?.icon;

                                  default:
                                    return item.icon;
                                }
                              })();

                              return { ...item, icon: icon || item.icon };
                            }),
                          };
                        }

                        return tool
                      })()

                      setTool(newTool)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Mobile Toolbar */}
      {(isMobile || isTablet) && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <MobileToolbar
            toolId={tool.id}
            items={toolItems}
            onClickItem={(selectedTool) => {
              const newTool = (() => {
                if (selectedTool.id === 'tool_2') {
                  return {
                    ...selectedTool,
                    items: selectedTool.items.map((item) => {
                      const byId = (id: string) => {
                        return (item: typeof tools[0]) => item.id === id
                      }

                      const icon = (() => {
                        switch (item.id) {
                          case "tool_2_item_1":
                            return toolItems.find(byId('hair'))?.icon;

                          case "tool_2_item_2":
                            return toolItems.find(byId('beard'))?.icon;

                          default:
                            return item.icon;
                        }
                      })();

                      return { ...item, icon: icon || item.icon };
                    }),
                  };
                }

                return selectedTool;
              })()

              setTool(newTool);
              setIsMobileSubToolbarOpen(true);
            }}
          />
        </div>
      )}

      {/* Mobile SubToolbar */}
      {(isMobile || isTablet) && (
        <MobileSubToolbar
          isOpen={isMobileSubToolbarOpen}
          onClose={() => setIsMobileSubToolbarOpen(false)}
          subToolId={selected[tool.id]}
          tool={tool}
          colors={subToolColors}
          setViewMode={setViewMode}
          onClickItem={(item) => {
            setSelected({
              ...selected,
              [tool.id]: item.id
            })

            if (item.id === 'logo_upload') {
              refLogoInput.current?.click();
            }
          }}
          onChangeColor={(subToolColor) => {
            const newSubToolColors = subToolColors.map((color) => {
              if (color.subToolId === selected[tool.id]) {
                return {
                  ...color,
                  color: subToolColor.color,
                };
              }

              return color;
            });

            setSubToolColors(newSubToolColors);
          }}
        />
      )}

      {/* Hidden file input */}
      <input
        ref={refLogoInput}
        className="hidden"
        type="file"
        accept="image/png"
        onChange={handlePickedLogo}
      />

      <ManualPopup
        isOpen={isManualOpen}
        onClickClose={() => setIsManualOpen(false)}
      />

      <Leva hidden={debuggerVisible} />

    </div >
  );
}

