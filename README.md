# 執行
ng serve -c="zh-TW" -o
ng serve -c="en-US" -o

# 編譯
ng build -c="zh-TW"
ng build -c="en-US"

# i18n
英文（en-US）：ng xi18n --i18n-locale en-US --out-file locale/en-US/source.xlf
中文（zh-TW）：ng xi18n --i18n-locale zh-TW --out-file locale/zh-TW/source.xlf