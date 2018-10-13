# 執行
+ ng serve -c="zh-TW" -o
+ ng serve -c="en-US" -o

# 編譯
+ ng build -c="zh-TW"
+ ng build -c="en-US"

# i18n
+ 英文（en-US）：ng xi18n --i18n-locale en-US --out-file locale/en-US/source.xlf
+ 中文（zh-TW）：ng xi18n --i18n-locale zh-TW --out-file locale/zh-TW/source.xlf

# environments
因為這裡面會放一些firebase config，所以就不commit上來。詳情請參考firebase官方文件  
路徑：  
+ src/environments/environment.ts
+ src/environments/environment.prod.ts
```js
// firebaseConfig這個物件的屬性涵義可以參考firebase官方文件
export const environment = {
    production: true,
    firebaseConfig: {
        apiKey: "{{ FIREBASE_API_KEI }}",
        authDomain: "{{ FIREBASE_AUTH_DOMAIN }}",
        databaseURL: "{{ FIREBASE_DATABASE_URL }}",
        projectId: "{{ FIREBASE_PROJECT_ID }}",
        storageBucket: "{{ FIREBASE_STORAGE_BUCKET }}",
        messagingSenderId: "{{ FIREBASE_MESSAGING_SENDER_ID }}"
    }
};
```
