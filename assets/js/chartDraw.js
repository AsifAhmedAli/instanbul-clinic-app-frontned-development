var chartOptions = {
  tooltips: { enabled: false },
  hover: { mode: null },
  elements: {
    customCutout: true,
  },
  cutoutPercentage: 60,
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

var dashboardIncomeMainChart = new Chart(document.getElementById("dashboard_income_main"), {
  type: "doughnut",
  data: dashboard_income_main_data,
  options: chartOptions,
});

var dashboardProfile = new Chart(document.getElementById("dashboard_profit"), {
  type: "doughnut",
  data: dashboardProfitData,
  options: chartOptions,
});
