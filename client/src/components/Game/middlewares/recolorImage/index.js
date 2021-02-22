
export default function(
    ctx,
    xCoordinate,
    yCoordinate,
    width,
    height,
    targetArrRGBA = [255, 127, 39, 255],
    thisArrRGBA = [255, 255, 255, 255]
){
    if(ctx !== undefined && xCoordinate !== undefined && yCoordinate !== undefined
        && width !== undefined && height !== undefined && targetArrRGBA !== undefined){

        let imgData = ctx.getImageData(
            xCoordinate,
            yCoordinate,
            width,
            height
        );
        
        for (var i = 0; i < imgData.data.length; i += 4) {
            let difference = [];
    
            difference[0] = thisArrRGBA[0] - imgData.data[i + 0];
            difference[1] = thisArrRGBA[1] - imgData.data[i + 1];
            difference[2] = thisArrRGBA[2] - imgData.data[i + 2];
    
            imgData.data[i + 0] = targetArrRGBA[0] - difference[0];
            imgData.data[i + 1] = targetArrRGBA[1] - difference[1];
            imgData.data[i + 2] = targetArrRGBA[2] - difference[2];

            imgData.data[i + 3] = targetArrRGBA[3];
        }
    
        ctx.putImageData(
            imgData,
            xCoordinate,
            yCoordinate,
        );
    }
}