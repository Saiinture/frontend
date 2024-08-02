import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";


const ReduxProvider:FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default ReduxProvider;
