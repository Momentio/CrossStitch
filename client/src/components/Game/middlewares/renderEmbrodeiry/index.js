import renderCross from "../renderCross";
import desaturateImage from "../desaturateImage";
import forCrossCoordinates from "../forCrossCoordinates";
import drawCircle from "../drawCircle";
import imagesCache from "../imagesCache";

export default function(ctx, game, updatedCrossIndexes, callback = () => {}){
    const {
        canvasSize,
        scale,
        location,
        embroideryCoordinates,
        embroideryMap,
        embroiderySize,
        resources,
        crossSize,
        session,
        currentColor
    } = game;
    
    ctx.clearRect(0, 0, 1000, 1000);

    const scaledCellSize = crossSize * scale;

    const scaledEmbroideryCoordinates = {
        x: embroideryCoordinates.x * scale,
        y: embroideryCoordinates.y * scale,
    };

    if(
        location.x < scaledEmbroideryCoordinates.x
        || scaledEmbroideryCoordinates.y > location.y
        || scaledEmbroideryCoordinates.x + embroiderySize < location.x
        || scaledEmbroideryCoordinates.y + embroiderySize < location.y){
        ctx.drawImage(
            resources.tablecloth,
            0 - location.x,
            0 - location.y,
            canvasSize * scale,
            canvasSize * scale
        );
    }

    
    // отображаем только то, что будет видно
    const indexesVisibleStart = {
        x: Math.floor(
            (
                location.x - scaledEmbroideryCoordinates.x
            ) / scaledCellSize
        ),
        y: Math.floor(
            (
                location.y - scaledEmbroideryCoordinates.y
            ) / scaledCellSize
        ),
    };

    const indexesVisibleEnd = {
        x: Math.ceil(
            canvasSize / scaledCellSize
        ) + indexesVisibleStart.x + 1,
        y: Math.ceil(
            canvasSize / scaledCellSize
        ) + indexesVisibleStart.y + 1,
    };

    if(indexesVisibleStart.x < 0){
        indexesVisibleStart.x = 0;
    }

    if(indexesVisibleStart.y < 0){
        indexesVisibleStart.y = 0;
    }
    
    if(indexesVisibleEnd.x > session.imageSize){
        indexesVisibleEnd.x = session.imageSize;
    }
    
    if(indexesVisibleEnd.y > session.imageSize){
        indexesVisibleEnd.y = session.imageSize;
    }

    function getCrossCoordinates(xi, yi){
        let absoluteCoordinates = {
            x:  scaledEmbroideryCoordinates.x + xi * scaledCellSize,
            y:  scaledEmbroideryCoordinates.y + yi * scaledCellSize,
        };

        let relativeCoordinates = {
            x:  absoluteCoordinates.x - location.x,
            y: absoluteCoordinates.y - location.y,
        };

        return {
            relative: relativeCoordinates,
            absolute: absoluteCoordinates,
        };
    }

    function checkIn(coordinates){
        if(coordinates.absolute.x >= location.x
            && coordinates.absolute.y >= location.y
            && coordinates.absolute.x + scaledCellSize
                <= location.x + canvasSize
            && coordinates.absolute.y + scaledCellSize
                <= location.y + canvasSize){
            return true;

        }else{
            return false;
        }
    }

    const beginKeyImagesCache = String(canvasSize) + session.imageSize + session.numberColors;

    if(scale === 1){
        const imagesCacheKey = beginKeyImagesCache  + "blackWhiteImage";

        if(imagesCache[imagesCacheKey]){
            ctx.putImageData(
                imagesCache[imagesCacheKey], 0, 0,
            );

        }else{
            forCrossCoordinates(indexesVisibleStart, indexesVisibleEnd, (yi, xi) => {
                let coordinates = getCrossCoordinates(xi, yi);
                let color = embroideryMap[yi][xi].color;

                ctx.fillStyle = `rgb(${embroideryMap[yi][xi].color.join(",")})`;

                ctx.fillRect(
                    coordinates.relative.x,
                    coordinates.relative.y,
                    scaledCellSize,
                    scaledCellSize,
                );

                let imagesRecolorCellKey = beginKeyImagesCache + color.join() + scale + "cell";

                if(!imagesCache[imagesRecolorCellKey]){
                    desaturateImage(
                        ctx,
                        coordinates.relative.x,
                        coordinates.relative.y,
                        scaledCellSize,
                        scaledCellSize,
                    );

                    /**
                     * Сохраняем только те изображения,
                     * которые полностью поместились в канву
                     */

                    if(checkIn(coordinates)){
                        imagesCache[imagesRecolorCellKey] = ctx.getImageData(
                            coordinates.relative.x,
                            coordinates.relative.y,
                            scaledCellSize,
                            scaledCellSize,
                        );
                    }

                }else{
                    ctx.putImageData(
                        imagesCache[imagesRecolorCellKey],
                        coordinates.relative.x,
                        coordinates.relative.y,
                    );
                }
            });

            imagesCache[imagesCacheKey] = ctx.getImageData(
                0,
                0,
                canvasSize,
                canvasSize,
            );
        }
    }

    const fontSize = (scaledCellSize  / 2);
    ctx.font = `${fontSize}px Bender`;

    forCrossCoordinates(indexesVisibleStart, indexesVisibleEnd, (yi, xi) => {
        const coordinates = getCrossCoordinates(xi, yi);
        const value = session.data ? session.data[`${yi}/${xi}`] : null;
        const color = embroideryMap[yi][xi].color.join();
        const currentColorValue = currentColor ? currentColor.join() : null;

        if(scale !== 1){
            ctx.drawImage(
                resources.cell,
                coordinates.relative.x,
                coordinates.relative.y,
                scaledCellSize,
                scaledCellSize,
            );
        }

        if(!value){
            if(scale !== 1){
                if(color === currentColorValue){
                    drawCircle(
                        ctx,
                        coordinates.relative.x + scaledCellSize / 2,
                        coordinates.relative.y + scaledCellSize / 2,
                        6,
                        "rgba(255, 165, 0, 150)"
                    );

                }else{
                    ctx.fillStyle = "black";
        
                    ctx.fillText(
                        embroideryMap[yi][xi].colorName,
                        coordinates.relative.x + scaledCellSize * 0.3,
                        coordinates.relative.y + scaledCellSize * 0.7,
                        scaledCellSize,
                        scaledCellSize
                    );
                }
            }
        }
        
        if(value){
            let colorKey = value.join();
            let imagesRecolorCrossKey = beginKeyImagesCache + colorKey + scale + "cross";

            if(!updatedCrossIndexes
                || !(yi === updatedCrossIndexes.y
                        && xi === updatedCrossIndexes.x)){
                if(!imagesCache[imagesRecolorCrossKey]){
                    renderCross(
                        ctx,
                        resources.cross,
                        coordinates.relative.x,
                        coordinates.relative.y,
                        scaledCellSize,
                        value
                    );
                    
                    if(checkIn(coordinates)){
                        imagesCache[imagesRecolorCrossKey] = ctx.getImageData(
                            coordinates.relative.x,
                            coordinates.relative.y,
                            scaledCellSize,
                            scaledCellSize,
                        );
                    }
    
                }else{
                    ctx.putImageData(
                        imagesCache[imagesRecolorCrossKey],
                        coordinates.relative.x,
                        coordinates.relative.y,
                    );
                }

            }else{
                renderCross(
                    ctx,
                    resources.cross,
                    coordinates.relative.x,
                    coordinates.relative.y,
                    scaledCellSize,
                    value,
                    true
                );
            }

            if(colorKey !== color){
                if(scale !== 1){
                    drawCircle(
                        ctx,
                        coordinates.relative.x + scaledCellSize / 2,
                        coordinates.relative.y + scaledCellSize / 2,
                        6,
                        "rgba(255, 0, 0, 150)"
                    );
                }
            }
        }
    });

    if(scale === 1){
        if(currentColor !== null){
            forCrossCoordinates(indexesVisibleStart, indexesVisibleEnd, (yi, xi) => {
                const coordinates = getCrossCoordinates(xi, yi);
                const value = session.data ? session.data[`${yi}/${xi}`] : null;
                const color = embroideryMap[yi][xi].color.join();
                const currentColorValue = currentColor ? currentColor.join() : null;
        
                if(!value){
                    if(color === currentColorValue){
                        drawCircle(
                            ctx,
                            coordinates.relative.x + scaledCellSize / 2,
                            coordinates.relative.y + scaledCellSize / 2,
                            4,
                            "rgba(255, 165, 0, 150)"
                        );
                    }
                }
            });

        }else{
            forCrossCoordinates(indexesVisibleStart, indexesVisibleEnd, (yi, xi) => {
                const coordinates = getCrossCoordinates(xi, yi);
                const value = session.data ? session.data[`${yi}/${xi}`] : null;
                const color = embroideryMap[yi][xi].color.join();
        
                if(value){
                    if(color !== value.join()){
                        drawCircle(
                            ctx,
                            coordinates.relative.x + scaledCellSize / 2,
                            coordinates.relative.y + scaledCellSize / 2,
                            4,
                            "rgba(255, 0, 0, 150)"
                        );
                    }
                }
            });
        }
    }

    callback();
}