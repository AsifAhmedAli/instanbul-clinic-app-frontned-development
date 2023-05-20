const red_min_hex = '45';
const red_min_dec = parseInt(red_min_hex, 16);
const red_max_hex = 'cc';
const red_max_dec = parseInt(red_max_hex, 16);
const green_min_hex = '35';
const green_min_dec = parseInt(green_min_hex, 16);
const green_max_hex = 'ac';
const green_max_dec = parseInt(green_max_hex, 16);
const blue_min_hex = '20';
const blue_min_dec = parseInt(blue_min_hex, 16);
const blue_max_hex = '78';
const blue_max_dec = parseInt(blue_max_hex, 16);

const pi = Math.PI;


const drawArc = (chartm, arc, color) => {
  let x = (chart.chartArea.left + chart.chartArea.right) / 2;
	let y = (chart.chartArea.top + chart.chartArea.bottom) / 2;
	chart.ctx.fillStyle = color;
	chart.ctx.strokeStyle = color;
	chart.ctx.beginPath();
	if (arc != null) {
		chart.ctx.arc(x, y, chart.outerRadius, arc._view.startAngle, arc._view.endAngle);
		chart.ctx.arc(x, y, chart.innerRadius, arc._view.endAngle, arc._view.startAngle, true);
	} else {
		chart.ctx.arc(x, y, chart.outerRadius, 0, 2 * pi);
		chart.ctx.arc(x, y, chart.innerRadius, 0, 2 * pi, true);
	}
	chart.ctx.fill();
}

const addCenterTextAfterUpdate = chart => {
  if (
		chart.config.options.elements.center &&
		chart.config.options.elements.centerSub &&
		chart.ctx
	) {
		const centerConfig = chart.config.options.elements.center;
		const centerConfigSub = chart.config.options.elements.centerSub;
		const globalConfig = Chart.defaults.global;
		let fontStyle = centerConfig.fontStyle;
		let fontFamily = Chart.helpers.getValueOrDefault(centerConfig.fontFamily, 'SofiaProRegular');
		let fontSize = Chart.helpers.getValueOrDefault(centerConfig.minFontSize, 14);
		let maxFontSize = Chart.helpers.getValueOrDefault(centerConfig.maxFontSize, 90);
		let maxText = Chart.helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);
		do {
			chart.ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
			let textWidth = chart.ctx.measureText(maxText).width;
			if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize) fontSize += 1;
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
		maxFontSize = Chart.helpers.getValueOrDefault(centerConfigSub.maxFontSize, 25);
		maxText = centerConfigSub.text;
		do {
			chart.ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
			let textWidth = chart.ctx.measureText(maxText).width;
			if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize) fontSize += 1;
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
}

const roundCornersAfterUpdate = chart => {
	if (chart.config.options.elements.arc.roundCorners !== undefined) {
		let arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundCorners];
		arc.round = {
			x: (chart.chartArea.left + chart.chartArea.right) / 2,
			y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
			radius: (chart.outerRadius + chart.innerRadius) / 2,
			thickness: (chart.outerRadius - chart.innerRadius) / 2,
			backgroundColor: arc._model.backgroundColor,
		};
	}
};

const addCenterTextAfterDraw = chart => {
	if (chart.center && chart.centerSub) {
		chart.ctx.textAlign = 'center';
		chart.ctx.textBaseline = 'middle';
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

const roundCornersAfterDraw = chart => {
	if (chart.config.options.elements.arc.roundCorners !== undefined) {
		var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundCorners];
		// var startAngle = pi / 2 - arc._view.startAngle;
		// var endAngle = pi / 2 - arc._view.endAngle;
		chart.ctx.save();
		chart.ctx.translate(arc.round.x, arc.round.y);
    chart.ctx.fillStyle = arc.round.backgroundColor;
		chart.ctx.beginPath();
		// chart.ctx.arc(
		// 	arc.round.radius * Math.sin(startAngle),
		// 	arc.round.radius * Math.cos(startAngle),
		// 	arc.round.thickness,
		// 	0,
		// 	2 * pi
		// );
		// chart.ctx.arc(
		// 	arc.round.radius * Math.sin(endAngle),
		// 	arc.round.radius * Math.cos(endAngle),
		// 	arc.round.thickness,
		// 	0,
		// 	2 * pi
		// );
		chart.ctx.fill();
		chart.ctx.restore();
	}
};

var datasets = [{
  "data": [7.5, 2.5],
  "backgroundColor": [ "#26506E", "#A8B9C5" ],
  "borderWidth": [1, 12]
}];
var chartData = {
  type: 'doughnut',
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
        borderWidth: 0
      },
      center: {
        maxText: "100%",
        text: `${datasets[0].data[0]}`,
        fontColor: "#26506E",
        fontFamily: "SofiaProBold",
        fontStyle: "normal",
        minFontSize: 14,
        maxFontSize: 42
      },
      centerSub: {
        text: ``,
        fontColor: "#a6a6a6",
        minFontSize: 10,
        maxFontSize: 0
      }
    },
  }
}

var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, {
  ...chartData,
  plugins: [{
    beforeDraw: chart => {
      drawArc(chart, null, '#e0e0e0');
    },
    afterUpdate: chart => {
      addCenterTextAfterUpdate(chart);
      roundCornersAfterUpdate(chart);
     },
    afterDraw: chart => {
      addCenterTextAfterDraw(chart);
      roundCornersAfterDraw(chart);
    },
    resize: () => new Chart(ctx, {
      ...chartData,
      plugins: [{
        beforeDraw: chart => {
          drawArc(chart, null, '#e0e0e0');
        },
        afterUpdate: chart => {
          addCenterTextAfterUpdate(chart);
          roundCornersAfterUpdate(chart);
         },
        afterDraw: chart => {
          addCenterTextAfterDraw(chart);
          roundCornersAfterDraw(chart);
        },
      }]
    })
  }]
});
