import recolorImage from "../recolorImage";

export default function(
    ctx, crossImage, xCoordinate, yCoordinate, crossSize, color, animation = false
){
    const background = ctx.getImageData(
        xCoordinate,
        yCoordinate,
        crossSize,
        crossSize,
    );

    function draw(step){
        ctx.putImageData(
            background,
            xCoordinate,
            yCoordinate,
        );
        
        ctx.drawImage(
            crossImage, 48 * step, 0, 48, 48,  xCoordinate, yCoordinate, crossSize, crossSize
        );

        recolorImage(
            ctx,
            xCoordinate,
            yCoordinate,
            crossSize,
            crossSize,
            color
        );
    }

    const speed = 60;

    try{
        if(!animation){
            draw(4);

        }else{

            setTimeout(draw.bind(this, 0), speed * 0);
            setTimeout(draw.bind(this, 1), speed * 1);
            setTimeout(draw.bind(this, 2), speed * 2);
            setTimeout(draw.bind(this, 3), speed * 3);
            setTimeout(draw.bind(this, 4), speed * 4);
        }
    } catch(e){}
}