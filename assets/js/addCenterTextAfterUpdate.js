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