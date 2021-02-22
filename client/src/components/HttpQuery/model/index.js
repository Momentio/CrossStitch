import GlobalModel from "global-model";

export default (parrentPath = "", name = "httpQuery") => {
    return new GlobalModel(
        parrentPath,
        name,
        {},
        {
            error: null,
            status: true,
            isLoading: false,
            isUploading: false,
            statusCodesList:{
                502:"На сервере возникла проблема",
                403:"Отказано в доступе",
                404:"Данные отсутствуют",
                422:"Ошибка обработки данных",
            }
        },
    );
};