import {
    IAssetType,
    IDisplay,
    IEncounterStarforged,
    IHasDescription,
    IHasId,
    IHasName,
    IMove,
    IMoveCategory,
    IOracleCategory,
    ISettingTruth,
    PartOfSpeechTag,
    Starforged,
} from "dataforged";
import { starforged } from "dataforged";
import { Module, modules } from "./starforged";
import { Key } from "react";

export type ObjectName = {
    $id: IHasId["$id"];
    Name: IHasName["Name"];
    Description: IHasDescription["Description"];
    Display?: IDisplay;
};

export function getElementId(id: IHasId["$id"]) {
    return id.match(/\/(?<id>\w+)$/)?.groups?.id;
}

export function getObjectLink(object: IHasId) {
    return `/${object.$id}`;
}

function checkElementId(searchId = "") {
    const compareElementId = (element: IHasId) =>
        getElementId(element.$id) === searchId;
    return compareElementId;
}

export function getObjectBaseData(object: any) {
    const nameObject: ObjectName = {
        $id: object.$id,
        Name: object.Display?.Title || object.Name,
        Description: object.Description,
        Display: object.Display,
    };
    return nameObject;
}

function getObjects<
    T extends Record<K, IHasId[]>,
    K extends keyof {
        [P in keyof T as T[P] extends IHasId[] ? P : never]: T[P];
    }
>(id: string, getParent: (id: string) => T, childAttribut: K) : IHasId[]
 {
    const parent = getParent(id);
    const children = parent[childAttribut];
    if (!children) throw new Response("Not Found", { status: 404 });
    return children;
}

function getObject<T extends IHasId>(id: string, getObjects: () => T[]) {
    const objects = getObjects();
    const object = objects.find(checkElementId(id));
    if (!object) throw new Response("Not Found", { status: 404 });
    return object;
}

export function getModules() {
    if (!modules) throw new Response("Not Found", { status: 404 });
    return modules.map(getObjectBaseData);
}
export function getModule(moduleId = "") {
    const module = modules.find(checkElementId(moduleId));
    if (!module) throw new Response("Not Found", { status: 404 });
    return module;
}

export function getMoveCategories() {
    return getObjects("Moves", getModule, "Data") as Array<IMoveCategory>;
}

export function getMoveCategory(categoryId = "")  {
    return getObject(categoryId, getMoveCategories)
}

function getMoves(categoryId: string) {
    return getObjects("Moves", () => getMoveCategory(categoryId), "Moves") as Array<IMove>;
}

export function getMove(categoryId: string, moveId: string) {
    return getObject(moveId, () => getMoves(categoryId))
}

