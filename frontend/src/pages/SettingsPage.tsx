import { useEffect } from "react";

export const SettingsPage = () => {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const changeTheme = (themeName: string) => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
  };

  // Carica il tema salvato all'avvio
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const ThemePreview = ({ themeName }: { themeName: string }) => {
    return (
      <div
        className="w-full h-12 rounded-lg border-2 border-base-300 flex items-center justify-center gap-1 p-2"
        data-theme={themeName}
      >
        <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
          <span className="text-primary-content text-xs font-bold">A</span>
        </div>
        <div className="w-6 h-6 bg-secondary rounded flex items-center justify-center">
          <span className="text-secondary-content text-xs font-bold">A</span>
        </div>
        <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
          <span className="text-accent-content text-xs font-bold">A</span>
        </div>
        <div className="w-6 h-6 bg-neutral rounded flex items-center justify-center">
          <span className="text-neutral-content text-xs font-bold">A</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 mt-[4rem]">
      <h1 className="text-2xl font-bold mb-4">Impostazioni</h1>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Tema</h2>

          <div className="mb-4">
            <div className="chat chat-start">
              <div className="chat-bubble">
                E' finita Anakin,
                <br />
                Sono più in alto di te!
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble bg-primary text-primary-content">
                Sottovaluti il mio potere!
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => changeTheme(theme)}
                className="btn btn-ghost p-4 h-auto flex-col gap-3 hover:scale-115 transition-all"
              >
                <span className="text-sm font-medium capitalize">{theme}</span>
                <ThemePreview themeName={theme} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
