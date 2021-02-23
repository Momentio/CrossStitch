
export default function(
  canvasSize,
  embroideryCoordinates,
  crossSize,
  crossIndexes,
  scale,
){
    return {
      x: (
        (embroideryCoordinates.x * scale)
        + (crossSize * scale) * (crossIndexes.x + 0.5)
      ) - (canvasSize / 2),
      y: (
        (embroideryCoordinates.y * scale)
        + (crossSize * scale) * (crossIndexes.y + 0.5)
      ) - (canvasSize / 2),
    };
}