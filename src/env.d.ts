/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_HOST: string,
    readonly VITE_DEVELOPMENT: boolean
    // add more env vars here...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
