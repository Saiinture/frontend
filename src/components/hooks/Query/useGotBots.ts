import {useQuery} from "@tanstack/react-query";
import {BOTS} from "../../consts/TanstackConsts.ts";
import {getBots} from "../../../api/Backend.api.ts";

const UseGetBots = () => {
    return useQuery([BOTS], () => getBots(), {
        enabled: false,
        }
        );
};

export default UseGetBots;