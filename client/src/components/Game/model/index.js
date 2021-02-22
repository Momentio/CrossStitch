import GlobalModel from "global-model";
import httpQuery from "../../HttpQuery/model";
import session from "./session";
import colors from "./colors";

export default (parrentPath = "", name = "game") => {
    return new GlobalModel(
        parrentPath,
        name,
        {
            httpQuery: httpQuery(`${parrentPath}/${name}`).gInitialValue,
            session: session(`${parrentPath}/${name}`).gInitialValue,
            colors: colors(`${parrentPath}/${name}`).gInitialValue,
            resources: null,
            canvasSize: null,
            location: {x: 0, y:0},
            scale: 1,
            currentColor: null,
            embroideryCoordinates: {x: null, y: null},
            embroiderySize: null,
            embroideryMap: null,
            crossSize: null,
        },
        {
            progress: 0,
            status: "uploadingImage",
            httpQuery: httpQuery(`${parrentPath}/${name}`).gStructure,
            session: session(`${parrentPath}/${name}`).gStructure,
            colors: colors(`${parrentPath}/${name}`).gStructure,
            resources: GlobalModel.structures.Uncontrolled,
            crossSize: GlobalModel.structures.Uncontrolled,
            location: GlobalModel.structures.Uncontrolled,
            scale: GlobalModel.structures.Uncontrolled,
            currentColor: GlobalModel.structures.Uncontrolled,
            embroideryCoordinates: GlobalModel.structures.Uncontrolled,
            embroiderySize: GlobalModel.structures.Uncontrolled,
            embroideryMap: GlobalModel.structures.Uncontrolled,
            canvasSize: GlobalModel.structures.Uncontrolled,
        }
    );
};