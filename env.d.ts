declare interface ImportMeta {
    readonly env: {
        [key: string]: string | undefined;
        // Add specific environment variables with their types if known
        // readonly APP_ENV: 'development' | 'production';
    };
}