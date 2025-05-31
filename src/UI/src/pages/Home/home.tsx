import { message } from "@tauri-apps/plugin-dialog";
import zh_cnLPr from "../../../public/zh-CN.json";
import en_usLPr from "../../../public/en-US.json";
import { exit } from "@tauri-apps/plugin-process";
import { useEffect, useRef } from "preact/hooks";
import { Window } from '@tauri-apps/api/window';
import { invoke } from "@tauri-apps/api/core";
import "./home.css";

export function Home() {
  interface ConfigType {
    language?: string;
    [key: string]: any;
  }

  // By BAIDU COMATE 2025.05.02
  interface LanguageConfigs {
    langauge_elements_id: string[];
    [key: string]: string | string[];
  }

  interface ConfigTypeB {
    language_configs: LanguageConfigs;
  }

  interface LanguagePackage {
    [key: string]: string;
  }

  const imgRef = useRef<HTMLImageElement | null>(null);
  const appWindow = new Window('main');

  async function get_configs(): Promise<ConfigType> {
    return JSON.parse(await invoke("get_configs"));
  }

  async function get_configsInside(): Promise<ConfigTypeB> {
    return JSON.parse(await invoke("get_configs_inside"));
  }

  function change_configs(key: string, value: any) {
    invoke("change_configs", { key: key, value: value });
  }

  var configs: Promise<ConfigType> = get_configs();
  var configsInside: Promise<ConfigTypeB> = get_configsInside();

  function ECT(eca: number): string {
    switch (eca) {
      case 1:
        return ("code: T000001: Cannot Get The Element");
      case 2:
        return ("code: T000002: Cannot Load Resources(Image)");
      case 3:
        return "code: T000003: Config File Error(In Item \"Language\")";
      default:
        return "code: T999999: Unknown Error of T";
    };
  }

  async function throwError(ec: number) {
    await message(ECT(ec).toString(), { title: "InulasesUI Error", kind: "error" });
    exit(3);
  }

  function toolbar_file_onclick() {
    document.documentElement.style.setProperty("--classmenuAleftpx",
      document.getElementById("toolbar-file")?.getBoundingClientRect().left + "px"
    );
    document.getElementById("toolbar-file-menu")!.style.display = "block";
  }

  function toolbar_file_onblur() {
    setTimeout(() => {
      document.getElementById("toolbar-file-menu")!.style.display = "none";
    }, 100);
  }

  function toolbar_file_select_new_file_onclick() {
    // invoke("new_file");
    message("New File", { title: "InulasesUI", kind: "info" });
  }

  function toolbar_file_new_window_onclick() {
    // invoke("new_window");
    message("New Window", { title: "InulasesUI", kind: "info" });
  }

  function toolbar_file_open_file() {
    // invoke("open_file");
    message("Open File", { title: "InulasesUI", kind: "info" });
  }

  function toolbar_file_open_folder() {
    // invoke("open_folder");
    message("Open Folder", { title: "InulasesUI", kind: "info" });
  }

  function toolbar_file_save_file() {
    // invoke("save_file");
    message("Save File", { title: "InulasesUI", kind: "info" });
  }

  function toolbar_file_save_as() {
    // invoke("save_as");
    message("Save As", { title: "InulasesUI", kind: "info" });
  }

  function toolbar_file_save_project() {
    // invoke("save_project");
    message("Save Project", { title: "InulasesUI", kind: "info" });
  }

  function toolbar_file_option_automatic_save() {
    var atmksave_mark = document.getElementById("toolbar_file_option_automatic_save_mark")!;

    if (atmksave_mark.innerHTML == "") {
      atmksave_mark.innerHTML = "✓";
      change_configs("automatic_save", true);
    } else {
      atmksave_mark.innerHTML = "";
      change_configs("automatic_save", false);
    }
    // invoke("option_automatic_save");
  }

  function all_save() {
    // invoke("all_save");
    message("All Save", { title: "InulasesUI", kind: "info" });
  }

  function open_project() {
    // invoke("open_project");
    message("Open Project", { title: "InulasesUI", kind: "info" });
  }

  function setting_button() {
    // invoke("setting_button");
    message("Setting", { title: "InulasesUI", kind: "info" });
  }

  function exit_program() {
    exit(0);
  }

  function toolbar_edit_onclick() {
    document.documentElement.style.setProperty("--classmenuAleftpx",
      document.getElementById("toolbar-edit")?.getBoundingClientRect().left + "px"
    );
    document.getElementById("toolbar-edit-menu")!.style.display = "block";
  }

  function toolbar_edit_onblur() {
    setTimeout(() => {
      document.getElementById("toolbar-edit-menu")!.style.display = "none";
    }, 100);
  }

  function CandZ() {
    message("CandZ", { title: "InulasesUI", kind: "info" });
  }

  function CandY() {
    message("CandY", { title: "InulasesUI", kind: "info" });
  }

  function CandX() {
    message("CandX", { title: "InulasesUI", kind: "info" });
  }

  function CandC() {
    message("CandC", { title: "InulasesUI", kind: "info" });
  }

  function CandV() {
    message("CandV", { title: "InulasesUI", kind: "info" });
  }

  function CandA() {
    message("CandA", { title: "InulasesUI", kind: "info" });
  }

  function CopyAs() {
    message("CopyAs", { title: "InulasesUI", kind: "info" });
  }

  function CopyLine() {
    message("CopyLine", { title: "InulasesUI", kind: "info" })
  }

  function CandF() {
    message("CandF", { title: "InulasesUI", kind: "info" });
  }

  function handleClick() {
    appWindow.isMaximized().then((maximized) => {
      if (!maximized && imgRef.current) {
        imgRef.current.src = "window.png"
      } else {
        imgRef.current!.src = "https://api.iconify.design/mdi:window-maximize.svg"; 
      }
    });
    appWindow.toggleMaximize();
  }

  function init() {
    var zh_cnLP: LanguagePackage = zh_cnLPr;
    var en_usLP: LanguagePackage = en_usLPr;
    // Change from https://tauri.app/zh-cn/learn/window-customization/
    document.getElementById('titlebar-minimize')?.addEventListener('click', () => appWindow.minimize());
    document.getElementById('titlebar-close')?.addEventListener('click', () => appWindow.close());
    configs.then(async (config) => {
      configsInside.then(async (configInside) => {
        if (config.language == "zh-CN") {
          // By TongYiLingMa-qwen3 2025.05.02
          for (let i = 0; i < configInside.language_configs.langauge_elements_id.length; i++) {
            const elementId = configInside.language_configs.langauge_elements_id[i];
            const key = configInside.language_configs[elementId] as string;
            const translatedText = zh_cnLP[key];
            // TODO: Only fix the text
            document.getElementById(elementId)!.innerText = translatedText;
          }
        }
        else if (config.language == "en-US") {
          // By TongYiLingMa-qwen3 2025.05.02
          for (let i = 0; i < configInside.language_configs.langauge_elements_id.length; i++) {
            const elementId = configInside.language_configs.langauge_elements_id[i];
            const key = configInside.language_configs[elementId] as string;
            const translatedText = en_usLP[key];
            document.getElementById(elementId)!.textContent = translatedText;
          }
        }
        if (config.automatic_save == true) {

        }
      });
    });
    document.getElementById("toolbar-file-menu")!.style.display = "none";
    document.getElementById("toolbar-edit-menu")!.style.display = "none";
  }

  // By BAIDU COMATE 2025.05.02
  useEffect(() => {
    init(); // 在组件挂载后调用 init 函数
  }, []); // 空数组作为依赖项，表示只在组件挂载时执行一次

  return (
    <div id={"mainDiv"}>
      <div data-tauri-drag-region class="titlebar">
        <div class="titlebar-button" id="titlebar-minimize">
          <img
            src="https://api.iconify.design/mdi:window-minimize.svg"
            alt="minimize"
          />
        </div>
        <div class="titlebar-button" id="titlebar-maximize">
          <img ref={imgRef} src="https://api.iconify.design/mdi:window-maximize.svg" alt="maximize" onClick={handleClick} />
        </div>
        <div class="titlebar-button" id="titlebar-close">
          <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
        </div>
      </div>
      
      
    </div>
  );
}
