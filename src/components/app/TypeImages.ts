import BugType from "../../assets/icons/bug.svg";
import DarkType from "../../assets/icons/dark.svg";
import DragonType from "../../assets/icons/dragon.svg";
import ElectricType from "../../assets/icons/electric.svg";
import FairyType from "../../assets/icons/fairy.svg";
import FireType from "../../assets/icons/fire.svg";
import FightingType from "../../assets/icons/fighting.svg";
import FlyingType from "../../assets/icons/flying.svg";
import GhostType from "../../assets/icons/ghost.svg";
import GrassType from "../../assets/icons/grass.svg";
import GroundType from "../../assets/icons/ground.svg";
import IceType from "../../assets/icons/ice.svg";
import NormalType from "../../assets/icons/normal.svg";
import PoisonType from "../../assets/icons/poison.svg";
import PsychicType from "../../assets/icons/psychic.svg";
import RockType from "../../assets/icons/rock.svg";
import SteelType from "../../assets/icons/steel.svg";
import WaterType from "../../assets/icons/water.svg";

export const typeMapper: Record<string, { icon: string; class: string }> = {
  bug: { icon: BugType, class: "bg-lime-500 rounded-full p-1" },
  dark: { icon: DarkType, class: "bg-black-400 rounded-full p-1" },
  dragon: { icon: DragonType, class: "bg-blue-900 rounded-full p-1" },
  electric: { icon: ElectricType, class: "bg-amber-400 rounded-full p-1" },
  fairy: { icon: FairyType, class: "bg-fuchsia-300 rounded-full p-1" },
  fighting: { icon: FightingType, class: "bg-amber-700 rounded-full p-1" },
  fire: { icon: FireType, class: "bg-red-600 rounded-full p-1" },
  flying: { icon: FlyingType, class: "bg-cyan-300 rounded-full p-1" },
  ghost: { icon: GhostType, class: "bg-purple-800 rounded-full p-1" },
  grass: { icon: GrassType, class: "bg-green-600 rounded-full p-1" },
  ground: { icon: GroundType, class: "bg-yellow-800 rounded-full p-1" },
  ice: { icon: IceType, class: "bg-blue-300 rounded-full p-1" },
  normal: { icon: NormalType, class: "bg-neutral-400 rounded-full p-1" },
  poison: { icon: PoisonType, class: "bg-violet-900 rounded-full p-1" },
  psychic: { icon: PsychicType, class: "bg-pink-600 rounded-full p-1" },
  rock: { icon: RockType, class: "bg-stone-500 rounded-full p-1" },
  steel: { icon: SteelType, class: "bg-gray-800 rounded-full p-1" },
  water: { icon: WaterType, class: "bg-sky-600 rounded-full p-1" },
};
