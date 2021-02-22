
export default function(
    ctx, xCoordinate, yCoordinate, size, color
){
    if(
        ctx !== undefined && xCoordinate !== undefined && yCoordinate !== undefined
            && size !== undefined && color !== undefined
    ){
        ctx.beginPath();
        ctx.arc(
            xCoordinate,
            yCoordinate,
            size,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}