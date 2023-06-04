import type { IAssetType, IDisplay, IEncounterStarforged, IMoveCategory, IOracleCategory, ISettingTruth } from "dataforged";
import { starforged } from "dataforged";

export type Module = {
  $id: string,
  Name: string,
  Display?: IDisplay,
  Description: string,
  Data: IAssetType[] | IEncounterStarforged[] | IMoveCategory[] | IOracleCategory[] | ISettingTruth[]
}

export const modules : Module[] = [
  {
      $id: "Starforged/Assets",
      Name: "Asset Types",
      Display: {
          Title: "Asset Types"
      },
      Description: "List all awayable Assets and their functions",
      Data: starforged["Asset Types"],
  },
  {
      $id: "Starforged/Encounters",
      Name: "Encounters",
      Description: "Display Encounter informations",
      Data: starforged["Encounters"],
  },
  {
      $id: "Starforged/Moves",
      Name: "Move Categories",
      Description: "The \"meat\" of this app, all moves in detail",
      Data: starforged["Move Categories"],
  },
  {
      $id: "Starforged/Oracles",
      Name: "Oracle Categories",
      Description: "All the oracles in one place",
      Data: starforged["Oracle Categories"],
  },
  {
      $id: "Starforged/Setting_Truths",
      Name: "Setting Truths",
      Description: "Read your Setting Truths",
      Data: starforged["Setting Truths"],
  },
];