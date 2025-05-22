import React, { createContext, useContext, useState } from "react";

type Tab = "register" | "queue" | "history";

interface NavigationContextData {
  activeTab: Tab;
  changeTab: (tab: Tab) => void;
}

const NavigationContext = createContext<NavigationContextData>(
  {} as NavigationContextData
);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("register");

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <NavigationContext.Provider value={{ activeTab, changeTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }

  return context;
};
