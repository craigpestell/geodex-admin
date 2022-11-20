import http from "../http-common";

class BusinessDataService {
  getAll() {
    return http.get("/businesses");
  }

  get(id) {
    return http.get(`/businesses/${id}`);
  }

  create(data) {
    return http.post("/businesses", data);
  }

  update(id, data) {
    return http.put(`/businesses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/businesses/${id}`);
  }

  deleteAll() {
    return http.delete(`/businesses`);
  }

  findByTitle(title) {
    return http.get(`/businesses?title=${title}`);
  }
}

export default new BusinessDataService();