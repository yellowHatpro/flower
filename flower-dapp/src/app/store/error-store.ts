import {create} from "zustand";

type Error = {
    errorData: string
}

const errorStore = create<Error>((set) => (
    {
        errorData: ""
    }
))
export default errorStore
