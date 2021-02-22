import GlobalModel from "global-model";

export default (parrentPath = "", name = "colors") => {
    return new GlobalModel(
        parrentPath,
        name,
        [],
        [
            {
                name: "?",
                value: [],
                isSelected: false
            }
        ]
    );
};