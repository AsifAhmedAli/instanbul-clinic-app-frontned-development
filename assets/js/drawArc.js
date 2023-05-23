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