import {useQuery} from "@tanstack/react-query";
import {USERS} from "../../consts/TanstackConsts.ts";
import {getUserById} from "../../../api/Firebase.api.ts";

const UseGetUser = (uid: string) => {
    return useQuery([USERS], () => getUserById(uid));
};

export default UseGetUser;