import GlobalModel from "global-model";

export default (parrentPath = "", name = "session") => {
    return new GlobalModel(
        parrentPath,
        name,
        {
            data: {}
        },
        {
            image: null,
            imageSize: null,
            numberColors: null,
            data: GlobalModel.structures.Uncontrolled,
        }
    );
};