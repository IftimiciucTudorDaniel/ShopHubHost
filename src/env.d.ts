/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_HOST: string,
    readonly VITE_DEVELOPMENT: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
