var chartData = {
  type: "doughnut",
  data: { datasets: datasets },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 60,
    segmentShowStroke: false,
    events: [],
    elements: {
      arc: {
        roundCorners: 0,
        borderWidth: 0,
      },
      center: {
        maxText: "100%",
        text: `${datasets[0].data[0]}`,
        fontColor: "#26506E",
        fontFamily: "SofiaProBold",
        fontStyle: "normal",
        minFontSize: 14,
        maxFontSize: 42,
      },
      centerSub: {
        text: ``,
        fontColor: "#a6a6a6",
        minFontSize: 10,
        maxFontSize: 0,
      },
    },
  },
};

var chartData = {
  type: "doughnut",
  data: { datasets: datasets },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 60,
    segmentShowStroke: false,
    events: [],
    elements: {
      arc: {
        roundCorners: 0,
        borderWidth: 0,
      },
      center: {
        maxText: "100%",
        text: `${datasets[0].data[0]}`,
        fontColor: "#26506E",
        fontFamily: "SofiaProBold",
        fontStyle: "normal",
        minFontSize: 14,
        maxFontSize: 42,
      },
      centerSub: {
        text: ``,
        fontColor: "#a6a6a6",
        minFontSize: 10,
        maxFontSize: 0,
      },
    },
  },
};
