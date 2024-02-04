// Purpose: Service to fetch data from the server.

const base = "http://localhost:8001";
export default {
  getAllHotels: () => fetch(`${base}/hotels/list`).then((res) => res.json()),
  getHotelById: (id: string) =>
    fetch(`${base}/hotels/${id}`).then((res) => res.json()),
};
