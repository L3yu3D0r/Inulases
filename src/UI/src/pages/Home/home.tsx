// import { useState } from "preact/hooks";
import preactLogo from "../../assets/preact.svg";
// import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog"

export function Home() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  function ECT(eca: number): string {
    switch (eca) {
      case 1:
        return ("code: 000001: Cannot Get The Element");
      case 2:
        return ("code: 000002: Cannot Load Resources(Image)")
    };
    return "Unknown Error";
  }

  async function throwError(ec: number) {
    await message(ECT(ec), { title: "Error", type: "error" });
  }

function init() {
  var table = document.getElementById("main-table");
  if (table) {

  } else {
    throwError(1);
  }
}

return (
  // <div class="container">
  //   <h1>Welcome to Tauri!</h1>

  //   <div class="row">
  //     <a href="https://vitejs.dev" target="_blank">
  //       <img src="/vite.svg" class="logo vite" alt="Vite logo" />
  //     </a>
  //     <a href="https://tauri.app" target="_blank">
  //       <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
  //     </a>
  //     <a href="https://preactjs.com" target="_blank">
  //       <img src={preactLogo} class="logo preact" alt="Preact logo" />
  //     </a>
  //   </div>

  //   <p>Click on the Tauri, Vite, and Preact logos to learn more.</p>

  //   <form
  //     class="row"
  //     onSubmit={(e) => {
  //       e.preventDefault();
  //       greet();
  //     }}
  //   >
  //     <input
  //       id="greet-input"
  //       onInput={(e) => setName(e.currentTarget.value)}
  //       placeholder="Enter a name..."
  //     />
  //     <button type="submit">Greet</button>
  //   </form>

  //   <p>{greetMsg}</p>
  // </div>
  <div onLoad={init}>
    <table id={"main-table"}>
      <tr id={"toolbar"}>
        <td id={"toolbar-logo"}>
          <img src={preactLogo} onError={() => throwError(2)} />
        </td>
        <td id={"toolbar-file"}>File</td>
      </tr>
    </table>
  </div>
);
}
