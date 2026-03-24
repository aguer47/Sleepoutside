export default class ExternalServices {
  constructor() {
    this.baseURL = "http://localhost:3000"; // adjust if needed
  }

  async checkout(order) {
    const res = await fetch(`${this.baseURL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    return this.convertToJson(res);
  }

  async convertToJson(res) {
    const jsonResponse = await res.json();

    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: "servicesError", message: jsonResponse };
    }
  }
}