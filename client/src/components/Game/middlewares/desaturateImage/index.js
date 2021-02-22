
export default function(
    ctx,
    xCoordinate,
    yCoordinate,
    width,
    height
){
    if(ctx !== undefined && xCoordinate !== undefined && yCoordinate !== undefined
        && width !== undefined && height !== undefined){

        let imgData = ctx.getImageData(
            xCoordinate,
            yCoordinate,
            width,
            height
        );
        
        for (var i = 0; i < imgData.data.length; i += 4) {
            let r = imgData.data[i + 0] * 0.2126;
            let g = imgData.data[i + 1] * 0.7152;
            let b = imgData.data[i + 2] * 0.0722;

            let v = r + g + b;
    
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