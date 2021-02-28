
export default function(
    imgData, numberColors = 10, imageSize = 100, minPorog = 1, callback = () => {}
){
    function checkSimilarity(a, b, p){
        return !(
                Math.abs(a[0] - b[0]) > p
                    || Math.abs(a[1] - b[1]) > p
                    || Math.abs(a[2] - b[2]) > p
            );
    }

    function callculateMainColors(colors, length,  porog = minPorog){
        if(colors.length !== length && porog != 255){
            const newColors = colors.reduce((newColors, color) => {
                return [
                    ...newColors.filter(e => {
                        return !checkSimilarity(e, color, porog);
                    }),
                    color
                ];
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

    function calculateSimilarColor(color, mainColors, porog = 256){
        if(mainColors.length !== 1 && porog){

            let newList = mainColors.filter(e => {
                return checkSimilarity(e, color, porog);
            });

            if(newList.length == 0){
                newList = [
                    mainColors[0]
                ]
            }

            return calculateSimilarColor(
                color, newList, porog - 1
            );

        }else if(!porog){
            return porog;

        }else{
            return mainColors[0];
        }
    }

    let allColors = [];
    let uniqueColors = [];
    
    // Этап 1. Собираем массив всех цветов и массив уникальных цветов

    for (let i = 0; i < imgData.data.length; i += 4) {
        const color = [
            imgData.data[i + 0],
            imgData.data[i + 1],
            imgData.data[i + 2],
            imgData.data[i + 3]
        ];

        allColors.push(color);

        const isExists = uniqueColors.some(e => {
            return checkSimilarity(color, e, minPorog);
        });

        if(!isExists){
            uniqueColors.push(color);
        }
    }
    
    // Этап 2. Вычисляем основные цвета

    let mainColors = callculateMainColors(uniqueColors, numberColors);

    uniqueColors = uniqueColors.map(color => {
        return {
            color,
            main : calculateSimilarColor(color, mainColors)
        };
    });

    mainColors = mainColors.map((color, i) => ({
        name: i + 1,
        value: color,
    }));

    // Этап 3. Заменяем все цвета на основные

    allColors = allColors.map(color => {
        const uniqueColor = uniqueColors.find(e => {
                return checkSimilarity(color, e.color, minPorog);
            }
        );
        
        const colorName = mainColors.find(color => {
            return uniqueColor.main[0] === color.value[0]
                && uniqueColor.main[1] === color.value[1]
                 && uniqueColor.main[2] === color.value[2];
            }
        ).name;

        return {
            color: uniqueColor.main,
            colorName,
        };
    });

    // Этап 4. Упаковываем массив цветов

    const imgMap = new Array(imageSize).fill(null);

    for(let i = 0; i < imageSize; i++){
        imgMap[i] = allColors.slice(i * imageSize, i * imageSize + imageSize);
    }
    
    callback(
        {
            mainColors,
            imgMap,
        }
    );

    return imgData;
}