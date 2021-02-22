import GlobalModel from "global-model";

export default (parrentPath = "", name = "api") => {
    return new GlobalModel(
        parrentPath,
        name,
        {
            url: "http://127.0.0.1"
        },
    );
};