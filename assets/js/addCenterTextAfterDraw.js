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