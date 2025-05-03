// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::read_to_string;
use serde_json::Value;
use std::env;
use std::fs;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_configs_inside() -> String {
    let configs = read_to_string("../../kernel/configInside.json")
        .expect("code: R000001: Failed to read configInside.json");
    configs
}

#[tauri::command]
// By TongYiLingMa 2025.05.03
// Fix by BAIDU COMATE 2025.05.03
fn get_configs() -> String {
    let config_inside: String = get_configs_inside();
    let config_json: Value = serde_json::from_str(&config_inside)
        .expect("code: R000002: Failed to parse configInside.json as JSON");

    // 尝试从 JSON 中获取 "path" 字段，并确保它是字符串类型
    if let Some(path_value) = config_json.get("configfileposition") {
        if let Value::String(path_str) = path_value {
            return read_to_string(path_str)
                .expect("code: R000004: Failed to read config file from specified path");
        } else {
            panic!("code: R000003: Config path must be a string");
        }
    } else {
        panic!("code: R000005: Config path not found in JSON");
    }
}

fn get_configs_path() -> String {
    let config_inside: String = get_configs_inside();
    let config_json: Value = serde_json::from_str(&config_inside)
        .expect("code: R000002: Failed to parse configInside.json as JSON");
    if let Some(path_value) = config_json.get("configfileposition") {
        if let Value::String(path_str) = path_value {
            return path_str.clone();
        } else {
            panic!("code: R000003: Config path must be a string");
        }
    } else {
        panic!("code: R000005: Config path not found in JSON");
    }
}

// By BAIDU COMATE 2025.05.03
// Fix by TongYiLingMa-qwen3 2025.05.03
#[tauri::command]
fn change_configs(key: String, value: serde_json::Value) {
    // 读取并解析JSON数据
    let contents = get_configs();
    let mut json: Value = serde_json::from_str(&contents).unwrap();

    // 修改JSON数据
    if let Value::Object(ref mut map) = json {
        if let Some(v) = map.get_mut(&key) {
            *v = value;
        }
    }

    // 将修改后的JSON序列化为字符串
    let updated_json_str = serde_json::to_string_pretty(&json)
        .expect("code: R000006: Failed to serialize modified JSON");

    // 写回文件
    let output_file = get_configs_path();
    fs::write(output_file, updated_json_str)
        .expect("code: R000007: Failed to write updated config to file");
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_configs, get_configs_inside, change_configs])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
