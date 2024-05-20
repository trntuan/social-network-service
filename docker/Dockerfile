# Sử dụng image chứa Node.js
FROM node:20-alpine

# Tạo thư mục làm việc của ứng dụng
WORKDIR /usr/src/app

# Copy package.json và package-lock.json để cài đặt các dependency
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

# Copy mã nguồn ứng dụng vào thư mục làm việc
COPY . .

# Build ứng dụng
RUN npm run build

# Port mà ứng dụng chạy trên container
EXPOSE 3000

# Lệnh để chạy ứng dụng khi container được khởi động
CMD ["npm", "run", "start:prod"]
