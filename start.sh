#!/bin/bash

echo "==============================="
echo "   Kurumi Bot - Starting Up    "
echo "==============================="

# Cài dependencies nếu chưa có
if [ ! -d "node_modules" ]; then
  echo "[*] Cài đặt dependencies..."
  npm install --legacy-peer-deps
fi

# Tạo thư mục cache nếu chưa có
mkdir -p modules/commands/cache
mkdir -p modules/commands/cache/hethong
mkdir -p modules/commands/data

# Tạo file totalChat.json nếu chưa có
[ ! -f "modules/commands/cache/hethong/totalChat.json" ] && echo "{}" > modules/commands/cache/hethong/totalChat.json
[ ! -f "modules/commands/data/totalChat.json" ] && echo "{}" > modules/commands/data/totalChat.json

echo "[*] Khởi động bot..."
node mirai.js
