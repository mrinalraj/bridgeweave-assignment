import moment from "moment";

export default {
  stringToDisplayDate: (date: string) => {
    return moment(date).format("ddd, MMMM Do YYYY");
  },
};
