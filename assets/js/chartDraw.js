var chartOptions = {
  tooltips: { enabled: false },
  hover: { mode: null },
  elements: {
    customCutout: true,
  },
  cutoutPercentage: 50,
  responsive: true,
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      labels: {
        font: {
          family: "'SofiaProBold'",
        },
      },
    },
  },
};

// Draw Charts
var chart1 = new Chart(document.getElementById("chart1"), {
  type: "doughnut",
  data: chart1Data,
  options: chartOptions,
});

var chart2 = new Chart(document.getElementById("chart2"), {
  type: "doughnut",
  data: chart2Data,
  options: chartOptions,
});

var chart3 = new Chart(document.getElementById("chart3"), {
  type: "doughnut",
  data: chart3Data,
  options: chartOptions,
});
