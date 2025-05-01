import zh_cnLP from "../../../public/zh-CN.json";
import en_usLP from "../../../public/en-US.json";
import { message } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import "./home.css";
import { exit } from "@tauri-apps/api/process";

export function Home() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }
  // By TongYiLingMa 2025.05.01
  interface ConfigType {
    language?: string;
    [key: string]: any;
  }

  async function get_configs(): Promise<ConfigType> {
    return JSON.parse(await invoke("get_configs"));
  }

  function ECT(eca: number): string {
    switch (eca) {
      case 1:
        return ("code: 000001: Cannot Get The Element");
      case 2:
        return ("code: 000002: Cannot Load Resources(Image)");
      case 3:
        return "code: 000003: Config File Error(In \"Language\")";
      case 330:
        return "code: 000330: 330 is Watching You";
      case 330330:
        return "code: 330330: 330 is Watching You Too";
      default:
        return "code: 999999: Unknown Error";
    };
  }

  async function throwError(ec: number) {
    await message(ECT(ec).toString(), { title: "Error", type: "error" });
    exit(1);
  }

  function init() {
    var configs: Promise<ConfigType> = get_configs();
    configs.then(async (config) => {
      if (config.language == "en-US") {
        document.getElementById("toolbar-file")!.innerHTML = en_usLP.File;
        document.getElementById("toolbar-edit")!.innerHTML = en_usLP.Edit;
      } else if (config.language == "zh-CN") {
        document.getElementById("toolbar-file")!.innerHTML = zh_cnLP.File;
        document.getElementById("toolbar-edit")!.innerHTML = zh_cnLP.Edit;
      } else {
        throwError(3);
      }
    });
  }

  return (
    <div onLoad={init()}>
      <div id={"toolbardiv"}>
        <table id={"toolbar"}>
          <tr>
            <td id={"toolbar-logo"}>
              <img src={"Logo.png"} onError={() => throwError(2)} />
            </td>
            <td id={"toolbar-file"}>{en_usLP.File}</td>
            <td id={"toolbar-edit"}>{en_usLP.Edit}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
