
const pi = Math.PI;

const drawArc2 = (chart, arc, color) => {
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
  chart2.ctx.fill();
};

const addCenterTextAfterUpdate2 = (chart) => {
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

const addCenterTextAfterDraw2 = (chart) => {
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

var datasetsB = [
  {
    data: [5.1, 4.9],
    backgroundColor: ["#0D9B90", "#A1DDCA"],
    borderWidth: [1, 12],
  },
];


var chartData2 = {
  type: "doughnut",
  data: { datasets: datasetsB },
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
        text: `${datasetsB[0].data[0]}`,
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

var ctx2 = document.getElementById("chart2").getContext("2d");
var chart2 = new Chart(ctx2, {
  ...chartData2,
  plugins: [
    {
      beforeDraw: (chart2) => {
        drawArc2(chart2, null, "#e0e0e0");
      },
      afterUpdate: (chart2) => {
        addCenterTextAfterUpdate2(chart2);
      },
      afterDraw: (chart2) => {
        addCenterTextAfterDraw2(chart2);
      },
      resize: () =>
        new Chart(ctx2, {
          ...chartData2,
          plugins: [
            {
              beforeDraw: (chart2) => {
                drawArc2(chart2, null, "#e0e0e0");
              },
              afterUpdate: (chart2) => {
                addCenterTextAfterUpdate2(chart2);
              },
              afterDraw: (chart2) => {
                addCenterTextAfterDraw2(chart2);
              },
            },
          ],
        }),
    },
  ],
});
