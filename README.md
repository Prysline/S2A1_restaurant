# 餐廳清單 Restaurant List
<div id="top"></div>
<p>
  <a href="https://github.com/Prysline/S2A1_restaurant" target="_blank">
  <img alt="Version" src="https://img.shields.io/badge/version-2.1.0-blue.svg?cacheSeconds=2592000" />
  </a>
  <a href="https://github.com/Prysline/S2A1_restaurant/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/Prysline/S2A1_restaurant.svg" />
  </a>
</p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>目錄 Table of Contents</summary>
  <ol>
    <li>
      <a href="#關於-about">關於 About</a>
      <ul>
        <li><a href="#特色-Feature">特色 Feature</a></li>
        <li><a href="#截圖-Screenshot">截圖 Screenshot</a></li>
        <li><a href="#建置環境-built-with">建置環境 Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#入門-getting-started">入門 Getting Started</a>
      <ul>
        <li><a href="#前置-prerequisites">前置 Prerequisites</a></li>
        <li><a href="#安裝-installation">安裝 Installation</a></li>
      </ul>
    </li>
    <li><a href="#版權聲明-license">版權聲明 License</a></li>
    <li><a href="#致謝-acknowledgments">致謝 Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## 關於 About

一個以 Node.js 和 Express 製作的餐廳清單網站，能夠檢視目前所有的餐廳清單，並在站內搜尋餐廳名稱或餐廳類別。
點擊餐廳圖片會進入餐廳詳細資訊的頁面。

### 特色 Feature
- 卡片式餐廳清單
- 能用餐廳中英文名稱或是餐廳類型查找
- 點擊餐廳圖片可瀏覽詳細資訊
- 新增餐廳資訊
- 修改餐廳資訊
- 刪除餐廳資訊
- 新增、修改、刪除餐廳資訊時有提示視窗

### 截圖 Screenshot
<div>
  <img alt="index" src="https://github.com/Prysline/S2A1_restaurant/blob/main/public/images/index.png" style="display: inline-box; width: 12em;">
  <img alt="info" src="https://github.com/Prysline/S2A1_restaurant/blob/main/public/images/info.png" style="display: inline-box; width: 12em;">
  <img alt="new" src="https://github.com/Prysline/S2A1_restaurant/blob/main/public/images/new.png" style="display: inline-box; width: 12em;">
  <img alt="edit" src="https://github.com/Prysline/S2A1_restaurant/blob/main/public/images/edit.png" style="display: inline-box; width: 12em;">
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

### 建置環境 Built With

- [Node.js](https://nodejs.org/) (v14.18.1)
- [Express](https://expressjs.com/)
- [Express-handlebars](https://github.com/express-handlebars/express-handlebars)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [mongoDB](https://www.mongodb.com/) (v4.2.17)
- [mongoose](https://mongoosejs.com/)
- [Robo 3T](https://robomongo.org/)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## 入門 Getting Started

### 前置 Prerequisites

如果要使用 `npm run dev` 的指令，需先安裝 [nodemon](https://www.npmjs.com/package/nodemon)。
* nodemon
  ```sh
  npm install -g nodemon
  ```

所有新增、編輯、移除等關於資料庫的功能，均建立在使用 [mongoDB](https://www.mongodb.com/) + [mongoose](https://mongoosejs.com/) 的環境下。

### 安裝 Installation

1. 在要安裝的位置開啟終端機(terminal) clone 專案檔案
   ```sh
   git clone https://github.com/Prysline/S2A1_restaurant.git
   ```
2. 進入專案資料夾
   ```sh
   cd S2A1_restaurant
   ```
3. 安裝所需套件
   ```sh
   npm install
   ```
4. 建立種子資料 （須連線 mongoDB 伺服器）
   ```sh
   npm run seed
   ```
5. 使用 Node.js 執行 Express 伺服器（更新檔案時需要另外 ctrl+C 退出 Node.js 環境並重新啟動）
   ```sh
   npm run start
   ```
   或是使用 nodemon 執行 Express 伺服器（會在檔案變更時自動重啟伺服器，需安裝 nodemon）
   ```sh
   npm run dev
   ```
6. 在瀏覽器網址列輸入 `http://localhost:3000/` 瀏覽網站

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## 版權聲明 License

使用 [MIT](https://github.com/Prysline/S2A1_restaurant/blob/main/LICENSE) License。

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## 致謝 Acknowledgments

* [ALPHAcamp](https://tw.alphacamp.co/)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [shields IO](https://shields.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

