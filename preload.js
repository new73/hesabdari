window.addEventListener('DOMContentLoaded', () => {
  console.log("Preload loaded");
});

global.myAPI = {
  greet: () => "سلام از Preload!"
};
