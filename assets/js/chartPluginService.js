Chart.pluginService.register({
  beforeDraw: function (chart) {
    var width = chart.chart.width,
      height = chart.chart.height,
      ctx = chart.chart.ctx;

    ctx.restore();
    ctx.font = "20px var(--bs-font-family-sans-serif)";
    ctx.textBaseline = "middle";

    var text = chart.data.datasets[0].data[0],
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;
    if (chart.config.options.elements.customCutout !== undefined) {
      chart.getDatasetMeta(0).data[1]._view.innerRadius = 35;
      chart.getDatasetMeta(0).data[1]._view.outerRadius = 50;
      chart.update();
    }

    ctx.fillText(text, textX, textY);
    ctx.fillStyle = chart.data.datasets[0].backgroundColor[0];
    ctx.save();
  },
});
