import {IS_DEV} from "@/config.js";

export function logDev(...args) {
    if (IS_DEV) {
        console.log(...args);
    }
}
