
export default function(
    ctx,
    xCoordinate,
    yCoordinate,
    width,
    height
){
    if(ctx !== undefined && xCoordinate !== undefined && yCoordinate !== undefined
        && width !== undefined && height !== undefined){

        const imgData = ctx.getImageData(
            xCoordinate,
            yCoordinate,
            width,
            height
        );
        
        for (let i = 0; i < imgData.data.length; i += 4) {
            const r = imgData.data[i + 0] * 0.2126;
            const g = imgData.data[i + 1] * 0.7152;
            const b = imgData.data[i + 2] * 0.0722;

            const v = r + g + b;
    
            imgData.data[i + 0] = v;
            imgData.data[i + 1] = v;
            imgData.data[i + 2] = v;
            imgData.data[i + 3] = 150;
        }
    
        ctx.putImageData(
            imgData,
            xCoordinate,
            yCoordinate,
        );
    }
}