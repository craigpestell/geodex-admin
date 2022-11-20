import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  //baseURL: "http://localhost:27017/bezkoder_db/api",
  headers: {
    "Content-type": "application/json"
  }
});