import zh_cnLPr from "../../../public/zh-CN.json";
import en_usLPr from "../../../public/en-US.json";
import { message } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { exit } from "@tauri-apps/api/process";
import { useEffect } from "preact/hooks";
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

  async function get_configs(): Promise<ConfigType> {
    return JSON.parse(await invoke("get_configs"));
  }

  async function get_configsInside(): Promise<ConfigTypeB> {
    return JSON.parse(await invoke("get_configs_inside"));
  }

  function ECT(eca: number): string {
    switch (eca) {
      case 1:
        return ("code: 000001: Cannot Get The Element");
      case 2:
        return ("code: 000002: Cannot Load Resources(Image)");
      case 3:
        return "code: 000003: Config File Error(In Item \"Language\")";
      case 330:
        return "code: 000330: 330 is Watching You";
      case 330330:
        return "code: 330330: 330 is Watching You Too";
      default:
        return "code: 999999: Unknown Error";
    };
  }

  async function throwError(ec: number) {
    await message(ECT(ec).toString(), { title: "InulasesUI Error", type: "error" });
    exit(1);
  }

  function toolbar_file_onclick() {
    
  }

  function init() {
    var zh_cnLP: LanguagePackage = zh_cnLPr;
    var en_usLP: LanguagePackage = en_usLPr;
    var configs: Promise<ConfigType> = get_configs();
    var configsInside: Promise<ConfigTypeB> = get_configsInside();
    configs.then(async (config) => {
      configsInside.then(async (configInside) => {
        if (config.language == "zh-CN") {
          // By TongYiLingMa-qwen3 2025.05.02
          for (let i = 0; i < configInside.language_configs.langauge_elements_id.length; i++) {
            const elementId = configInside.language_configs.langauge_elements_id[i];
            const key = configInside.language_configs[elementId] as string;
            const translatedText = zh_cnLP[key];
            document.getElementById(elementId)!.innerHTML = translatedText;
          }
        }
        else if (config.language == "en-US") {
          // By TongYiLingMa-qwen3 2025.05.02
          for (let i = 0; i < configInside.language_configs.langauge_elements_id.length; i++) {
            const elementId = configInside.language_configs.langauge_elements_id[i];
            const key = configInside.language_configs[elementId] as string;
            const translatedText = en_usLP[key];
            document.getElementById(elementId)!.innerHTML = translatedText;
          }
        }
      });
    });
  }

  // By BAIDU COMATE 2025.05.02
  useEffect(() => {
    init(); // 在组件挂载后调用 init 函数
  }, []); // 空数组作为依赖项，表示只在组件挂载时执行一次

  return (
    <div id={"mainDiv"}>
      <div id={"toolbardiv"}>
        <table id={"toolbar"}>
          <tr>
            <td id={"toolbar-logo"}>
              <img src={"Logo.png"} onError={() => throwError(2)} />
            </td>
            <td>
              <button id={"toolbar-file"} onClick={toolbar_file_onclick}>
                {en_usLPr.File}
                <select id={"toolbar-file-select"} className={"non-display"}></select>
              </button>
            </td>
            <td>
              <button id={"toolbar-edit"}>
                {en_usLPr.Edit}
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
