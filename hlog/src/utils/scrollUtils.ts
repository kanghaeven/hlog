export const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

export const scrollToComments = () =>
  document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
