
export default function(
    imgData, numberColors = 10, imageSize = 100, minPorog = 1, callback = () => {}
){
    let colors = [];

    for (var i = 0; i < imgData.data.length; i += 4) {
        let color = [
            imgData.data[i + 0],
            imgData.data[i + 1],
            imgData.data[i + 2],
            imgData.data[i + 3]
        ];

        let isExists = colors.some(c => {
            // return color[0] === c[0]
            //     && color[1] === c[1]
            //     && color[2] === c[2];
            return check(color, c, minPorog);
        });

        if(!isExists){
            colors.push(color);
        }
    }
    
    function check(a, b, p){
        return !(Math.abs(a[0] - b[0]) > p || Math.abs(a[1] - b[1]) > p || Math.abs(a[2] - b[2]) > p);
    }


    let callculateMainColors = (colors, length,  porog = minPorog) => {
        if(colors.length !== length && porog != 255){
            let newColors = colors.reduce((a, c) => {
                a = a.filter(e => {
                    return !check(e, c, porog);
                });
                
                return [...a, c];
            }, []);

            return callculateMainColors(
                newColors.length < length ? colors.slice(0, length) : newColors,
                length,
                porog + 1
            );

        }else{
            return colors;
        }
    }

    let mainColors = callculateMainColors(colors, numberColors);


    let calculateSimilarColor = (test, mainColors, porog = 256) => {
        if(mainColors.length !== 1 && porog){

            let newList = mainColors.filter(e => {
                return check(e, test, porog);
            });

            if(newList.length == 0){
                newList = [
                    mainColors[0]
                ]
            }

            return calculateSimilarColor(
                test, newList, porog - 1
            );

        }else if(!porog){
            return porog;

        }else{
            return mainColors[0];
        }
    }

    colors = colors.map(c => {
        return {
            c,
            main : calculateSimilarColor(c, mainColors)
        };
    });


    let colorsArray = [];

    mainColors = mainColors.map((color, i) => ({
        name: i + 1,// RU[i],
        value: color,
    }));

    for (var i = 0; i < imgData.data.length; i += 4) {
        let color = [
            imgData.data[i + 0],
            imgData.data[i + 1],
            imgData.data[i + 2],
            imgData.data[i + 3]
        ];

        let found = colors.find(c => {
            // return imgData.data[i + 0] === c.c[0]
            //     && imgData.data[i + 1] === c.c[1]
            //      && imgData.data[i + 2] === c.c[2];
                return check(color, c.c, minPorog);
            }
        );
        
        let colorName = mainColors.find(color => {
            return found.main[0] === color.value[0]
                && found.main[1] === color.value[1]
                 && found.main[2] === color.value[2];
            }
        ).name;

        colorsArray.push(
            {
                color: found.main,
                colorName,
            }
        );
    }

    let imgMap = new Array(imageSize).fill(null);

    for(let i = 0; i < imageSize; i++){
        imgMap[i] = colorsArray.slice(i * imageSize, i * imageSize + imageSize);
    }
    
    callback(
        {
            mainColors,
            imgMap,
        }
    );

    return imgData;
}