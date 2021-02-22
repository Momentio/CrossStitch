
export default function(startIndexes, endIndexes, callback){
    for(let yi = startIndexes.y; yi < endIndexes.y; yi++){
        for(let xi = startIndexes.x; xi < endIndexes.x; xi++){
            callback(yi, xi);
        }
    }
};