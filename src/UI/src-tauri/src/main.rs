// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::read_to_string;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_configs() -> String {
    let configs = read_to_string("../../kernel/config.json").expect("Failed to read config.json");
    configs
}

#[tauri::command]
fn get_configs_inside() -> String {
    let configs = read_to_string("../../kernel/configInside.json").expect("Failed to read configInside.json");
    configs
}

 
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_configs, get_configs_inside])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
