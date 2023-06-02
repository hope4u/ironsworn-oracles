
import type { Starforged } from "dataforged";
import { starforged } from "dataforged";

function getEmementId(id: string) {
    return id.match(/\/(?<id>\w+)$/)?.groups?.id
}

function getObjectBaseData(object : any[]) {
    return object.map(element => ({$id: element.$id, Name: element.Name}))
}

const modules = [
    { $id: "Starforged/Assets", Name: "Asset Types", Module: starforged["Asset Types"]},
    { $id: "Starforged/Encounters" , Name: "Encounters", Module: starforged["Encounters"]},
    { $id: "Starforged/Moves", Name: "Move Categories", Module: starforged["Move Categories"]},
    { $id: "Starforged/Oracles", Name: "Oracle Categories", Module: starforged["Oracle Categories"]},
    { $id: "Starforged/Setting_Truths", Name: "Setting Truths", Module: starforged["Setting Truths"]},
]

export function getModules() {
    return getObjectBaseData(modules)
}

export function getActiveModule(moduleId : string) {
    const module = modules.find(module => getEmementId(module.$id) === moduleId)?.Module
    if(module) return {module : getObjectBaseData(module)}
}

export function getMoveCategories() {
    const moveCategories = getObjectBaseData(starforged["Move Categories"])
    return {moveCategories}
}

export function getMoveCategory(categoryId : string) {
    const moveCategory = starforged["Move Categories"].find(category => getEmementId(category.$id) === categoryId)
    if(!moveCategory) throw new Response("Not Found", { status: 404 });
    return {moveCategory: {...moveCategory, Moves: getObjectBaseData(moveCategory.Moves)}}
}

export function getMove(categoryId : string, moveId : string) {
    const moveCategory = starforged["Move Categories"].find(category => getEmementId(category.$id) === categoryId)
    if(!moveCategory) throw new Response("Not Found", { status: 404 });

    const move = moveCategory.Moves.find(move => getEmementId(move.$id) === moveId)
    if(!move) throw new Response("Not Found", { status: 404 });

    return {move}

}
