import * as fcl from "@onflow/fcl";

const logIn = async (): Promise<void> => {
    await fcl.authenticate();
};
const logOut = () => {
    fcl.unauthenticate();
};

export {logOut, logIn}