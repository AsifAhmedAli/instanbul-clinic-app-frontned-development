
const pi = Math.PI;

const drawArc = (chart, arc, color) => {
  let x = (chart.chartArea.left + chart.chartArea.right) / 2;
  let y = (chart.chartArea.top + chart.chartArea.bottom) / 2;
  chart.ctx.fillStyle = color;
  chart.ctx.strokeStyle = color;
  chart.ctx.beginPath();
  if (arc != null) {
    chart.ctx.arc(
      x,
      y,
      chart.outerRadius,
      arc._view.startAngle,
      arc._view.endAngle
    );
    chart.ctx.arc(
      x,
      y,
      chart.innerRadius,
      arc._view.endAngle,
      arc._view.startAngle,
      true
    );
  } else {
    chart.ctx.arc(x, y, chart.outerRadius, 0, 2 * pi);
    chart.ctx.arc(x, y, chart.innerRadius, 0, 2 * pi, true);
  }
  chart.ctx.fill();
};

const addCenterTextAfterUpdate = (chart) => {
  if (
    chart.config.options.elements.center &&
    chart.config.options.elements.centerSub &&
    chart.ctx
  ) {
    const centerConfig = chart.config.options.elements.center;
    const centerConfigSub = chart.config.options.elements.centerSub;
    const globalConfig = Chart.defaults.global;
    let fontStyle = centerConfig.fontStyle;
    let fontFamily = Chart.helpers.getValueOrDefault(
      centerConfig.fontFamily,
      "SofiaProRegular"
    );
    let fontSize = Chart.helpers.getValueOrDefault(
      centerConfig.minFontSize,
      14
    );
    let maxFontSize = Chart.helpers.getValueOrDefault(
      centerConfig.maxFontSize,
      90
    );
    let maxText = Chart.helpers.getValueOrDefault(
      centerConfig.maxText,
      centerConfig.text
    );
    do {
      chart.ctx.font = Chart.helpers.fontString(
        fontSize,
        fontStyle,
        fontFamily
      );
      let textWidth = chart.ctx.measureText(maxText).width;
      if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
        fontSize += 1;
      else {
        fontSize -= 1;
        break;
      }
    } while (true);
    chart.center = {
      font: Chart.helpers.fontString(fontSize, fontStyle, fontFamily),
      fillStyle: Chart.helpers.getValueOrDefault(
        centerConfig.fontColor,
        globalConfig.defaultFontColor
      ),
    };
    fontSize = Chart.helpers.getValueOrDefault(centerConfigSub.minFontSize, 10);
    maxFontSize = Chart.helpers.getValueOrDefault(
      centerConfigSub.maxFontSize,
      25
    );
    maxText = centerConfigSub.text;
    do {
      chart.ctx.font = Chart.helpers.fontString(
        fontSize,
        fontStyle,
        fontFamily
      );
      let textWidth = chart.ctx.measureText(maxText).width;
      if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
        fontSize += 1;
      else {
        fontSize -= 1;
        break;
      }
    } while (true);
    chart.centerSub = {
      font: Chart.helpers.fontString(fontSize, fontStyle, fontFamily),
      fillStyle: Chart.helpers.getValueOrDefault(
        centerConfigSub.fontColor,
        globalConfig.defaultFontColor
      ),
    };
  }
};

const addCenterTextAfterDraw = (chart) => {
  if (chart.center && chart.centerSub) {
    chart.ctx.textAlign = "center";
    chart.ctx.textBaseline = "middle";
    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    const lowerY = (chart.chartArea.top + chart.chartArea.bottom) / 2 + 65;
    const centerConfig = chart.config.options.elements.center;
    chart.ctx.font = chart.center.font;
    chart.ctx.fillStyle = chart.center.fillStyle;
    chart.ctx.fillText(centerConfig.text, centerX, centerY);
    const centerSubConfig = chart.config.options.elements.centerSub;
    chart.ctx.font = chart.centerSub.font;
    chart.ctx.fillStyle = chart.centerSub.fillStyle;
    chart.ctx.fillText(centerSubConfig.text, centerX, lowerY);
  }
};

var datasets = [
  {
    data: [7.5, 2.5],
    backgroundColor: ["#26506E", "#A8B9C5"],
    borderWidth: [1, 12],
  },
];


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

var ctx = document.getElementById("chart1").getContext("2d");
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
