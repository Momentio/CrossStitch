
export default function(eventCoordinates, game){
    const {
      crossSize,
      scale,
      location,
      embroideryCoordinates,
      embroideryMap,
      embroiderySize,
      session,
    } = game;
    
    if(eventCoordinates && game){
      // координаты текущего местоположения вышивки
      const embroideryLocation = {
        x: embroideryCoordinates.x * scale - location.x,
        y: embroideryCoordinates.y * scale - location.y,
      };
  
      if(eventCoordinates.x >= embroideryLocation.x
          && eventCoordinates.y >= embroideryLocation.y
          && eventCoordinates.x <= embroideryLocation.x + embroiderySize * scale
          && eventCoordinates.y <= embroideryLocation.y + embroiderySize * scale){
  
            // координаты крестика относительно вышивки
            const crossCoordinatesRelativeEmbroidery = {
              x: eventCoordinates.x - embroideryLocation.x,
              y: eventCoordinates.y - embroideryLocation.y,
            };
      
            // индексы крестика в массиве
            const indexes = {
              x: Math.floor(
                crossCoordinatesRelativeEmbroidery.x / (crossSize * scale)
              ),
              y: Math.floor(
                crossCoordinatesRelativeEmbroidery.y / (crossSize * scale)
              )
            };
  
            if((indexes.x >= 0 && indexes.x < embroideryMap.length)
              && (indexes.y >= 0 && indexes.y < embroideryMap.length)){
  
                // координаты крестика относительно вышивки
                const coordinates = {
                  x: embroideryLocation.x + (indexes.x * crossSize * scale),
                  y: embroideryLocation.y + (indexes.y * crossSize * scale),
                };
  
                // абсолютные координаты крестика
                const absoluteCoordinates = {
                  x: embroideryCoordinates.x + crossSize * scale * indexes.x,
                  y: embroideryCoordinates.y + crossSize * scale * indexes.y,
                };

                return {
                  indexes,
                  coordinates,
                  absoluteCoordinates,
                  exists: Boolean(
                    session.data ? session.data[`${indexes.y}/${indexes.x}`] : false
                  )
                };
                
            }else{
              return false;
            }
  
      }else{
        return false;
      }
    }
}