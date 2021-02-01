import React, { useState, useContext } from "react";

type State = string;

const StoragePasswordContext = React.createContext<[State, React.Dispatch<React.SetStateAction<State>>] | null>(null);

export default function StoragePasswordContextProvider(props: { children: React.ReactNode }) {
    // const [password, setPassword] = useState('');
    const [password, setPassword] = useState('asdasd');

    return <StoragePasswordContext.Provider value={[password, setPassword]}>{props.children}</StoragePasswordContext.Provider>
};

export function useStoragePassword() {
    const storagePasswordContext = useContext(StoragePasswordContext);

    return storagePasswordContext[0];
}

export function useSetStoragePassword() {
    const storagePasswordContext = useContext(StoragePasswordContext);

    return storagePasswordContext[1];
}

