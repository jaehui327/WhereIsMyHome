const mapStore = {
  namespaced: true,
  state: {
    aptList: [
      {
        aptCode: "1",
        apartmentName: "아파트1",
        lang: "126.968575235313",
        lng: "37.5746540320628",
      },
      {
        aptCode: "2",
        apartmentName: "아파트2",
        lang: "126.967807531773",
        lng: "37.5735202837045",
      },
      {
        aptCode: "3",
        apartmentName: "아파트3",
        lang: "126.973698680555",
        lng: "37.5713864751051",
      },
      {
        aptCode: "4",
        apartmentName: "아파트4",
        lang: "126.970592334119",
        lng: "37.5739303322063",
      },
      {
        aptCode: "5",
        apartmentName: "아파트5",
        lang: "126.973281404951",
        lng: "37.5727371532245",
      },
      {
        aptCode: "6",
        apartmentName: "아파트6",
        lang: "126.998660420118",
        lng: "37.5714414748387",
      },
      {
        aptCode: "7",
        apartmentName: "아파트7",
        lang: "126.997840959777",
        lng: "37.587928390347",
      },
      {
        aptCode: "8",
        apartmentName: "아파트8",
        lang: "126.998690725909",
        lng: "37.5861514648089",
      },
      {
        aptCode: "9",
        apartmentName: "아파트9",
        lang: "127.014194906011",
        lng: "37.5800313416279",
      },
      {
        aptCode: "10",
        apartmentName: "아파트10",
        lang: "127.011185827224",
        lng: "37.5804181914763",
      },
    ],
  },
  getters: {
    aptList(state) {
      return state.aptList;
    },
  },
  mutations: {
    SET_APT_LIST(state, aptList) {
      state.aptList = aptList;
    },
  },
  actions: {},
};

export default mapStore;
