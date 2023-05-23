var ctx = document.getElementById("chart1").getContext("2d");
var ctx2 = document.getElementById("chart2").getContext("2d");

var chart = new Chart(ctx, {
  ...chartData,
  plugins: [
    {
      beforeDraw: (chart) => {
        drawArc(chart, null, "#e0e0e0");
      },
      afterUpdate: (chart) => {
        addCenterTextAfterUpdate(chart);
      },
      afterDraw: (chart) => {
        addCenterTextAfterDraw(chart);
      },
      resize: () =>
        new Chart(ctx, {
          ...chartData,
          plugins: [
            {
              beforeDraw: (chart) => {
                drawArc(chart, null, "#e0e0e0");
              },
              afterUpdate: (chart) => {
                addCenterTextAfterUpdate(chart);
              },
              afterDraw: (chart) => {
                addCenterTextAfterDraw(chart);
              },
            },
          ],
        }),
    },
  ],
});

var chart2 = new Chart(ctx2, {
  ...chartData2,
  plugins: [
    {
      beforeDraw: (chart) => {
        drawArc(chart, null, "#e0e0e0");
      },
      afterUpdate: (chart) => {
        addCenterTextAfterUpdate(chart);
      },
      afterDraw: (chart) => {
        addCenterTextAfterDraw(chart);
      },
      resize: () =>
        new Chart(ctx2, {
          ...chartData2,
          plugins: [
            {
              beforeDraw: (chart) => {
                drawArc(chart, null, "#e0e0e0");
              },
              afterUpdate: (chart) => {
                addCenterTextAfterUpdate(chart);
              },
              afterDraw: (chart) => {
                addCenterTextAfterDraw(chart);
              },
            },
          ],
        }),
    },
  ],
});
